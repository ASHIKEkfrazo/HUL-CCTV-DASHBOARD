import React, { useState, useEffect } from 'react';
import { Spin, Alert } from "antd";
import axios from 'axios';

const CameraStream = ({ cameraId }) => {
  const [websocketUrl, setWebsocketUrl] = useState('');
  const [frame, setFrame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const controller = new AbortController();
      const timeout = setTimeout(() => {
        controller.abort();
        setLoading(false);
        setError('The request timed out. Please try again.');
      }, 10000); // Set timeout to 10 seconds

      try {
        const response = await axios.get(
          `http://localhost:8000/api/camera/${cameraId}/stream/`,
          { signal: controller.signal }
        );
        clearTimeout(timeout);
        setWebsocketUrl(response.data.websocket_url);
        setLoading(false);
        scoketFunction(response.data.websocket_url);
      } catch (err) {
        clearTimeout(timeout);
        if (err.name === 'CanceledError') {
          console.log('Request canceled:', err.message);
        } else {
          console.error(err);
          setError('Failed to fetch WebSocket URL. Please try again.');
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [cameraId]);

  const scoketFunction = (websocketUrl) => {
    const ws = new WebSocket(websocketUrl);

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.frame) {
        setFrame(data.frame);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setError('Error connecting to WebSocket server.');
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => {
      ws.close();
    };
  };

  if (loading) {
    return (
      <div className="min-h-52 flex justify-center items-center">
        <Spin />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-52 flex justify-center items-center">
        <Alert message="Error" description={error} type="error" showIcon />
      </div>
    );
  }

  return (
    <div>
      {frame ? (
        <div className="object-contain h-[400px] w-full">
          <img
            src={`data:image/jpeg;base64,${frame}`}
            alt="Camera Feed"
            width="100%"
            className="!h-full rounded-md"
          />
        </div>
      ) : (
        <div className="min-h-52 flex justify-center items-center">
          <Spin />
        </div>
      )}
    </div>
  );
};

export default CameraStream;

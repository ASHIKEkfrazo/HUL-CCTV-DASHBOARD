import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../../Context/ThemeContext";
import axiosInstance from "../../API/Api";
import { Switch } from 'antd';

type CameraFeedCardProps ={
  id:string | Number,
  CamData:any
}

const CameraFeedCard = ({ id , CamData}: CameraFeedCardProps) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [autoScroll, setAutoScroll] = useState<boolean>(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { themeStyles } = useTheme();

  const [data, setData] = useState<{ streams: { [key: string]: string } } | null>(null);


  let url = `multi_stream/${id}`;
  const fetchData =  async() =>{
    try {
      const response = await axiosInstance.get(url);
      if(response){
          setData(response.data)
      }
    } catch (error) {
      console.log("ERROR FETCHING REPORT DATA",error)
    }
  }

  useEffect(() => {
    fetchData();

//     const filteredData = CamData.filter((item: any) => item.id === id);

// setData(filteredData[0]?.camera_ids)

  }, [id]); // Re-fetch when `id` changes


  const onChange = (checked: boolean) => {
    setAutoScroll(checked)
  };


  useEffect(() => {
    if (!autoScroll || !scrollContainerRef.current) return;

    const scrollContainer = scrollContainerRef.current;

    const smoothScroll = () => {
      if (
        scrollContainer.scrollLeft + scrollContainer.clientWidth >=
        scrollContainer.scrollWidth
      ) {
        setTimeout(() => {
          scrollContainer.scrollTo({ left: 0, behavior: "instant" }); // Instantly reset
        }, 500); // Delay before reset
      } else {
        scrollContainer.scrollBy({ left: 2, behavior: "smooth" }); // Smooth scroll step
      }
    };

    const scrollInterval = setInterval(smoothScroll, 1); // Control speed

    return () => clearInterval(scrollInterval);
  }, [autoScroll]);           



  return (
    <div className="relative">
      {/* Toggle Auto Scroll */}
      <div className="flex justify-end">
        <Switch checked={autoScroll} onChange={onChange}  /> <span className="font-semibold ml-4">{autoScroll ? "Stop Auto Scroll" : "Start Auto Scroll"}</span>
      </div>

      {/* Scrollable Image Cards */}
      <div ref={scrollContainerRef} className="flex w-full gap-4 overflow-x-auto whitespace-nowrap flex-nowrap py-4 scrollbar-hide">
      {data && Object.values(data.streams).map((item, index) => (
            <div
              key={index}
              className="w-80 h-60 flex-shrink-0 cursor-pointer shadow-lg"
              onClick={() =>
                setPreviewImage(
                  `http://localhost:8000${item}`
                )
              }
            >
            <img src={`http://localhost:8000${item}`} alt="Camera Feed" className="w-full h-full object-cover rounded-md" />

            </div>
          ))}

      </div>

      {/* Image Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 bg-[#000000d1] flex items-center justify-center z-50">
          <div className="relative">
            <button className="absolute top-2 right-2 bg-white p-2 rounded-full cursor-pointer" onClick={() => setPreviewImage(null)}>
              ✖
            </button>
            <div className="w-[60vw] h-[80vh]">
              <img src={previewImage} alt="Preview" className="w-full h-full object-contain rounded-lg" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default CameraFeedCard;

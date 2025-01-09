import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Camera } from 'lucide-react';
import { camerasDataAPI,addCamerasAPI,updateCamerasAPI,deleteCamerasAPI } from '../Endpoints/cameraApi';
import { machineDataAPI} from '../Endpoints/machineApi';
import { clusterDataAPI } from '../Endpoints/clusterApi';
import { clusterMcahineApi } from '../Endpoints/ApiCall';



// Rest of the component remains the same
const CameraPage = () => {
  const [cameras, setCameras] = useState([]);
  const [ clusters, setClusters] = useState([]);
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCamera, setEditingCamera] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    ip_address: '',
    port: '',
    username: '',
    password: '',
    machine: '',
    cluster:''
  });

  useEffect(() => {
    fetchCameras();
   
    fetchClusters()
  }, []);

  const fetchCameras = async () => {
    setLoading(true);
    try {
      const response = await camerasDataAPI();
      setCameras(response.results);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const fetchClusters = async() =>{
    try {
      const response = await clusterDataAPI();
      setClusters(response.results)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchMachines = async (clusterId) => {
    try {
   if(clusterId){
     const response = await clusterMcahineApi(clusterId);
     setMachines(response.data.results);
   }
   else{
    setMachines([]);
   }
    } catch (err) {
      setError(err);
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
 
    setFormData(prev => ({
      ...prev,
      [name]: name === 'port' ? parseInt(value) || '' : value
    }));
  };

  const handleAdd = async () => {
    try {
      await addCamerasAPI(formData);
      fetchCameras();
      setIsModalOpen(false);
      resetForm();
    } catch (err) {
      setError(err);
    }
  };

  const handleEdit = (camera) => {
    setEditingCamera(camera);
    setFormData({
      name: camera.name,
      ip_address: camera.ip_address,
      port: camera.port,
      username: camera.username,
      password: camera.password,
      machine: camera.machine,
      cluster:clusters.find((item) => item.name === camera.cluster_name)?.id
    });
   fetchMachines(camera.machine)
  
    setIsModalOpen(true);
  };

  const handleSaveEdit = async () => {
    try {
      await updateCamerasAPI(editingCamera.id, formData);
      fetchCameras();
      setIsModalOpen(false);
      resetForm();
    } catch (err) {
      setError(err);
    }
  };

  const handleDelete = async (cameraId) => {
    try {
      await deleteCamerasAPI(cameraId);
      setCameras(cameras.filter(c => c.id !== cameraId));
    } catch (err) {
      setError(err);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      ip_address: '',
      port: '',
      username: '',
      password: '',
      machine: ''
    });
    setEditingCamera(null);
  };

  return (
    <div className="h-screen flex flex-col p-2 overflow-auto">
      {loading && (
        <div className="flex items-center justify-center p-4">
          <p className="text-gray-600">Loading...</p>
        </div>
      )}
      
      <button 
        onClick={() => {
          resetForm();
          setIsModalOpen(true);
        }}
        className="mb-3 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        style={{width: 'fit-content'}}>
        <Plus size={20} />
        Add Camera
      </button>

      {cameras?.length === 0 && !loading && (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <Camera className="mx-auto text-gray-400 mb-2" size={32} />
          <p className="text-gray-600">No cameras found. Add your first camera!</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {cameras?.map((camera) => (
          <div
            key={camera.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Camera className="text-blue-600" size={24} />
                  </div>
                  <h3 className="font-semibold text-lg text-gray-800">{camera.name}</h3>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleEdit(camera)}
                    className="p-2 text-blue-600 bg-gray-100 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Pencil size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(camera.id)}
                    className="p-2 text-red-600 bg-gray-100 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
              <div><span className="font-medium">IP Address:</span> {camera.ip_address}</div>
              <div className="text-right"><span className="font-medium">Port:</span> {camera.port}</div>
              <div><span className="font-medium">Username:</span> {camera.username}</div>
              <div className="text-right"><span className="font-medium">Machine:</span> {machines?.find(m => m.id === camera.machine)?.name || 'Not assigned'}</div>
            </div>


            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {editingCamera ? 'Edit Camera' : 'Add Camera'}
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Camera Name"
                className="w-full p-2 border rounded-lg"
              />
              <input
                type="text"
                name="ip_address"
                value={formData.ip_address}
                onChange={handleInputChange}
                placeholder="IP Address"
                className="w-full p-2 border rounded-lg"
              />
              <input
                type="number"
                name="port"
                value={formData.port}
                onChange={handleInputChange}
                placeholder="Port"
                className="w-full p-2 border rounded-lg"
              />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Username"
                className="w-full p-2 border rounded-lg"
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className="w-full p-2 border rounded-lg"
              />
                     <select
                name="cluster"
                value={formData.cluster}
                onChange={(e) => {
                  handleInputChange(e); 
                    fetchMachines(e.target.value)
                  
                }}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">Select Clusters</option>
                {clusters?.map((clusters) => (
                  <option key={clusters.id} value={clusters.id}>
                    {clusters.name}
                  </option>
                ))}
              </select>


              <select
                name="machine"
                value={formData.machine}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">Select Machine</option>
                {machines?.map((machine) => (
                  <option key={machine.id} value={machine.id}>
                    {machine.name}
                  </option>
                ))}
              </select>


            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button 
                onClick={() => {
                  setIsModalOpen(false);
                  resetForm();
                }}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button 
                onClick={editingCamera ? handleSaveEdit : handleAdd}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {editingCamera ? 'Save Changes' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CameraPage;
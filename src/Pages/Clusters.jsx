import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Server } from 'lucide-react';
import { clusterDataAPI,addClusterAPI,updateClusterAPI,deleteClusterAPI } from '../Endpoints/clusterApi';



export const Clusters = () => {
  const [clusters, setClusters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCluster, setEditingCluster] = useState(null);
  const [newClusterName, setNewClusterName] = useState('');

 

  useEffect(() => {
    fetchClusters();
  }, []);

  const fetchClusters = async () => {
    setLoading(true);
    try {
      // Replace this with your API call
      const response = await clusterDataAPI();
      setClusters(response.results);
      
      // Simulated API call
      setTimeout(() => {
        // setClusters(clusters);
        setLoading(false);
      }, 500);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!newClusterName.trim()) return;
    
    try {
      // Replace with your API call
      await addClusterAPI({ name: newClusterName });
      
     
      fetchClusters()
    //   setClusters([...clusters, newCluster]);
      setNewClusterName('');
      setIsModalOpen(false);
    } catch (err) {
      setError(err);
    }
  };

  const handleEdit = async (cluster) => {
    setEditingCluster(cluster);
    setNewClusterName(cluster.name);
    setIsModalOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!newClusterName.trim()) return;
    
    try {
      // Replace with your API call
      await updateClusterAPI(editingCluster.id, { name: newClusterName });
      
      // Simulated update
      const updatedClusters = clusters.map(c => 
        c.id === editingCluster.id ? { ...c, name: newClusterName } : c
      );
      setClusters(updatedClusters);
      setIsModalOpen(false);
      setEditingCluster(null);
      setNewClusterName('');
    } catch (err) {
      setError(err);
    }
  };

  const handleDelete = async (clusterId) => {
    //if (window.confirm('Are you sure you want to delete this cluster?')) {
      try {
        // Replace with your API call
         await deleteClusterAPI(clusterId);
        
        // Simulated delete
        setClusters(clusters.filter(c => c.id !== clusterId));
      } catch (err) {
        setError(err);
      }
    //}
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
          setEditingCluster(null);
          setNewClusterName('');
          setIsModalOpen(true);
        }}
        className="mb-3 flex items-center gap-2 bg-blue-600 text-white px-4 py-2  rounded-lg hover:bg-blue-700 transition-colors"
        style={{width:'fit-content'}}>
        <Plus size={20} />
        Add Clusters
      </button>

      {clusters?.length === 0 && !loading && (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <Server className="mx-auto text-gray-400 mb-2" size={32} />
          <p className="text-gray-600">No clusters found. Add your first cluster!</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 ">
        {clusters?.map((cluster, index) => (
          <div
            key={cluster.id || index}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="px-4 py-1 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Server className="text-blue-600" size={24} />
                  </div>
                  <div className="mb-0 mt-2">
                    <p className="text-sm text-gray-500 my-1">Cluster Name</p>
                    <h3 className="font-semibold text-lg text-gray-800">{cluster.name}</h3>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleEdit(cluster)}
                    className="p-2 text-blue-600 bg-gray-100 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Pencil size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(cluster.id)}
                    className="p-2 text-red-600 bg-gray-100 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {editingCluster ? 'Edit Cluster' : 'Add Cluster'}
            </h2>
            <input
              type="text"
              value={newClusterName}
              onChange={(e) => setNewClusterName(e.target.value)}
              placeholder="Enter cluster name"
              className="w-full p-2 border rounded-lg mb-4"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button 
                onClick={() => {
                  setIsModalOpen(false);
                  setNewClusterName('');
                  setEditingCluster(null);
                }}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button 
                onClick={editingCluster ? handleSaveEdit : handleAdd}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {editingCluster ? 'Save Changes' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clusters;
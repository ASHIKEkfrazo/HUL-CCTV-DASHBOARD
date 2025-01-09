import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Server } from 'lucide-react';
import { machineDataAPI,addMachineAPI,updateMachineAPI,deleteMachineAPI } from '../Endpoints/machineApi';
import { clusterDataAPI} from '../Endpoints/clusterApi';
export const Machine = () => {
  
  const [machine, setMachine] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMachine, setEditingMachine] = useState(null);
    const [newMachineName, setNewMachineName] = useState('');
    const [selectedCluster, setSelectedCluster] = useState('');
    const [clusters, setClusters] = useState([]);
 useEffect(() => {
    fetchMachines();
    fetchClusters()
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
          
        }, 500);
      } catch (err) {
        setError(err);
        
      }
    };
  const fetchMachines = async () => {
    setLoading(true);
    try {
      // Replace this with your API call
      const response = await machineDataAPI();
      setMachine(response.results);
      
      // Simulated API call
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!newMachineName.trim()) return;
    
    try {
      // Replace with your API call
      await addMachineAPI({ name: newMachineName ,cluster:selectedCluster });
      
     
      fetchMachines()
    
      setNewMachineName('');
      setSelectedCluster('');
      setIsModalOpen(false);
    } catch (err) {
      setError(err);
    }
  };

  const handleEdit = async (machine) => {
    setEditingMachine(machine);
    setNewMachineName(machine.name);
    setSelectedCluster(machine.cluster || '');
    setIsModalOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!newMachineName.trim()) return;
    
    try {
      // Replace with your API call
      await updateMachineAPI(editingMachine.id, { name: newMachineName,cluster:selectedCluster });
      
      // Simulated update
      const updatedMachine = machine.map(c => 
        c.id === editingMachine.id ? { ...c, name: newMachineName } : c
      );
      setMachine(updatedMachine);
      setIsModalOpen(false);
      setEditingMachine(null);
      setNewMachineName('');
      setSelectedCluster('');
    } catch (err) {
      setError(err);
    }
  };

  const handleDelete = async (machineId) => {
    //if (window.confirm('Are you sure you want to delete this cluster?')) {
      try {
        // Replace with your API call
         await deleteMachineAPI(machineId);
        
        // Simulated delete
        setMachine(machine.filter(c => c.id !== machineId));
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
              setEditingMachine(null);
              setNewMachineName('');
              setIsModalOpen(true);
            }}
            className="mb-3 flex items-center gap-2 bg-blue-600 text-white px-4 py-2  rounded-lg hover:bg-blue-700 transition-colors"
            style={{width:'fit-content'}}>
            <Plus size={20} />
            Add Machine
          </button>
    
          {machine?.length === 0 && !loading && (
            <div className="text-center p-8 bg-gray-50 rounded-lg">
              <Server className="mx-auto text-gray-400 mb-2" size={32} />
              <p className="text-gray-600">No machines found. Add your first machine!</p>
            </div>
          )}
    
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 ">
            {machine?.map((machine, index) => (
              <div
                key={machine.id || index}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="px-4 py-1 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Server className="text-blue-600" size={24} />
                      </div>
                      <div className="mb-0 mt-2">
                        <p className="text-sm text-gray-500 my-1">Machine Name</p>
                        <h3 className="font-semibold text-lg text-gray-800">{machine.name}</h3>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEdit(machine)}
                        className="p-2 text-blue-600 bg-gray-100 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Pencil size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(machine.id)}
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
                  {editingMachine ? 'Edit Machine' : 'Add Machine'}
                </h2>
                <input
                  type="text"
                  value={newMachineName}
                  onChange={(e) => setNewMachineName(e.target.value)}
                  placeholder="Enter machine name"
                  className="w-full p-2 border rounded-lg mb-4"
                />
                {/* Cluster Name Select */}
              <select
                value={selectedCluster}
                onChange={(e) => setSelectedCluster(e.target.value)}
                className="w-full p-2 border rounded-lg mb-4"
              >
                <option value="" disabled>
                  Select Cluster Name
                </option>
                {clusters?.map((cluster) => (
                  <option key={cluster.id} value={cluster.id}>
                    {cluster.name}
                  </option>
                ))}
              </select>
                <div className="flex justify-end gap-2 mt-4">
                  <button 
                    onClick={() => {
                      setIsModalOpen(false);
                      setNewMachineName('');
                      setEditingMachine(null);
                    }}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={editingMachine ? handleSaveEdit : handleAdd}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    {editingMachine ? 'Save Changes' : 'Add'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
}
export default Machine;

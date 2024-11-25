import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPermissionById, updatePermission } from '../services/PermissionService';

interface PermissionFormData {
  name: string;
  description: string;
}

const EditPermissionPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState<PermissionFormData>({
    name: '',
    description: ''
  });
  const [isLoading, setIsLoading] = useState(false);

    const GoToMainPage = () => {
        navigate('/admin');
    };

  useEffect(() => {
    const loadPermission = async () => {
      if (!id) return;
      try {
        const data = await getPermissionById(Number(id));
        setFormData({
          name: data.name,
          description: data.description || ''
        });
      } catch (err) {
        console.error('Error:', err);
      }
    };

    loadPermission();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    setIsLoading(true);
    try {
      await updatePermission(Number(id), formData);
      navigate('/PermissionPage');
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Editar Permiso</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-2">
            Nombre:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block mb-2">
            Descripción:
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows={4}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {isLoading ? 'Guardando...' : 'Guardar'}
        </button>
      </form>
      <button
        onClick={GoToMainPage} 
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      
      >
        Go to Main page
      </button>

    </div>
    
  );
};

export default EditPermissionPage;
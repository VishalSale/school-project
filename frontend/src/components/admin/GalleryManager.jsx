import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { Plus, Trash2, X } from 'lucide-react';
import ImageUpload from '../common/ImageUpload';

const GalleryManager = () => {
  const { galleryData, setGalleryData } = useData();
  const { showToast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'events',
    url: ''
  });
  const [filterCategory, setFilterCategory] = useState('all');

  const categories = ['all', 'events', 'sports', 'academics', 'infrastructure'];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newImage = {
      id: Date.now(),
      ...formData,
      date: new Date().toISOString().split('T')[0]
    };
    
    setGalleryData([...galleryData, newImage]);
    showToast('Image uploaded successfully!', 'success');
    resetForm();
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this image?')) {
      setGalleryData(galleryData.filter(item => item.id !== id));
      showToast('Image deleted successfully!', 'success');
    }
  };

  const resetForm = () => {
    setFormData({ title: '', category: 'events', url: '' });
    setShowForm(false);
  };

  const filteredImages = filterCategory === 'all'
    ? galleryData
    : galleryData.filter(img => img.category === filterCategory);

  return (
    <div className="manager-container">
      <div className="content-header">
        <h1>Manage Gallery</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? <X size={20} /> : <Plus size={20} />}
          <span>{showForm ? 'Cancel' : 'Upload Image'}</span>
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <h3>Upload New Image</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Annual Day 2025"
                required
              />
            </div>

            <div className="form-group">
              <label>Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              >
                <option value="events">Events</option>
                <option value="sports">Sports</option>
                <option value="academics">Academics</option>
                <option value="infrastructure">Infrastructure</option>
              </select>
            </div>

            <ImageUpload 
              value={formData.url} 
              onChange={(imageUrl) => setFormData({...formData, url: imageUrl})}
              label="Upload Gallery Image *"
            />

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">Upload</button>
              <button type="button" className="btn btn-outline" onClick={resetForm}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="gallery-filters">
        {categories.map((category) => (
          <button
            key={category}
            className={`filter-btn ${filterCategory === category ? 'active' : ''}`}
            onClick={() => setFilterCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="gallery-grid-admin">
        {filteredImages.length === 0 ? (
          <p className="no-data">No images yet. Upload your first one!</p>
        ) : (
          filteredImages.map((image) => (
            <div key={image.id} className="gallery-item-admin">
              <img src={image.url} alt={image.title} />
              <div className="gallery-item-overlay">
                <h4>{image.title}</h4>
                <span className="badge">{image.category}</span>
                <button
                  className="icon-btn delete"
                  onClick={() => handleDelete(image.id)}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GalleryManager;

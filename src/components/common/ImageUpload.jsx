import { useState } from 'react';
import { Upload, X, Image } from 'lucide-react';
import './ImageUpload.css';

const ImageUpload = ({ value, onChange, label = "Upload Image" }) => {
  const [preview, setPreview] = useState(value || '');
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        setPreview(imageUrl);
        onChange(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const removeImage = () => {
    setPreview('');
    onChange('');
  };

  return (
    <div className="image-upload-container">
      <label className="image-upload-label">{label}</label>
      
      {preview ? (
        <div className="image-preview">
          <img src={preview} alt="Preview" />
          <button
            type="button"
            className="remove-image"
            onClick={removeImage}
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div
          className={`image-upload-area ${isDragging ? 'dragging' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="file-input"
            id="image-upload"
          />
          <label htmlFor="image-upload" className="upload-label">
            <Upload size={32} />
            <span>Click to upload or drag and drop</span>
            <small>PNG, JPG, GIF up to 10MB</small>
          </label>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
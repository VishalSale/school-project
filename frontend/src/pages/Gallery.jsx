import { useState } from 'react';
import { useData } from '../context/DataContext';
import './Gallery.css';

const Gallery = () => {
  const { galleryData } = useData();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'events', 'sports', 'academics', 'infrastructure'];

  const filteredImages = selectedCategory === 'all' 
    ? galleryData 
    : galleryData.filter(img => img.category === selectedCategory);

  return (
    <div className="gallery-page">
      <section className="page-header">
        <div className="container">
          <h1>Gallery</h1>
          <p>Glimpses of life at Bright Future School</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="gallery-filters">
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          <div className="gallery-grid">
            {filteredImages.map((image) => (
              <div key={image.id} className="gallery-item">
                <img src={image.url} alt={image.title} />
                <div className="gallery-overlay">
                  <h3>{image.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;

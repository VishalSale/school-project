import { useState } from 'react';
import './Gallery.css';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'events', 'sports', 'academics', 'infrastructure'];

  const images = [
    { id: 1, category: 'events', title: 'Annual Day Celebration', url: 'https://via.placeholder.com/400x300/2563eb/ffffff?text=Annual+Day' },
    { id: 2, category: 'sports', title: 'Sports Day', url: 'https://via.placeholder.com/400x300/10b981/ffffff?text=Sports+Day' },
    { id: 3, category: 'academics', title: 'Science Lab', url: 'https://via.placeholder.com/400x300/f59e0b/ffffff?text=Science+Lab' },
    { id: 4, category: 'infrastructure', title: 'School Building', url: 'https://via.placeholder.com/400x300/8b5cf6/ffffff?text=Building' },
    { id: 5, category: 'events', title: 'Cultural Program', url: 'https://via.placeholder.com/400x300/2563eb/ffffff?text=Cultural' },
    { id: 6, category: 'sports', title: 'Basketball Court', url: 'https://via.placeholder.com/400x300/10b981/ffffff?text=Basketball' },
    { id: 7, category: 'academics', title: 'Computer Lab', url: 'https://via.placeholder.com/400x300/f59e0b/ffffff?text=Computer+Lab' },
    { id: 8, category: 'infrastructure', title: 'Library', url: 'https://via.placeholder.com/400x300/8b5cf6/ffffff?text=Library' },
    { id: 9, category: 'events', title: 'Independence Day', url: 'https://via.placeholder.com/400x300/2563eb/ffffff?text=Independence' },
    { id: 10, category: 'sports', title: 'Cricket Match', url: 'https://via.placeholder.com/400x300/10b981/ffffff?text=Cricket' },
    { id: 11, category: 'academics', title: 'Classroom', url: 'https://via.placeholder.com/400x300/f59e0b/ffffff?text=Classroom' },
    { id: 12, category: 'infrastructure', title: 'Playground', url: 'https://via.placeholder.com/400x300/8b5cf6/ffffff?text=Playground' }
  ];

  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

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

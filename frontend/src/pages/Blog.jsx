import { useState } from 'react';
import { useData } from '../context/DataContext';
import { Calendar, User, Tag } from 'lucide-react';
import './Blog.css';

const Blog = () => {
  const { blogData } = useData();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Achievements', 'Events', 'Activities', 'Updates'];

  const publishedPosts = blogData.filter(post => post.published);
  
  const filteredPosts = selectedCategory === 'all'
    ? publishedPosts
    : publishedPosts.filter(post => post.category === selectedCategory);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="blog-page">
      <section className="page-header">
        <div className="container">
          <h1>News & Updates</h1>
          <p>Stay informed about school activities, achievements, and events</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="blog-filters">
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

          <div className="blog-grid">
            {filteredPosts.length === 0 ? (
              <div className="no-posts">
                <p>No posts available in this category.</p>
              </div>
            ) : (
              filteredPosts.map((post) => (
                <article key={post.id} className="blog-card">
                  <div className="blog-image">
                    <img src={post.image} alt={post.title} />
                    <span className="blog-category">{post.category}</span>
                  </div>
                  <div className="blog-content">
                    <h2>{post.title}</h2>
                    <div className="blog-meta">
                      <span>
                        <Calendar size={16} />
                        {formatDate(post.date)}
                      </span>
                      <span>
                        <User size={16} />
                        {post.author}
                      </span>
                    </div>
                    <p className="blog-excerpt">{post.excerpt}</p>
                    <p className="blog-full-content">{post.content}</p>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;

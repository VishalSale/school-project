import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Plus, Edit, Trash2, X, Eye, EyeOff } from 'lucide-react';

const BlogManager = () => {
  const { blogData, setBlogData } = useData();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Achievements',
    author: 'Admin',
    image: '',
    excerpt: '',
    content: '',
    published: true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingId) {
      setBlogData(blogData.map(item =>
        item.id === editingId
          ? { ...item, ...formData }
          : item
      ));
    } else {
      const newPost = {
        id: Date.now(),
        ...formData,
        date: new Date().toISOString().split('T')[0]
      };
      setBlogData([...blogData, newPost]);
    }
    
    resetForm();
  };

  const handleEdit = (post) => {
    setFormData({
      title: post.title,
      category: post.category,
      author: post.author,
      image: post.image,
      excerpt: post.excerpt,
      content: post.content,
      published: post.published
    });
    setEditingId(post.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this post?')) {
      setBlogData(blogData.filter(item => item.id !== id));
    }
  };

  const togglePublish = (id) => {
    setBlogData(blogData.map(item =>
      item.id === id
        ? { ...item, published: !item.published }
        : item
    ));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: 'Achievements',
      author: 'Admin',
      image: '',
      excerpt: '',
      content: '',
      published: true
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="manager-container">
      <div className="content-header">
        <h1>Manage Blog & News</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? <X size={20} /> : <Plus size={20} />}
          <span>{showForm ? 'Cancel' : 'Add New Post'}</span>
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <h3>{editingId ? 'Edit Post' : 'Create New Post'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                >
                  <option value="Achievements">Achievements</option>
                  <option value="Events">Events</option>
                  <option value="Activities">Activities</option>
                  <option value="Updates">Updates</option>
                </select>
              </div>
              <div className="form-group">
                <label>Author *</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Image URL *</label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://example.com/image.jpg"
                required
              />
            </div>

            <div className="form-group">
              <label>Excerpt (Short Summary) *</label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                rows="2"
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label>Full Content *</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows="6"
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                />
                <span>Publish immediately</span>
              </label>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingId ? 'Update' : 'Create Post'}
              </button>
              <button type="button" className="btn btn-outline" onClick={resetForm}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="items-list">
        {blogData.length === 0 ? (
          <p className="no-data">No blog posts yet. Create your first one!</p>
        ) : (
          blogData.map((post) => (
            <div key={post.id} className="item-card blog-item">
              <div className="blog-item-image">
                <img src={post.image} alt={post.title} />
              </div>
              <div className="blog-item-content">
                <div className="item-header">
                  <div>
                    <h3>{post.title}</h3>
                    <span className={`badge ${post.published ? 'badge-success' : 'badge-draft'}`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <div className="item-actions">
                    <button
                      className="icon-btn"
                      onClick={() => togglePublish(post.id)}
                      title={post.published ? 'Unpublish' : 'Publish'}
                    >
                      {post.published ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                    <button className="icon-btn" onClick={() => handleEdit(post)}>
                      <Edit size={18} />
                    </button>
                    <button className="icon-btn delete" onClick={() => handleDelete(post.id)}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <p className="item-category">{post.category} • {post.author}</p>
                <p className="item-excerpt">{post.excerpt}</p>
                <p className="item-date">Posted on: {post.date}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BlogManager;

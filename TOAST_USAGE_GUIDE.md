# Toast Notification Usage Guide

## 🎯 How to Use Toast Notifications

Toast notifications are now globally available throughout your app!

---

## ✅ Already Implemented

Toast notifications have been added to all admin managers:

### **BlogManager**
- ✅ Create post: "Blog post created successfully!"
- ✅ Update post: "Blog post updated successfully!"
- ✅ Delete post: "Blog post deleted successfully!"
- ✅ Publish/Unpublish: "Post published" / "Post unpublished"

### **FacultyManager**
- ✅ Add faculty: "Faculty member added successfully!"
- ✅ Update faculty: "Faculty member updated successfully!"
- ✅ Delete faculty: "Faculty member deleted successfully!"

### **GalleryManager**
- ✅ Upload image: "Image uploaded successfully!"
- ✅ Delete image: "Image deleted successfully!"

### **AnnouncementsManager**
- ✅ Create announcement: "Announcement created successfully!"
- ✅ Update announcement: "Announcement updated successfully!"
- ✅ Delete announcement: "Announcement deleted successfully!"

---

## 📝 How to Add Toast to Any Component

### Step 1: Import the hook
```jsx
import { useToast } from '../context/ToastContext';
```

### Step 2: Use the hook in your component
```jsx
function MyComponent() {
  const { showToast } = useToast();
  
  // Your component logic
}
```

### Step 3: Call showToast when needed
```jsx
// Success message (green)
showToast('Operation completed successfully!', 'success');

// Error message (red)
showToast('Something went wrong!', 'error');

// Info message (blue)
showToast('Please note this information', 'info');
```

---

## 🎨 Toast Types

| Type | Color | Use Case |
|------|-------|----------|
| `success` | Green | Successful operations (save, delete, update) |
| `error` | Red | Errors, failures, validation issues |
| `info` | Blue | Informational messages, status changes |

---

## 💡 Examples

### Example 1: Form Submission
```jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    await saveData(formData);
    showToast('Data saved successfully!', 'success');
  } catch (error) {
    showToast('Failed to save data', 'error');
  }
};
```

### Example 2: Delete Action
```jsx
const handleDelete = (id) => {
  if (confirm('Are you sure?')) {
    deleteItem(id);
    showToast('Item deleted successfully!', 'success');
  }
};
```

### Example 3: Status Change
```jsx
const toggleStatus = (id) => {
  const item = items.find(i => i.id === id);
  updateStatus(id, !item.active);
  showToast(
    item.active ? 'Item deactivated' : 'Item activated',
    'info'
  );
};
```

### Example 4: Validation Error
```jsx
const validateForm = () => {
  if (!email.includes('@')) {
    showToast('Please enter a valid email address', 'error');
    return false;
  }
  return true;
};
```

---

## 🚀 Future Additions

You can easily add toasts to:

### **Contact Form** (`src/pages/Contact.jsx`)
```jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    // API call
    showToast('Message sent successfully!', 'success');
  } catch (error) {
    showToast('Failed to send message', 'error');
  }
};
```

### **Admissions Form** (`src/pages/Admissions.jsx`)
```jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    // API call
    showToast('Application submitted successfully!', 'success');
  } catch (error) {
    showToast('Failed to submit application', 'error');
  }
};
```

### **Login** (`src/pages/Login.jsx`)
```jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    login(userData);
    showToast('Login successful!', 'success');
  } catch (error) {
    showToast('Invalid credentials', 'error');
  }
};
```

---

## ⚙️ Configuration

### Toast Duration
Default: 3 seconds (auto-dismiss)

To change duration, modify `src/components/common/Toast.jsx`:
```jsx
<Toast duration={5000} /> // 5 seconds
```

### Toast Position
Default: Top-right corner

To change position, modify `src/components/common/Toast.css`:
```css
.toast-container {
  top: 5rem;
  right: 2rem;
  /* Change to: */
  bottom: 2rem; /* Bottom-right */
  left: 2rem;   /* Bottom-left */
}
```

---

## 🎯 Best Practices

1. **Be Specific**: "Blog post created" is better than "Success"
2. **Use Appropriate Types**: Success for completions, error for failures
3. **Keep Messages Short**: One line is ideal
4. **Don't Overuse**: Only for important user feedback
5. **Pair with Actions**: Show toast after user actions complete

---

## 📦 Files Involved

- `src/context/ToastContext.jsx` - Global toast provider
- `src/components/common/Toast.jsx` - Toast component
- `src/components/common/Toast.css` - Toast styles
- `src/App.jsx` - ToastProvider wrapper

---

**Last Updated:** December 6, 2025

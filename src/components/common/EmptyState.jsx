import { FileQuestion } from 'lucide-react';
import './EmptyState.css';

const EmptyState = ({ 
  icon: Icon = FileQuestion,
  title = 'No data found',
  message = 'Get started by adding your first item',
  actionLabel,
  onAction
}) => {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <Icon size={64} />
      </div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-message">{message}</p>
      {actionLabel && onAction && (
        <button className="btn btn-primary" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;

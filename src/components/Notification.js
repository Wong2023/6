import { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const Notification = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="notification">
      <p>{message}</p>
      <button onClick={onClose} className="close-btn">
        <FaTimes />
      </button>
    </div>
  );
};

export default Notification;
import React from 'react';
import styles from './modal.module.css';

const Modal = ({ title, onClose, children }) => {
  const onClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles.modal}>
        <header className={styles.flex}>
          <h3 className={styles.h3}>{title}</h3>
          <button className={styles.close} onClick={onClose}>
            &times;
          </button>
        </header>
        {children}
      </div>
    </div>
  );
};

export default Modal;

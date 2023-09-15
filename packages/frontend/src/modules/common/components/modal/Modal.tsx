/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { Backdrop, ModalContainer } from './Modal.styled';
import { ModalProps } from './Modal.props';

const rootModal = document.querySelector('#root_modal');

const Modal = ({ onClose, children }: ModalProps): null | JSX.Element => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return rootModal
    ? createPortal(
      <Backdrop onClick={handleClose}>
        <ModalContainer>{children}</ModalContainer>
      </Backdrop>,

      rootModal
    )
    : null;
};

export default Modal;

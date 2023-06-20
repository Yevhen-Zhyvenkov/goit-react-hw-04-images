import css from './Modal.module.css'
import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
    componentDidMount() {
        document.addEventListener('keydown', this.keyDown);
    };

    componentWillUnmount() {
        document.removeEventListener('keydown', this.keyDown);
    };
    
    keyDown = (e) => {
        if (e.code === 'Escape') {
            this.props.closeModal();
        }
    };

    backdropClick = (e) => {
        if (e.target === !e.currentTarget) {
            this.props.closeModal();
        }
    };
  
    render() {
        const { tags, largeImageURL } = this.props;
        return createPortal(
            <div className={css.overlay} onClick={this.backdropClick}>
                <div className={css.modal}>
              <img  src={largeImageURL} alt={tags}/>
                </div>
            </div>,
            modalRoot
        );
    }
};

Modal.propTypes = {
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
};


export default Modal;

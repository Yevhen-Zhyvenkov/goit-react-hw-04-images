import Modal from 'components/Modal/Modal';
import css from './ImageGalleryItem.module.css'
import { Component } from 'react';
import PropTypes from 'prop-types';


class ImageGalleryItem extends Component {
    state = {
        showModal: false
    };

    getToggleModal = () => {
        this.setState(({ showModal }) => ({
            showModal: !showModal,
        }));
    };

    render() {
        const { showModal } = this.state;
        const { src, alt, largeImageURL } = this.props;

        return (
            <li className={css.imageGalleryItem} onClick={this.getToggleModal}>
                <img  className={css.imageGalleryItem_image} src={src} alt={alt} loading="lazy" />
                {showModal && (
                    <Modal
                        largeImageURL={largeImageURL}
                        tags={alt}
                        closeModal={this.getToggleModal}
                    />
                )}
            </li>
        )
    };
};

ImageGalleryItem.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
};
  

export default ImageGalleryItem;
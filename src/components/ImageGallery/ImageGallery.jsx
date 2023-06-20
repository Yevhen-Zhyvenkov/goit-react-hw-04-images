import css from './ImageGallery.module.css'
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

const ImageGallery = ({ images }) => (
  <ul className={css.imageGallery }>
    {images.map(({ id, webformatURL, tags, largeImageURL }) => (
      <ImageGalleryItem
        key={id}
        src={webformatURL}
        alt={tags}
        largeImageURL={largeImageURL}
      />
    ))}
  </ul>
); 
  
ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  )
};

export default ImageGallery
 
 



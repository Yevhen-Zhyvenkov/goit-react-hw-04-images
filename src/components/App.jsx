import { fetchImages } from 'services/Api.js';
import css from './App.module.css'
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';

export const App = () => {
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const per_page = 12;

  useEffect(() => {
    getFetchImages(searchText, page);
  }, [searchText, page])
  
  const getFetchImages = async (search, page) => {
    if (!search) {
      return;
    }
    setIsLoading(true);
    try {
      const { hits, totalHits } = await fetchImages(search, page);
      if (!hits.length) {
        setLoadMore(false);
        toast.error('Nothing was found. Try something else!');
        return;
      }
      setImages(prevImages => [...prevImages, ...hits]);
      setLoadMore(page < Math.ceil(totalHits / per_page));
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onloadMore = () => {
    setPage(prevPage => prevPage + 1)
  };

  const handleSearch = searchText => {
    setSearchText(searchText);
    setImages([]);
    setPage(1);
  }
  return (
  <div className={css.App}>
    <Searchbar onSubmit={handleSearch} />
    <ImageGallery images={images} />
    {isLoading && <Loader />}
    {!isLoading && loadMore && <Button onloadMore={onloadMore} page={page} />}
    {error && error.message}
    <ToastContainer autoClose={3000} />
  </div>
);
  
}



//OLD
// export class App extends Component {
//   state = {
//     searchText: '',
//     error: null,
//     isLoading: false,
//     loadMore:false,
//     images: [],
//     page: 1,
//     per_page: 12,
//   } 
  
// componentDidUpdate(_, prevState) {
//     const { searchText, page } = this.state;
//     if (prevState.searchText !== searchText || prevState.page !== page) {
//       this.getFetchImages(searchText, page);
//     }
//   };

// getFetchImages = async (search, page) => {
//     this.setState({ isLoading: true });
//      if (!search) {
//       return;
//     }
//     try {
//       const { hits, totalHits } = await fetchImages(search, page);
//       if (!hits.length) {
//       this.setState({loadMore: false})
//       return toast.error('Nothing was found. Try something else!');  
//       }
//       this.setState(prevState => ({
//         images: [...prevState.images, ...hits],
//         loadMore: this.state.page < Math.ceil(totalHits / this.state.per_page),
//       }));
//     } catch (error) {
//       this.setState({ error: error.message });
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   };

// onloadMore = () => { 
//     this.setState({ showButton: false });
//     this.setState(
//       prevState => {
//         return { page: prevState.page + 1 };
//       },) 
//   };

// handleSearch = searchText => {
//     this.setState({ searchText, images: [], page:1 })
   
//   }

//   render() { 
//     const {  images,  loadMore, page, isLoading} = this.state;
//     return (
//       <div className={css.App}>
//       <Searchbar onSubmit={this.handleSearch} />
//       <ImageGallery images={images} />
      
//       {isLoading ? <Loader /> : null}
       
//       {!isLoading && loadMore && <Button onloadMore={this.onloadMore} page={page} />}
      
//       <ToastContainer />
//     </div>
//     );
//   }
  
// }


import { fetchImages } from 'services/Api.js';
import css from './App.module.css'
import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';;

export class App extends Component {
  state = {
    searchText: '',
    error: null,
    isLoading: false,
    loadMore:false,
    images: [],
    page: 1,
    per_page: 12,
  } 
  
componentDidUpdate(_, prevState) {
    const { searchText, page } = this.state;
    if (prevState.searchText !== searchText || prevState.page !== page) {
      this.getFetchImages(searchText, page);
    }
  };

getFetchImages = async (search, page) => {
    this.setState({ isLoading: true });
     if (!search) {
      return;
    }
    try {
      const { hits, totalHits } = await fetchImages(search, page);
      if (!hits.length) {
      this.setState({loadMore: false})
      return toast.error('Nothing was found. Try something else!');  
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        loadMore: this.state.page < Math.ceil(totalHits / this.state.per_page),
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

onloadMore = () => { 
    this.setState({ showButton: false });
    this.setState(
      prevState => {
        return { page: prevState.page + 1 };
      },) 
  };

handleSearch = searchText => {
    this.setState({ searchText, images: [], page:1 })
   
  }

  render() { 
    const {  images,  loadMore, page, isLoading} = this.state;
    return (
      <div className={css.App}>
      <Searchbar onSubmit={this.handleSearch} />
      <ImageGallery images={images} />
      
      {isLoading ? <Loader /> : null}
       
      {!isLoading && loadMore && <Button onloadMore={this.onloadMore} page={page} />}
      
      <ToastContainer />
    </div>
    );
  }
  
}


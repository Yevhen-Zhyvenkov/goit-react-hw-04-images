import css from './Searchbar.module.css'
import PropTypes from 'prop-types';
import {  useState } from 'react';
import { toast } from 'react-toastify';

const Searchbar = ({ onSubmit }) => {
    const [searchText, setSearchText] = useState('')

    const handleChange = (e) => {
        setSearchText(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (searchText === '') {
           return toast.warning('Please enter the text!');    
        }
        onSubmit(searchText);
        setSearchText('');
    }

        return (
            <header className={css.searchbar}>
                <form className={css.searchForm} onSubmit={handleSubmit}>
                    <button type="submit" className={css.searchForm_button}>
                    <span className={css.searchForm_label}>Search</span>
                    </button>
                    <input
                    className={css.searchForm_input}
                    type="text"
                    placeholder="Search images and photos"
                    onChange={handleChange}
                    value={searchText}
                    />
                </form>
            </header>
        );
    }


Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};
 
export default Searchbar;




//OLD
// class Searchbar extends Component {
//     state = {
//         searchText: ''
//     }
   
//     handleChange = (e) => {
//         this.setState({ searchText:e.target.value }) 
//         // console.log(e.target.value);
//     }

//     handleSubmit = (e) => {
//         e.preventDefault()
//         if (this.state.searchText === '') {
//            return toast.warning('Please enter the text!');    
//         }
//         // console.log(this.state);
//         this.props.onSubmit(this.state.searchText);
//         this.setState({ searchText: '' });
//     }

//     render() { 
//         return (
//             <header className={css.searchbar}>
//                 <form className={css.searchForm} onSubmit={this.handleSubmit}>
//                     <button type="submit" className={css.searchForm_button}>
//                     <span className={css.searchForm_label}>Search</span>
//                     </button>
//                     <input
//                     className={css.searchForm_input}
//                     type="text"
//                     placeholder="Search images and photos"
//                     onChange={this.handleChange}
//                     value={this.state.searchText}
//                     />
//                 </form>
//             </header>
//         );
//     }
// }

// Searchbar.propTypes = {
//     onSubmit: PropTypes.func.isRequired,
// };
 
// export default Searchbar;
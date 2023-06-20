import css from './Loader.module.css'
import { ThreeCircles } from 'react-loader-spinner';

const Loader = () => {
    return (<div className={css.loader}>
        <ThreeCircles
            visible={true}
            height="90"
            width="90"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper" 
        /></div>)
};

export default Loader;
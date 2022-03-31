import './CustomButton.scss';

const CustomButton = ({ children, ...OtherProps }) =>{
    return(
          <button className='custom-btn'
          {...OtherProps}>
             {children}
          </button>
    );
}

export default CustomButton;
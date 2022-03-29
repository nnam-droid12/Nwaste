import './CustomButton.scss';

const CustomButton = ({ children, ...OtherProps }) =>{
    return(
          <button className='custom-button'
          {...OtherProps}>
             {children}
          </button>
    );
}

export default CustomButton;
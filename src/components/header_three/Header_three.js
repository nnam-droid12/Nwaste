import './header_three.scss';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo1.png';


const HeaderThree = () => {
    return ( 
        <nav className="headerThree-nav">
             <Link to='/'>
             <div> 
                    <div className='logo-container' title='Go to home page!'>
                    <div className='col'>
                    <img className='logo' alt='logo' src={Logo} style={{height: '65px', width: '65px'}}/> 
                        <div className='text col'>
                            Nwaste
                        </div>
                </div>
                </div>    
            </div> 
            </Link>

            <button >
            <Link className='product-btn' to='/productform'>Submit Products</Link>
            </button>
        </nav>
     );
}
 
export default HeaderThree;
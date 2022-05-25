import React,{ useState, useEffect } from 'react';
import {db} from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import './FarmersDashboard.scss';


const Dashboard = ({currentUser}) =>{

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          const data = await db.collection("Products").get();
          setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        };
        fetchData();
      }, []);

    return (
        <div>
          <h2 style={{display:'flex', justifyContent: 'center', textAlign:'center'}}>{currentUser && <p>{currentUser.displayName} Dashboard</p> }</h2>
        <section style={{display:'flex', justifyContent:'space-between', textAlign: 'center'}}>
            <h4>Product</h4>
            <h4>Price</h4>
            <h4>Description</h4>
            <h4>Status</h4>
        </section>
        {currentUser && currentUser.displayName?

        ( products.map((i) => 
                    <div key={i.id}>
                        <img src={i.imageUrl} alt="images" style={{width: '55px', height:'55px'}} />
                        <div className='product-detail ml3'>
                          <h3 className='name'> {i.title}</h3>
                          <h4 className='price'>${i.price}</h4>
                        </div>
                    </div>)) : (<h3>No products submitted yet</h3>)
                  }

        </div>
    )
}


const mapInitialStateToProps = state => ({
    currentUser: selectCurrentUser(state)
})

export default connect(mapInitialStateToProps)(Dashboard);
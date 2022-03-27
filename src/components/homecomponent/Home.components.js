// import '../../assets/bg1.jpg';
import Usereview from '../reviewpage/Review.components';
import './HomePage.scss';

const HomePage = () => {
    return(
        <div  className='home-page'>
          <div className='container'>
              <div className='outer'>
                <div className='details'>
                    <h3>Nwaste the game changer</h3>
                    <h4>
                        <span>Making Farmers Happy.</span>
                        <span> Our Mission Zero Hunger in 2030</span>
                    </h4>
                </div>
              </div>
          </div>
          <div className='our-work'>
              <h3 className='work-title'>What We Do</h3>
          </div>    
    <section style={{marginTop: '10px'}} className="review">
        <div className='title'>
            <h2>User Reviews</h2>
            <div className='underline'></div>
        </div>
        <Usereview />
    </section>
      <div className='future-plan'>
          <h3>Our Mission</h3>
          <div className='mission-text'>
          <p>lorem ipsom</p>
          </div>
      </div>
        </div>
    );
}

export default HomePage;
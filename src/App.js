import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/homecomponent/Home.components';
import AboutPage from './components/aboutcomponent/About.components';
import DisplayFaq from './components/displayfaq/Display-Faq.components';
import './App.css';
import SignIn from './components/signincomponent/SignIn.components';
import SignUp from './components/signup-component/SignUp.component';
import Header from './components/header/Header';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import Scroll from './components/scroll/Scroll';
import Footer from './components/footer/Footer';


class App extends React.Component {
  constructor(){
    super();
      this.state= {
        currentUser: null
    }
  }
    unsubscribeFromAuth = null

  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      createUserProfileDocument(userAuth);
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
            id: snapShot.id,
            ...snapShot.data()
            }
          })
        })
      }else {
        this.setState({currentUser: userAuth})
      }
    });
  }

  componentWillUnmount(){
   this.unsubscribeFromAuth()
  }
  render() {
  return (
    <div className="App">
      <Header currentUser={this.state.currentUser} />
       <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/faq' element={<DisplayFaq />} />
          <Route path='/signin' element={<Scroll><SignIn /></Scroll>} />
          <Route path='/signup' element={<Scroll><SignUp /></Scroll>} /> 
       </Routes>
      <Footer />
    </div>
  );
  }
}

export default App;

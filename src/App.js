import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/homecomponent/Home.components';
import AboutPage from './components/aboutcomponent/About.components';
import DisplayFaq from './components/displayfaq/Display-Faq.components';
import './App.css';
import SigninAndSignupPage from './pages/signin-and-signup-page/Signin-And-Signup';
import Header from './components/header/Header';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';


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
      }else{
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
          <Route path='/signin' element={<SigninAndSignupPage />} /> 
       </Routes>
           
    </div>
  );
  }
}

export default App;

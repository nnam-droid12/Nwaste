import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/homecomponent/Home.components';
import AboutPage from './components/aboutcomponent/About.components';
import DisplayFaq from './components/displayfaq/Display-Faq.components';
import './App.css';
import SignIn from './components/signincomponent/SignIn.components';
import SignUp from './components/signup-component/SignUp.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import UserHomePage from './components/userhomepage/Userhome.component';
import ForgotPassword from './components/forgot-password/ForgotPassword.component';
import ResetMessage from './components/reset-password/ResetPassword.component';
// import Header_two from './components/header_two/Header_two';
import Farmer from './components/farmers/Farmer.component';
import Loan from './components/news/News.component';
import ProductForm from './components/productform/ProductForm.component';





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
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
            id: snapShot.id,
            ...snapShot.data()
            }
          }, () =>{
            console.log(this.state)
          })
        })
      }else {
        this.setState({ currentUser: userAuth });
      }
    });
  }

  componentWillUnmount(){
   this.unsubscribeFromAuth();
  }
  render() {
  return (
    <div className="App">
      
       <Routes>
          <Route path='/' element={<HomePage currentUser={this.state.currentUser} />} />
          <Route path='/about' element={<AboutPage currentUser={this.state.currentUser} />} />
          <Route path='/faq' element={<DisplayFaq currentUser={this.state.currentUser} />} />
          <Route path='/signin' element={<SignIn />}  />
          <Route path='/signup' element={<SignUp />} /> 
          <Route path='/forgotpassword' element={<ForgotPassword />} />
          <Route path='/resetmessage' element= {<ResetMessage />} />
          <Route path='/farmers' element= {<Farmer currentUser={this.state.currentUser} />} />
          <Route path='/loan' element= {<Loan currentUser={this.state.currentUser} />} />
          <Route path='/productform' element= {<ProductForm />} />
            <Route path='/userhome' element={<UserHomePage currentUser={this.state.currentUser} />}  />
       </Routes>
    </div>
  );
  }
}

export default App;

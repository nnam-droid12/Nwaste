import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/homecomponent/Home.components';
import AboutPage from './components/aboutcomponent/About.components';
import DisplayFaq from './components/displayfaq/Display-Faq.components';
import './App.css';
import SigninAndSignupPage from './pages/signin-and-signup-page/Signin-And-Signup';
import Header from './components/header/Header';


class App extends React.Component {
  constructor(){
    super();
      this.state= {

    }
  }
  render() {
  return (
    <div className="App">
      <Header />
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

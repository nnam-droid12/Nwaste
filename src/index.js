import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import SupportAdmin from './components/user-support/support-admin/SupportAdmin';

import * as serviceWorker from './serviceWorker';

const path = window.location.pathname

ReactDOM.render(
<Provider store={store}>
   <BrowserRouter>
   { path.indexOf('/support') === -1 ? <App /> : <SupportAdmin /> }
   </BrowserRouter>
</Provider>,
document.getElementById('root')
);

serviceWorker.register();


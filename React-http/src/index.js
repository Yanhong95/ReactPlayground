import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.header.commom['Authorization'] = 'AUTH TIKEN';
axios.defaults.header.post['Content-Type'] = 'application/json';
ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();

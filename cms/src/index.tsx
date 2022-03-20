import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import './scss/main.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';

const checkSignedInState = () => {
  if(window.location.pathname != '/signin') {
    const state = Cookies.get('signedIn');
    if(!state) {
      window.location.href = '/signin';
    }
  }
}

// For GET requests
axios.interceptors.request.use(
  (req) => {
    console.log(req);
    checkSignedInState();
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// For POST requests
axios.interceptors.response.use(
  (res) => {
    checkSignedInState();
    // Add configurations here
    if (res.status === 201) {
      //  console.log('Posted Successfully');
    }
    return res;
  },
  (err) => {
    return Promise.reject(err);
  }
);


ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
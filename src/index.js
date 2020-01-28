import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import  'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

import App from './component/App';


render(
  <Router>
    <App />
  </Router>,
  document.getElementById("app")
);

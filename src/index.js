import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Home from './Home';
import { BrowserRouter as Router, Route } from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import AuthorBox from './Author';

ReactDOM.render(
    (<Router>
            <App>
                <Route exact path="/" component={Home} />
                <Route path="/author" component={AuthorBox}/>
                <Route path="/book" />
            </App>
    </Router>),
     document.getElementById('root')
);

serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './login';
import Register from './register';
import Home from './home';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Switch, Route} from 'react-router-dom'


ReactDOM.render(
<BrowserRouter>
<Switch>
<Route path="/home" component={Home} />
<Route path="/register" component={Register} />
<Route exact path="/" component={Login} />
</Switch>
</BrowserRouter>
, document.getElementById('root'));
registerServiceWorker();

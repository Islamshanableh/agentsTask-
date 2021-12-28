import React from 'react';
import { Route,Switch } from 'react-router-dom';
import { Register } from './components/auth/signUp/index';
import Dashboard from './components/dashboard/Dashboard';
import Navigation from './components/navigation';
import Login from './components/auth/login';
import { OneSeller } from './components/seller';
import { Logout } from './components/logout/logout';
import Main from './components/main';
const App = () => {
	return <div className="App">
		<Navigation/>
		<Switch>
      
		<Route path="/logout" component={Logout} />
	  <Route path="/register" component={Register} />
	  <Route path="/login" component={Login} />
	  <Route path="/home" component={Main} />
	  <Route path="/dashboard" component={Dashboard} />
	  <Route path="/detail/:id" component={OneSeller} />
	  <Route path="/" component={Main} />
	</Switch>
	</div>;
};

export default App;

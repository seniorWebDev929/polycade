import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Link
} from 'react-router-dom';
import Machines from './Machines';
import './App.css';
import ViewMachine from './components/ViewMachine';

function App () {
	return (
		<Router>
			<div className='App'>
				<header className='App-header'>
					<img alt='logo' height='272' width='800' src='https://i.imgur.com/jcvsFKh.png' />
				</header>

				<nav className='App-nav'>
					<Link to='/'>Home</Link>
					<Link to='/machines'>Machines</Link>
				</nav>

				<Switch>
					<Route exact path='/machines' component={Machines} />
					<Route exact path='/machines/:machineId' component={ViewMachine} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;

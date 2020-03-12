import React from 'react';
import { connect } from 'react-redux';
import * as machineActions from './reducers/getMachineReducer';
import HealthBar from './components/HealthBar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { w3cwebsocket as W3CWebSocket } from "websocket";

/* eslint-disable react/prop-types */
class Machines extends React.Component {
	
	componentDidMount() {
		const client = new W3CWebSocket("ws://localhost:1337");
		client.onmessage = (msg) => {
			let data = JSON.parse(msg.data);
			const { actions } = this.props;
			actions.updateHealth(data);
		};
		axios.get('http://localhost:8080/machines')
			.then(response => {
				if(response.data) {
					const { actions } = this.props;
					actions.getAllMachines(response.data);
				}
			})
			.catch(error => {
				console.error(error);
			})
	}
	
	render() {
		const { machineList } = this.props;
		
		return (
			<div>
				<table className="table table-bordered table-striped">
					<thead>
						<tr>
							<td>Name</td>
							<td>IP Address</td>
							<td>Health</td>
						</tr>
					</thead>
					<tbody>
						{ machineList.map(machine => {
							return (
								<tr key={machine.id} >
									<td><Link to={`/machines/${machine.id}`}>{machine.name}</Link></td>
									<td><Link to={`/machines/${machine.id}`}>{machine.ip_address}</Link></td>
									<td>
										<Link to={`/machines/${machine.id}`}>
											<HealthBar health={machine.health}/>
										</Link>
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		)
	}
}

const mapStateToProps = ({ machines }) => ({
	machineList: machines.machines
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(machineActions, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Machines);
/* eslint-enable react/prop-types */
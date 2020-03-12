import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import * as machineActions from '../reducers/getMachineReducer';
import HealthBar from './HealthBar';
/* eslint-disable react/prop-types */
class ViewMachine extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            machineName: ''
        }
        this.nameSubmit = this.nameSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
		axios.get('http://localhost:8080/machines')
			.then(response => {
				if(response.data) {
					const { machineData } = this.props;
					machineData.getAllMachines(response.data);
				}
			})
			.catch(error => {
				console.error(error);
			})
    }
    onChange = (e) => {
        this.setState({
            machineName: e.target.value
        })
    }

    nameSubmit = (e) => {
        e.preventDefault();
        axios.put('http://localhost:8080/machines/'+this.props.match.params.machineId,{ name: this.state.machineName })
            .then(response => {
                const { machineData } = this.props;
                machineData.updateMachineName(response.data);
            })
            .catch(error => {
                console.error(error);
            })
    }

    render() {
        const containerDiv = {
            diplay: "flex"
        }
        const submitNameStyle = {
            width: "45%",
            float: "left"
        }
        const nameStyle = {
            width: "100%"
        }
        const btnStyle = {
            float : "right",
            marginTop: "20px"
        }
        const statusStyle = {
            width: "45%",
            float: "right",
            textAlign: "center"
        }
        const healthDiv = {
            
            padding: "20px",
            border: "1px solid black"
        }
        const machineId = this.props.match.params.machineId;
        const { machineList } = this.props;
        let machine = machineList.filter(machine => machine.id === machineId).map(ele => {
            return(
                <div key={ele.id} style={containerDiv}>
                    <div style={submitNameStyle}>
                        <h1>{ele.name}</h1>
                        <h2>Update Device</h2>
                        <label>Name:</label>
                        <input type="text" onChange={this.onChange} style={nameStyle} placeholder={ele.name}/>
                        <button style={btnStyle} onClick={this.nameSubmit}>Submit</button>
                    </div>
                    <div style={statusStyle}>
                        <div style={healthDiv}>
                            <h2>{ele.health}</h2>
                            <HealthBar health={ele.health}/>
                        </div>
                        <h2>Status:{ele.ip_address}</h2>
                    </div>
                </div>
            )
        });
        return (
            <div>
                {machine}
            </div>
        )
    }
}

const mapStateToProps = ({ machines }) => ({
	machineList: machines.machines
})

const mapDispatchToProps = dispatch => ({
	machineData: bindActionCreators(machineActions, dispatch)
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewMachine);
/* eslint-enable react/prop-types */
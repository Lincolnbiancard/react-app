import React, { Component } from 'react';
import PublicSubscriber from 'pubsub-js';

export default class InputCustom extends Component {

    constructor(){
        super();
        this.state = {errorMsg: ''};
    }

    render(){
        return(
            <div className="pure-control-group">
                <label htmlFor={this.props.id}>{this.props.label}</label> 
                <input id={this.props.id} type={this.props.type} name={this.props.name} value={this.props.value}  onChange={this.props.onChange} />                  
                <span className="error">{this.state.errorMsg}</span>
            </div>
        );
    }

    componentDidMount(){
        PublicSubscriber.subscribe("ErrorPublish", function(topic,error){
            if(error.field === this.props.name){
                this.setState({ errorMsg:error.defaultMessage });
            }
        }.bind(this));

        PublicSubscriber.subscribe("clear-errors", function(topic){
            this.setState({ errorMsg: '' });
        }.bind(this));
    }
}





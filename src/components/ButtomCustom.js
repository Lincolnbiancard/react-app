import React, { Component } from 'react';

class ButtomCustom extends Component{
    render() {
        return(
            <div className="pure-control-group">                                  
                <label></label> 
                <button type={this.props.type} className="pure-button pure-button-primary">{this.props.label}</button>                                    
            </div>
        );
    }
}

export default ButtomCustom;
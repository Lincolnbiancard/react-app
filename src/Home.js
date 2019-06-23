import React, { Component } from 'react';


export default class Home extends Component{
    render(){
        return(
            <div>
                <div className="header">
                    <h1>Bem-vindo(a) ao sistema de biblioteca online!</h1>
                </div>

                <div className="content" id="content">
                </div>
            </div>
            
        );
    }
}
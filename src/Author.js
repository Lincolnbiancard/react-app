import React, { Component } from 'react';
import $ from 'jquery';
import InputCustom from './components/InputCustom';
import ButtomCustom from './components/ButtomCustom';
import PublicSubscriber from 'pubsub-js';
import MyHandleBugs from './MyHandleBugs';

class FormAuthor extends Component {
   
    constructor() {
        super();
        this.state = {nome:'', email:'', senha:''};
        this.enviaForm = this.enviaForm.bind(this);
        this.setNome = this.setNome.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setSenha = this.setSenha.bind(this);
      }

      // Enviar form para lista de autores
  enviaForm(event) {
    event.preventDefault();

    $.ajax({
      url: 'http://cdc-react.herokuapp.com/api/autores',
      contentType: 'application/json',
      dataType: 'json',
      type: 'post',
      data: JSON.stringify({nome:this.state.nome, email:this.state.email, senha:this.state.senha}),
      success:function(newListPublic){
        //Disparar um aviso geral 
        PublicSubscriber.publish('newListPublic', newListPublic);
        this.setState({ nome:'', email:'', senha:'' }); //limpar campos
      }.bind(this),
      error(response){
        if(response.status === 400){
          new MyHandleBugs().publicErrors(response.responseJSON);
        }
      },
      beforeSend: function(){
        PublicSubscriber.publish("clear-errors", {});
      }
    });
  }

  setNome(event){
    this.setState({nome:event.target.value});
  }

  setEmail(event){
    this.setState({email:event.target.value});
  }

  setSenha(event){
    this.setState({senha:event.target.value});
  }

  render(){
      return(
        <div className="pure-form pure-form-aligned">
            <div className="header">
              <h1>Cadastro de Autores</h1>
            </div>

            <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
              <InputCustom id="nome" type="text" name="nome" value={this.state.nome}  onChange={this.setNome} label="Nome"/>
              <InputCustom id="email" type="email" name="email" value={this.state.email}  onChange={this.setEmail} label="Email"/>
              <InputCustom id="senha" type="password" name="senha" value={this.state.senha}  onChange={this.setSenha} label="Senha"/>
              <ButtomCustom type="submit" label="Gravar"/> 
            </form>
        </div>
      );
  }
    
}


class TableAuthor extends Component {

    render(){
        return(
            <div>            
            <table className="pure-table">
            <thead>
                <tr>
                <th>Nome</th>
                <th>email</th>
                </tr>
            </thead>
            <tbody>
                {this.props.lista.map(function(autor) {
                return (
                    <tr key={autor.id}>
                    <td>{autor.nome}</td>                
                    <td>{autor.email}</td>                
                    </tr>
                );
                })}
            </tbody>
            </table> 
        </div>            
        );
    }

}

export default class AuthorBox extends Component {

    constructor() {
        super();
        this.state = {lista: []};
    }

    // Carregar a lista de autores
    componentDidMount(){
        $.ajax({
        url: 'http://cdc-react.herokuapp.com/api/autores',
        dataType: 'json',
        success:function(response){
            this.setState({lista:response});
        }.bind(this)
        });

        //Escutar newListPublic para pegar atualização da lista 
        PublicSubscriber.subscribe('newListPublic', function(topic, newList){
            this.setState({ lista: newList });
        }.bind(this));
    };

    render(){
        return(
            <div>
                <FormAuthor />
                <TableAuthor lista={this.state.lista}/>
            </div>
        );
    }
}


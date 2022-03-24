import React ,{ Component }  from "react";
import "./StartScreen.css";
import SuperMarioReact from '../..';

export default class StartScreen extends React.Component {
   constructor(props) {
    super(props);
    this.state = {value: ''};
    this.state={isGmeOver:false};
    this.state = {salle: '0'};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});

  }
   handleChange2(event) {
       this.setState({salle: event.target.value});


  }
 handleSubmit(event) {
    event.preventDefault();
    this.setState({isGameStarted:true});

  }
    render() {

        if(!this.state.isGameStarted) 
        {
                      return (
        <div id="startScreen">
           <form onSubmit={this.handleSubmit}>
                <label>Nom :
                   <input type="text" value={this.state.value} onChange={this.handleChange }/>
                </label><br/>
              <label>
          Choisissez votre Salle de Destination:
          <select value={this.state.salle} onChange={this.handleChange2}>
            <option value="0">RDC</option>
            <option value="1">1 ére étage</option>
            <option value="2">2 éme étage</option>
          </select>
          classment des joueurs
        </label>
   
                <input type="submit" value="Start" name="start" />
            </form>
        </div>
    );
        }
        else {
    return <SuperMarioReact />


        }
 
   
    }
}

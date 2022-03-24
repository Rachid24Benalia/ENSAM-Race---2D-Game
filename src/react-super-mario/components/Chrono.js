import React from 'react';
import './chrono.css';

export default class Chrono extends React.PureComponent{
 
    render() {
               const { temps} = this.props;
            return (
    <div className="Chrono">
      <h1>Hello, world!</h1>
      <h1>It is {temps} s.</h1>
    </div>
    );
    }
 
  

}

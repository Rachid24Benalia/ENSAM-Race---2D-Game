// @flow
import React from 'react';
import variables from '../../util/variables';
import './Background.css';
import scene2 from '../../assets/backgrounds/rdc.jpg';

type Props = {
  position: number
}

export default class Background extends React.PureComponent<Props> {
  render() {
    const { position ,scene} = this.props
    console.log(scene);
    if(scene==1) {
                   return (
      <div 
        className="Background scene1" 
        style={{
          backgroundPosition: `
    
            left ${-((position * (variables.backWidth / 1000)))}px bottom 0px
          `
        }}
      />
    )
    }
    else {
      let image=scene2;
              return (
      <div 
        className="Background scene2" 
        style={{
          backgroundPosition: `
    
            left ${-((position * (variables.backWidth / 1000)))}px bottom 0px
          `,
        backgroundImage: `url(${scene2})`,
  
        }}
      />
    )
    }
 
 
    

                
    

    
    
  }
}
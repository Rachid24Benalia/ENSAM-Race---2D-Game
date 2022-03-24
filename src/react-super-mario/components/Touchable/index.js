// @flow
import * as React from 'react'
import variables from '../../util/variables'
import './Touchable.css'



export default class Touchable extends React.PureComponent<Props, {}> {
  state = {}
  static getDerivedStateFromProps(nextProps:Props) {
     const { onTouch, active, scenarioPosition,positionX,obstacleX,gagner } = nextProps
  const diffY = nextProps.playerPositionY - nextProps.positionY

    if(!active) {
      console.log(nextProps.obstacleX);
      if(nextProps.obstacleX==positionX ) {
        if(Math.abs(diffY) <= 30) {
                    onTouch();
        }
       
        
       }
    }
  }

  
  render() {
    const { children, scenarioPosition, positionX, positionY } = this.props
    return (
       
      <div 
        className="Touchable"
        style={{ 
          left: `${positionX -scenarioPosition}px`, 
          bottom: `${positionY}px` }
        }
      >
        {children}
      </div>
    )
  }
}
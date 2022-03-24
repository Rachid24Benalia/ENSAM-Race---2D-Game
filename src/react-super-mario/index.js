// @flow
import React from 'react'
import toastr from 'toastr'
import Background from './components/Background'
import Mario from './components/Player'
import Touchable from './components/Touchable'
import ButtonInfo from './components/Buttons/info'
import allowedKeys from './util/allowedKeys'
import variables from './util/variables'
import introMusic from './assets/audio/mpi.wav'
import music from './assets/audio/mp.wav'
import jumpAudio from './assets/audio/smw_jump.wav'
import infoAudio from './assets/audio/smw_message_block.wav'
import './ReactSuperMario.css'
import InfoBox from './components/Infobox'
import swal from 'sweetalert';
import Chrono from './components/Chrono'
 type Props = {}

type State = {
  width?: number,
  positionX: number,
  positionY: number,
  scenarioPosition: number,
  direction: 'ltr' | 'rtl',
  isMoving: boolean,
  isJumping: boolean,
  isFalling: boolean,
  displayInfo: boolean,
  userIsTouching: boolean,
  userTouchingX: number,
  userTouchingY: number,
  tentative: number,
  isGameOver: boolean,
  scene:number,
  temps:number,

} 

export default class ReactSuperMario extends React.Component {
  state = {
    width: 0,
    positionX: 0,
    positionY: 0,
    scenarioPosition: 0,
    direction: 'ltr',
    isMoving: false,
    isJumping: false,
    isFalling: false,
    displayInfo: false,
    userIsTouching: false,
    userTouchingX: 0,
    userTouchingY: 0,
    isGameOver: false,
    tentative: 0,
    obstacleX:0,
    scene:1,
    temps:30,
  }

  componentDidMount() {
    window.addEventListener('keydown', this.keyDown)
    window.addEventListener('keyup', this.keyUp)
    //ici on fait appel a lafonction gameCoreRun chaque 80s
    this._gameCoreRunTimeout = setInterval(this.gameCoreRun, 80)
    
    //toastr est une librarie javascript qui permet l'affichage de notifications toastr.< function type>(<string message>, <string titre (facultatif)>, <object options (facultatif)>
    // l'option  timeOut : numérique, spécifie le temps durant lequel la pop-up reste ouverte
    toastr.success('Move with arrow LEFT/RIGHT <br/>Run with A or S <br/>Jump with Z', 'Instructions', { timeOut: 5000 })
  }
 

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyDown)
    window.removeEventListener('keyup', this.keyUp)
    clearInterval(this._gameCoreRunTimeout)
  }
 //The HTMLAudioElement interface provides access to the properties of <audio> elements, as well as methods to manipulate them.
  _gameCoreRunTimeout: IntervalID;
  _activeKeys: typeof allowedKeys = allowedKeys;
  _gameContainerRef: ?HTMLDivElement;
  _audioRef: ?HTMLAudioElement;
  _audioSfxRef: ?HTMLAudioElement;

  restart() {
    clearInterval(this._gameCoreRunTimeout)
    this._gameCoreRunTimeout = setInterval(this.gameCoreRun, 80)
  }

  gameCoreRun = () => {
    const { direction, positionX, positionY, width, scenarioPosition, isJumping, isFalling ,scene,obstacleX,temps } = this.state;
    const { _activeKeys } = this;

    /*partie du chrono*/
          console.log(temps);
          if(temps>0) {
          this.setState({ temps : Math.floor(temps-0.01)});

          }





    //step:20 pour accelerer la vtesse sinon 10
    const step = _activeKeys.a || _activeKeys.s ?  30 : 10;
    const jumpLimit = 200;
    let nbr_steps=0;
    // Movement
      if (_activeKeys.ArrowRight ? !_activeKeys.ArrowLeft : _activeKeys.ArrowLeft) {
      this.setState({ isMoving: true });
      if (direction === 'ltr' && _activeKeys.ArrowLeft) {
        this.setState({ direction: 'rtl' });
      } else if (direction === 'rtl' && _activeKeys.ArrowRight) {
        this.setState({ direction: 'ltr' });
      }
       console.log(positionY);
        
      if (_activeKeys.ArrowRight && width && positionX > (width * 40 / 100) ) {
               //au debut le joueur ne se deplacent pas ,il ne commence a se deplacer que lorsque la background s'arrete
               //CONDITION POUR ARRETER LE DEPLACEMENT DE BACKGROUND
                if(scenarioPosition>=2100 && scene==1) {
                  //afin d'arreter le deplacement d el'image
                this.setState({ scenarioPosition:2100 });
                this.setState({ positionX: positionX + step });
                 //une condition pur savoir le positionnement du joueur lorsqu'il arrive à la fin dans le premier stage
                   if(positionX>1550 && scene==1) {
                     //s'il arrive à la fin on le retourne vers le debut
                     //ici on effectue les changements relatives à la deuxieme scene
                    this.setState({ positionX:0});
                  this.setState({ scenarioPosition: 0});
                  this.setState({ scene:2});
                swal("Good job!", "Vous etes à l'ensam!", "success");
                toastr.success('you passed the first stage,now you are in ensam', 'Congratualtions', { timeOut: 5000 })
                   }
                } 
                else {
                      this.setState({ scenarioPosition: scenarioPosition + step });
                }  
        this.setState({ obstacleX: obstacleX + step });
      } 
      
      else if (_activeKeys.ArrowLeft && positionX <= step && scenarioPosition > 0) {
                console.log("2");
        this.setState({ scenarioPosition: scenarioPosition - step });
      } else if (_activeKeys.ArrowRight && width && positionX < (width - variables.marioWidth - step) ) {
                console.log("3");
        this.setState({ positionX: positionX + step });
                this.setState({ obstacleX: obstacleX + step });

      } else if (_activeKeys.ArrowLeft && positionX > 0) {
                console.log("4");

        this.setState({ positionX: positionX - step });
      }
    } else {
      this.setState({ isMoving: false });
    }

    // Jump
    if (_activeKeys.z && !isFalling) {
      this.setState({ isJumping: true })
      if (positionY < jumpLimit) {
        this.setState({ positionY: positionY + 100 })
      } else {
        this.setState({ isFalling: true })
      }
    } else {
      if (positionY > 0) {
        const nextPositionY = positionY - (_activeKeys.z ? 30 : 40)
        this.setState({ isFalling: true, positionY: nextPositionY >= 0 ? nextPositionY : 0 })
      } else {
        this.setState({ isJumping: false, isFalling: _activeKeys.z })
      }
    }
  }



  handleGameInfo = () => {
     // clearInterval(this._gameCoreRunTimeout)
      const {tentative} = this.state
     if(tentative>=2) {
     swal("Sorry!", "Try Again!", "warning");
     window.location.reload();
      }
      else {
          this.setState({ tentative:tentative+1})
          this.setState({ displayInfo: true, isFalling: true,positionY:20})
      }   
  }
  
  gagner= () => {
     // clearInterval(this._gameCoreRunTimeout)
      alert("hee"); 
  }

  getRef = (ref: ?HTMLDivElement) => {
    if (ref) {
      this._gameContainerRef = ref;
      this.setState({ width: ref.clientWidth })
    }
  }

  getAudioRef = (ref: ?HTMLAudioElement) => {
    if (ref) {
      this._audioRef = ref
      const tryRetry = () => new Promise((resolve, reject) => {
        const playPromise = ref.play()
        if (playPromise) {
          playPromise
            .then(() => {
              deregister()
              resolve()
            })
            .catch(reject)
        } else {
          deregister()
          resolve()
        }
      })

      const register = () => {
        window.addEventListener('focus', tryRetry)
        window.addEventListener('click', tryRetry)
        window.addEventListener('keypress', tryRetry)
        window.addEventListener('load', tryRetry)
      }
      const deregister = () => {
        window.removeEventListener('focus', tryRetry)
        window.removeEventListener('click', tryRetry)
        window.removeEventListener('keypress', tryRetry)
        window.removeEventListener('load', tryRetry)
      }
      tryRetry().catch(register)

      ref.onended = () => {
        ref.src = music
        ref.loop = true
        ref.play()
        ref.onended = () => {}
      }
    }
  }

  getSfxAudioRef = (ref: ?HTMLAudioElement) => {
    if (ref) {
      this._audioSfxRef = ref;
    }
  }

  keyDown = (event: KeyboardEvent) => {
    const { _activeKeys, state: { displayInfo } } = this
    if (_activeKeys[event.key] === false ) {
      _activeKeys[event.key] = true
      if (displayInfo) {
        this.setState({ displayInfo: false })
        this.restart()
      }
    }
  }

  keyUp = (event: KeyboardEvent) => {
    const { _activeKeys } = this;
    if (_activeKeys[event.key] === true ) {
      _activeKeys[event.key] = false;
    }
  }
  
  render() {
       let positions=[500,900,1300,1720,1950,2530]

    const {
      positionX,
      positionY,
      direction,
      isMoving,
      isJumping,
      scenarioPosition,
      displayInfo,
      scene,
      obstacleX,
      temps,
    } = this.state
return (
      <div className="ReactSuperMario" ref={this.getRef}>
              <Chrono temps={temps} />
              <Background position={scenarioPosition} scene={scene}/>
              <Mario
                positionX={positionX}
                positionY={positionY}
                direction={direction}
                isMoving={isMoving}
                isJumping={isJumping}
              />
      {/*    <audio src={introMusic} ref={this.getAudioRef} />
              <audio ref={this.getSfxAudioRef} /> */}
                {positions.map(position => (
                <Touchable
                onTouch={this.handleGameInfo}
                active={displayInfo}
                scenarioPosition={scenarioPosition}
                //poitionx la position de l'obstacle
                positionX={position}
                positionY={20}
                obstacleX={obstacleX}
                //la position de player
                playerPositionX={positionX}
                playerPositionY={positionY}
                gagner={this.gagner}
              >
                <ButtonInfo />
              </Touchable>
              
            ))}   
                  {displayInfo && (
                <InfoBox>
                  <h2>Rattrapage !</h2>
        
                </InfoBox>
              )}  
      </div>
    )
    
  

  }
}

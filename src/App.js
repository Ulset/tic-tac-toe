import logo from './logo.svg';
import './App.css';
import Toe from './Toe';
import React from 'react'

class App extends React.Component {
  constructor(){
    super();
    let startToe = []
    for(let i=0;i<3*3;i++){
      startToe.push(
        {id: i, clicked: false, clickedBy: ""}
      )
    }
    this.playerColors = [
      this.generateRandomColor(),
      this.generateRandomColor()
    ]
    this.state = {
      toes: startToe,
      players: [],
      currentPlayer: null,
      winner: null
    }
  }

  handleClick = (id) => {
    let newToes = this.state.toes
    for(let el of newToes){
      if(el.id == id){
        el.clicked = true
        el.clickedBy = this.state.currentPlayer
      }
    }
    let playerIndex = this.state.players.indexOf(this.state.currentPlayer)
    let newPlayerIndex = playerIndex>= this.state.players.length-1 ? 0 : playerIndex+1
    this.setState({
      toes:newToes,
      currentPlayer: this.state.players[newPlayerIndex]
    })
    this.findWinner();
  }

  generateRandomColor = () => {
    let pos = "12334567890ABCDEF"
    let output = "#"
    for(let i=0;i<6;i++){
      let randomIndex = Math.floor(Math.random()*pos.length)
      output += pos[randomIndex]
    }
    return output
  }

  setPlayers = () => {
    let player1 = document.getElementById("player1input").value
    let player2 = document.getElementById("player2input").value
    let playersInput = [player1, player2]
    this.setState({
      players: playersInput,
      currentPlayer: playersInput[Math.floor(Math.random()*playersInput.length)]
    })
  }

  findWinner = ()=>{
    /* Brettet
    1, 2, 3
    4, 5, 6
    7, 8, 9
    */
    let winnerPaths = [
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 5, 9],
      [3, 5, 7]
    ]
    let toeNow = this.state.toes
    for(let path of winnerPaths){
      let person = toeNow[path[0]-1].clickedBy
      if(person == ""){
        continue
      }
      let pathOwned = true
      for(let step of path){
        if(toeNow[step-1].clickedBy != person){
          pathOwned = false
        }
      }
      if(pathOwned){
        this.setState({
          winner: person
        })
      }
    }
  }

  render = () => {
    if(this.state.winner){
      return (
        <div className="winnerScreen">
          <h1>{this.state.winner} vant!</h1>
        </div>
      )
    }

    let output = []
    for(let i =0;i<this.state.toes.length;i++){
      let el = this.state.toes[i]
      output.push(<Toe clicked={el.clicked} clickHandler={()=>{this.handleClick(el.id)}} color={this.playerColors[this.state.players.indexOf(el.clickedBy)]}/>)
    }
    return (
      <div className="App">
        <div className="board" style={{display: this.state.players.length>0 ? "" : "none"}}>
          {output}
        </div>
        <br></br>
        <div className="textContainer">
          <div style={{display: this.state.players.length>1 ? "none" : "block"}}>
            Spiller 1: <input type="text" id="player1input"></input>
            <br></br>
            Spiller 2: <input type="text" id="player2input"></input>
            <br></br>
            <button onClick={this.setPlayers}>Spill!</button>
          </div>
          <div style={{display: this.state.players.length>1 ? "block" : "none"}}>
            <p>{this.state.currentPlayer} sin tur!</p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

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
    this.state = {
      toes: startToe
    }
  }

  handleClick = (id) => {
    let newToes = this.state.toes
    for(let el of newToes){
      if(el.id == id){
        el.clicked = true
      }
    }
    this.setState({toes:newToes})
  }

  render = () => {
    let output = []
    for(let i =0;i<this.state.toes.length;i++){
      let el = this.state.toes[i]
      output.push(<Toe clicked={el.clicked} clickHandler={()=>{this.handleClick(el.id)}}/>)
    }
    return (
      <div className="App">
        <div className="board">
          {output}
        </div>
        <div className="textContainer">
          <p>Player </p>
        </div>
      </div>
    );
  }
}

export default App;

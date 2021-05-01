import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      isX: true,
    };
  }

  handleClick(i) {
    let newSquares = this.state.squares;
    if (calculateWinner(newSquares) || newSquares[i]){
        return
    }
    newSquares[i] = this.state.isX ? "X" : "O";

    this.setState({ squares: newSquares, isX: !this.state.isX });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
      let winner = calculateWinner(this.state.squares);
      let status;
      if(winner){
          status = 'Winner: '+ winner;
      } else{
          status = "Next turn: " + (this.state.isX ? "X" : "O");
      }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/*win-status*/}</div>
          <ol>{/*history*/}</ol>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(sq){
    let arraylist = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    for (let i = 0; i < arraylist.length; i++) {
        let [a,b,c] = arraylist[i];
        if (sq[a] === sq[b] && sq[a] === sq[c]){
            return sq[a];
        }
    }
    return null
}

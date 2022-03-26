import {BOARD_SIZE} from "../../redux/features/tic-tac-toe/tictactoe.slice";
import {BoardElement} from "./board-element/BoardElement";
import "./board.css"

export const Board = () => {
    return (
        <div className={"board"}>
            {createBoard(BOARD_SIZE, BOARD_SIZE)}
        </div>
    )
}

const createBoard = (height: number, width: number) => {
    let output = []
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            output.push(<BoardElement coordinate={[i, j]} key={`${i},${j}`}/>)
        }
    }
    return output;
}
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";

export const BOARD_SIZE = 3

export const enum BoardStatus {
    WHITE_WON, RED_WON, DRAW, CONTINUE
}

export const enum Player {
    RED = -1,
    WHITE = 1
}

const createEmptyBoard = () => {
    let output: number[][] = []
    for (let i = 0; i < BOARD_SIZE; i++) {
        output.push([])
        for (let j = 0; j < BOARD_SIZE; j++) {
            output[i].push(0)
        }
    }
    return output
}


export interface TicTacToeStatus {
    boardStatus: BoardStatus
    board: number[][],
    currentPlayer: Player,
    winner: Player | undefined
}


export const initialState: TicTacToeStatus = {
    boardStatus: BoardStatus.CONTINUE,
    board: createEmptyBoard(),
    currentPlayer: Player.WHITE,
    winner: undefined
}

export interface MovePayload {
    position: number[]

}

export const determineWinner = (board: number[][]) => {
    let result_row = 0
    let result_column = 0
    let result_diagonal_one = 0
    let result_diagonal_two = 0
    for (let i = 0; i < BOARD_SIZE; i++) {
        result_diagonal_one += board[i][i]
        result_diagonal_two += board[BOARD_SIZE - (i + 1)][i]
        for (let j = 0; j < BOARD_SIZE; j++) {
            result_row += board[i][j]
            result_column += board[j][i]
        }
        if (Math.max(Math.abs(result_row), Math.abs(result_diagonal_two), Math.abs(result_diagonal_one), Math.abs(result_column)) === BOARD_SIZE) {
            if (result_row === BOARD_SIZE || result_column === BOARD_SIZE || result_diagonal_two == BOARD_SIZE || result_diagonal_one == BOARD_SIZE) {
                return BoardStatus.WHITE_WON
            }
            return BoardStatus.RED_WON
        }
        result_row = 0
        result_column = 0
    }
    return BoardStatus.CONTINUE
}

export const isDraw = (board: number[][]) => {
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            if (board[i][j] === 0) return false
        }
    }
    return true
}



export const ticTacToeSlice = createSlice({
    name: "tictactoe", initialState, reducers: {
        clear: (state) => {
            state.boardStatus = BoardStatus.CONTINUE
            state.board = createEmptyBoard()
        }, move: (state, {payload}: PayloadAction<MovePayload>) => {
            if (state.boardStatus !== BoardStatus.CONTINUE) {
                throw new Error("Game is Over!!")
            }
            let pos = payload.position
            if (state.board[pos[0]][pos[1]] !== 0) {
                console.log(state.board[pos[0]][pos[1]])
                throw new Error("Position is already occupied")
            }
            state.board[pos[0]][pos[1]] = state.currentPlayer === Player.RED ? Player.RED : Player.WHITE
            state.boardStatus = determineWinner(state.board)
            if (state.boardStatus !== BoardStatus.CONTINUE) {
                state.winner = state.currentPlayer
            }
            state.currentPlayer = state.currentPlayer === Player.WHITE ? Player.RED : Player.WHITE

            if (isDraw(state.board) && state.boardStatus === BoardStatus.CONTINUE) {
                state.boardStatus = BoardStatus.DRAW
            }
        }
    }
})

export const {clear, move} = ticTacToeSlice.actions
export const selectWinner = (state: RootState) => state.ticTacToe.winner
export const selectBoard = (state: RootState) => state.ticTacToe.board
export const selectBoardStatus = (state: RootState) => state.ticTacToe.boardStatus
export const selectCurrentPlayer = (state: RootState) => state.ticTacToe.currentPlayer
export default ticTacToeSlice.reducer

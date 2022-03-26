import {BOARD_SIZE, BoardStatus, determineWinner, Player} from "../tictactoe.slice";


export const makeCopy = (board: number[][]) => {
    let output: number[][] = []
    for (let i = 0; i < BOARD_SIZE; i++) {
        let row: number[] = []
        for (let j = 0; j < BOARD_SIZE; j++) {
            row.push(board[i][j])
        }
        output.push(row)
    }
    return output
}


export interface MinMaxResult {
    evaluation: number
    bestMove: number[]
}

export const minmax = (player: Player, board: number[][], depth: number, wishedDepth = 10): MinMaxResult => {
    let optimalMove: number[] = []
    if (depth === 0 || !isFieldAvailable(board) || determineWinner(board) !== BoardStatus.CONTINUE) {
        return {
            evaluation: evaluate(player, board),
            bestMove: optimalMove
        }
    }
    let maxValue = Number.MIN_SAFE_INTEGER
    let possibleMoves = findPossibleMoves(board)

    while (possibleMoves.length !== 0) {
        //make move
        let move = possibleMoves.pop()!
        board[move[0]][move[1]] = player
        let otherPlayer = player === Player.WHITE ? Player.RED : Player.WHITE
        let value = -1 * minmax(otherPlayer, board, depth - 1).evaluation
        //unmake move
        board[move[0]][move[1]] = 0
        if (value > maxValue) {
            maxValue = value

            if (depth === wishedDepth) {
                optimalMove = move
            }
        }
    }
    return {
        evaluation: maxValue,
        bestMove: optimalMove
    }
}

const findPossibleMoves = (board: number[][]): number[][] => {
    let output = []
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            if (board[i][j] === 0) {
                let coordinate = [i, j]
                output.push(coordinate)
            }
        }
    }
    return output
}

const isFieldAvailable = (board: number[][]): boolean => {
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            if (board[i][j] === 0) return true
        }
    }
    return false
}

const evaluate = (player: Player, board: number[][]): number => {
    let possWinner = determineWinner(board)
    if (possWinner === BoardStatus.CONTINUE) return 0

    if (possWinner === BoardStatus.RED_WON) {
        if (player === Player.RED) return 10
        return -10
    }
    if (player === Player.WHITE) return 10
    return -10

}

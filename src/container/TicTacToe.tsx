import {Board} from "../components/board/Board";
import {Result} from "../components/result/Result";
import {
    BoardStatus,
    move, MovePayload,
    Player,
    selectBoard, selectBoardStatus,
    selectCurrentPlayer,
    selectWinner
} from "../redux/features/tic-tac-toe/tictactoe.slice";
import {useAppDispatch, useAppSelector} from "../redux/app/hooks";
import {makeCopy, minmax} from "../redux/features/tic-tac-toe/service/minmax";
import {AppDispatch} from "../redux/app/store";


export const TicTacToe = () => {
    const COMPUTER_IS_ON = true

    let dispatch = useAppDispatch()
    let winner = useAppSelector(selectWinner)
    let currentPlayer = useAppSelector(selectCurrentPlayer)
    let board = useAppSelector(selectBoard)
    let status = useAppSelector(selectBoardStatus)

    let output = ""
    if (winner === Player.RED) {
        output = "Red"
    } else if (winner === Player.WHITE) {
        output = "White"
    } else if (status === BoardStatus.DRAW) {
        output = "Draw"
    }



    let minMaxResult = minmax(currentPlayer, makeCopy(board), 10)
    console.log(minMaxResult)
    if (COMPUTER_IS_ON && currentPlayer === Player.RED && status === BoardStatus.CONTINUE) {
        makeMove(dispatch, minMaxResult.bestMove).then()
    }
    let factor = currentPlayer === Player.WHITE ? 1 : -1
    return (
        <div>
            {output && <Result winner={output} />}
            <h2>{`The evaluation is ${factor * minMaxResult.evaluation}`}</h2>
            <Board/>
        </div>


    )
}


const makeMove = async (dispatch: AppDispatch, bestMove: number[]) => {
    await timeOut()
    let payload: MovePayload = {
        position: bestMove
    }
    console.log(bestMove)
    dispatch(move(payload))
}



const timeOut = () => {
    return new Promise(resolve => setTimeout(resolve, 200));
}
import "./board-element.css"
import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../redux/app/hooks";
import {AppDispatch} from "../../../redux/app/store";
import {move, MovePayload, selectBoard} from "../../../redux/features/tic-tac-toe/tictactoe.slice";


interface BoardElementProps {
    coordinate: number[]
}


export const BoardElement = ({coordinate}: BoardElementProps) => {
    const dispatch = useAppDispatch()
    const [color, setColor] = useState("")

    let possibleNewColor = determineColor(useAppSelector(selectBoard), coordinate)

    if (possibleNewColor !== color) {
        setColor(possibleNewColor)
    }

    return (
        <div className={`board-element ${color}`} onClick={
            (e) => handleClick(e, color, dispatch, coordinate)}/>
    )
}

const determineColor = (board: number[][], coordinate: number[]) => {
    if (board[coordinate[0]][coordinate[1]] === 0) return "";
    return board[coordinate[0]][coordinate[1]] === 1 ? "white" : "red"
}

const handleClick = (e: React.MouseEvent<HTMLDivElement>,color:string, dispatch: AppDispatch, coordinate: number[]) => {
    e.preventDefault()
    if (color !== "") return

    let payload: MovePayload = {
        position: coordinate
    }
    dispatch(move(payload))



}
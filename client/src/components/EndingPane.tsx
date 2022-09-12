import React, {useContext, useState} from "react";
import {GameContext} from "../context";
import {CANVA_WIDTH} from "../constants";
import {GameId, Player, PlayerColor} from "../domain/types";
import {makeEmptyGrid} from "../domain/grid";
import {useNavigate} from "react-router-dom";
import Button from "./Button";

interface EndingPaneProps {
    gameDraw: boolean
}

const EndingPane = ({gameDraw}: EndingPaneProps) => {
    const navigate = useNavigate();
    const { context, setContext } = useContext(GameContext);

    /**
     * Réinitialisation des données de jeu puis redirection accueil
     */
    const backHome = () => {
        setContext({
            gameId: '' as GameId,
            players: [] as Player[],
            currentPlayer: {} as Player,
            grid: makeEmptyGrid(6)(7)
        });
        navigate('/', { replace: true });
    }

    return (
        <div className="float-left bg-amber-50 bg-opacity-90 absolute text-center" style={{ height: "480px", width: "640px", borderRadius: 10}}>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold">
                La partie est terminée {gameDraw ? "en égalité" : (context.currentPlayer.playerColor == PlayerColor.RED) ? "et le joueur Jaune a gagné" : "et le joueur Rouge a gagné"}
                <br/>
                <Button label={"Retour à l'accueil"} onClick={backHome}/>
            </div>
        </div>
    )
}

export default EndingPane;
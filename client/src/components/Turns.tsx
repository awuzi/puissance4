import React, {useContext, useState} from "react";
import {GameContext} from "../context";
import {CANVA_WIDTH} from "../constants";

interface TurnsProps {
    nbTour: number;
}

const Turns = ({nbTour}: TurnsProps) => {
    const {context, setContext} = useContext(GameContext);
    const [copyButtonText, setCopyButtonText] = useState('Copier le code d\'invitation');

    /**
     * Copie le code d'invitation dans le presse papier
     */
    const copyInviteCode = () => {
        const code = document.URL.split("/")[4];
        navigator.clipboard.writeText(code).then(r =>
            setCopyButtonText('Copié !')
        );
        setTimeout(() => {
            setCopyButtonText('Copier le code d\'invitation');
        }, 2000);
    }

    return (
        <div className={`flex relative p-4 mb-4 text-sm text-black rounded-lg bgColor-${context.currentPlayer.playerColor}`} style={{width: CANVA_WIDTH}} role="alert">
            <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
            </svg>
            <span className="sr-only">Info</span>
            <div>
                {context.players.length == 1 ?
                    <div>
                        En attente du second joueur...
                        <button onClick={copyInviteCode} className="absolute right-3 text-white bg-blue-700 hover:bg-blue-800 rounded-lg p-2 top-2">
                            {copyButtonText}
                        </button>
                    </div>
                    :
                    <>
                        <span className="font-bold">Tour {nbTour} :</span> {(context.currentPlayer?.playerColor == localStorage.getItem('playerColor')) ? "C'est à votre tour 😉" : "Tour de l'adversaire 🤜"}
                    </>
                }
            </div>
        </div>
    )
}

export default Turns;
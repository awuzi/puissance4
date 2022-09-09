import { GameState, PlayerColor } from "../../domain/types";
import { generateGameId, generatePlayerId } from "./uuid";

export const createState = (ctx: GameState): GameState => {
  const gameId = generateGameId();
  const currentPlayer = { id: generatePlayerId(), playerColor: PlayerColor.RED };
  localStorage.setItem('playerId', currentPlayer.id);
  localStorage.setItem('playerColor', currentPlayer.playerColor);
  return {
    ...ctx,
    gameId,
    currentPlayer,
    players: [currentPlayer]
  };
}

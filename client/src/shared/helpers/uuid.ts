import { v4 } from "uuid";
import { GameId, PlayerId } from "../../domain/types";


export const generateGameId = (): GameId => v4() as GameId;

export const generatePlayerId = (): PlayerId => v4() as PlayerId;


// Constantes du jeu

// Careful, may break the game

import {createCanvaGrid} from "./shared/helpers/grid";

export const GAME_SPEED = 3;
export const RED_COLOR = '#c82124';
export const YELLOW_COLOR = '#FFFF00';

export const CANVA_WIDTH = 640;
export const CANVA_HEIGHT = 480;

export const GRID_PIXEL_SPACING = 90;
export const GRID_COLS = 7;
export const CANVA_GRID = createCanvaGrid(GRID_PIXEL_SPACING, GRID_COLS);

export const TOKEN_OFFSET_X = 50;
export const TOKEN_OFFSET_Y = 40;
export const TOKEN_DISTANCE_X = 90;
export const TOKEN_DISTANCE_Y = 80;

export const TOKEN_RADIUS = 36;

export const CLEAR_RECT_X = 36;
export const CLEAR_RECT_Y = 39;
export const CLEAR_RECT_WIDTH = 72;
export const CLEAR_RECT_HEIGHT = 35;

export const WINNING_LINE_WIDTH = 5;
export const WINNING_LINE_COLOR = "#3ff100";

export const DIRECTIONS = [
  [1, 0],
  [0, 1],
  [1, 1],
  [1, -1]
];

export const ORIENTATION = [1, -1];


export const NB_OF_MATCHING_COLOR = 4;

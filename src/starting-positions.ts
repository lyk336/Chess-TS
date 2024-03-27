import { ISquareCoordinates } from './boardIndexes';
import { PieceTypes } from './ChessPiece';

export interface IStartPiece {
  name: string;
  startingSquare: Array<ISquareCoordinates>;
}

export const pieces: Array<IStartPiece> = [
  {
    name: PieceTypes.king,
    startingSquare: [{ x: 'e', y: 1 }],
  },
  {
    name: PieceTypes.queen,
    startingSquare: [{ x: 'd', y: 1 }],
  },
  {
    name: PieceTypes.bishop,
    startingSquare: [
      { x: 'c', y: 1 },
      { x: 'f', y: 1 },
    ],
  },
  {
    name: PieceTypes.knight,
    startingSquare: [
      { x: 'b', y: 1 },
      { x: 'g', y: 1 },
    ],
  },
  {
    name: PieceTypes.rook,
    startingSquare: [
      { x: 'a', y: 1 },
      { x: 'h', y: 1 },
    ],
  },
  {
    name: PieceTypes.pawn,
    startingSquare: [
      { x: 'a', y: 2 },
      { x: 'b', y: 2 },
      { x: 'c', y: 2 },
      { x: 'd', y: 2 },
      { x: 'e', y: 2 },
      { x: 'f', y: 2 },
      { x: 'g', y: 2 },
      { x: 'h', y: 2 },
    ],
  },
];

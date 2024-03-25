import { ISquareCoordinates } from './boardIndexes';
import { PieceTypes } from './ChessPiece';

export interface IPieceType {
  name: string;
  startingSquare: {
    white: Array<ISquareCoordinates>;
    black: Array<ISquareCoordinates>;
  };
}

export const pieces: Array<IPieceType> = [
  {
    name: PieceTypes.king,
    startingSquare: {
      white: [{ x: 'e', y: 1 }],
      black: [{ x: 'e', y: 8 }],
    },
  },
  {
    name: PieceTypes.queen,
    startingSquare: {
      white: [{ x: 'd', y: 1 }],
      black: [{ x: 'd', y: 8 }],
    },
  },
  {
    name: PieceTypes.bishop,
    startingSquare: {
      white: [
        { x: 'c', y: 1 },
        { x: 'f', y: 1 },
      ],
      black: [
        { x: 'c', y: 8 },
        { x: 'f', y: 8 },
      ],
    },
  },
  {
    name: PieceTypes.knight,
    startingSquare: {
      white: [
        { x: 'b', y: 1 },
        { x: 'g', y: 1 },
      ],
      black: [
        { x: 'b', y: 8 },
        { x: 'g', y: 8 },
      ],
    },
  },
  {
    name: PieceTypes.rook,
    startingSquare: {
      white: [
        { x: 'a', y: 1 },
        { x: 'h', y: 1 },
      ],
      black: [
        { x: 'a', y: 8 },
        { x: 'h', y: 8 },
      ],
    },
  },
  {
    name: PieceTypes.pawn,
    startingSquare: {
      white: [
        { x: 'a', y: 2 },
        { x: 'b', y: 2 },
        { x: 'c', y: 2 },
        { x: 'd', y: 2 },
        { x: 'e', y: 2 },
        { x: 'f', y: 2 },
        { x: 'g', y: 2 },
        { x: 'h', y: 2 },
      ],
      black: [
        { x: 'a', y: 7 },
        { x: 'b', y: 7 },
        { x: 'c', y: 7 },
        { x: 'd', y: 7 },
        { x: 'e', y: 7 },
        { x: 'f', y: 7 },
        { x: 'g', y: 7 },
        { x: 'h', y: 7 },
      ],
    },
  },
];

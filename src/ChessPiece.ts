import { ISquareCoordinates, columnIndexes, getColumnIndex, getColumnLetter } from './boardIndexes';
import { BoardColumn } from './chess-board';

export enum TeamColour {
  black = 'black',
  white = 'white',
}

export class ChessPiece {
  readonly name: string;
  readonly colour: TeamColour;
  readonly id: number;
  position: ISquareCoordinates;
  isFirstMove: boolean;
  move(board: Array<BoardColumn>, activePieceLocation: ISquareCoordinates) {}

  constructor(name: string, colour: TeamColour, id: number, position: ISquareCoordinates) {
    this.name = name;
    this.colour = colour;
    this.id = id;
    this.position = position;
    this.isFirstMove = true;
  }
}

export class Rook extends ChessPiece {
  override move(board: Array<BoardColumn>, pieceLocation: ISquareCoordinates) {
    const availableSquares: Array<ISquareCoordinates> = [];
    const canAttackSquares: Array<ISquareCoordinates> = [];

    horizontalMove(availableSquares, canAttackSquares, board, pieceLocation);
  }
}

// interface IMoveLists {
//   availableSquares: Array<ISquareCoordinates>;
//   canAttackSquares: Array<ISquareCoordinates>;
// }

enum horizontalDirections {
  left = -1,
  right = 1,
}
enum verticalDirections {
  down = -1,
  top = 1,
}
function horizontalMove(
  // { availableSquares, canAttackSquares }: IMoveLists,
  availableSquares: Array<ISquareCoordinates>,
  canAttackSquares: Array<ISquareCoordinates>,
  board: Array<BoardColumn>,
  pieceLocation: ISquareCoordinates
) {
  const startX: number = getColumnIndex(pieceLocation.x);
  const startY: number = pieceLocation.y;

  Object.keys(horizontalDirections).forEach((directionValue) => {
    if (isNaN(+directionValue)) return;
    const direction: number = +directionValue;

    for (let x: number = startX; x >= 1 || x <= 8; x += direction) {
      return;
    }
  });

  Object.keys(verticalDirections).forEach((directionValue) => {
    if (isNaN(+directionValue)) return;
    const direction: number = +directionValue;

    for (let y: number = startY; y >= 1 || y <= 8; y += direction) {
      return;
    }
  });

  // const loopThroughBoard = (
  //   directionsEnum: typeof horizontalDirections | typeof verticalDirections,
  //   startPosition: number
  // ): void => {
  //   Object.keys(directionsEnum).forEach((directionValue) => {
  //     if (isNaN(+directionValue)) return;
  //     const direction: number = +directionValue;

  //     for (let dir: number = startPosition; dir >= 1 || dir <= 8; dir += direction) {
  //       return;
  //     }
  //   });
  // };
  // loopThroughBoard(horizontalDirections, startX);
  // loopThroughBoard(verticalDirections, startY);
}

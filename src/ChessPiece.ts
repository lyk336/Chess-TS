import { ISquareCoordinates, columnLetterType, getColumnIndex, getColumnLetter, getRowIndex } from './boardIndexes';
import { BoardColumn } from './chess-board';

export enum TeamColour {
  black = 'black',
  white = 'white',
}

export class ChessPiece {
  readonly name: string;
  readonly colour: TeamColour;
  readonly id: number;
  coordinates: ISquareCoordinates;
  isFirstMove: boolean;
  move(board: Array<BoardColumn>) {
    if (!board) throw new Error('board is not exist');
  }

  constructor(name: string, colour: TeamColour, id: number, position: ISquareCoordinates) {
    this.name = name;
    this.colour = colour;
    this.id = id;
    this.coordinates = position;
    this.isFirstMove = true;
  }
}

export class Rook extends ChessPiece {
  override move(board: Array<BoardColumn>) {
    const availableSquares: Array<ISquareCoordinates> = [];
    const canAttackSquares: Array<ISquareCoordinates> = [];

    horizontalMove(availableSquares, canAttackSquares, board, this.coordinates, this.colour);
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
  pieceLocation: ISquareCoordinates,
  pieceColour: TeamColour
) {
  const startX: number = getColumnIndex(pieceLocation.x);
  const startY: number = getRowIndex(pieceLocation.y);

  Object.keys(horizontalDirections).forEach((directionValue) => {
    if (isNaN(+directionValue)) return;
    const direction: number = +directionValue;

    for (let x: number = startX; x >= 1 || x <= 8; x += direction) {
      const columnIndex: columnLetterType = getColumnLetter(x);
      const rowIndex: number = getRowIndex(startY);
      const coordinates: ISquareCoordinates = { x: columnIndex, y: rowIndex };

      // can put in separate function this code (it will duplicate a lot)
      const pieceOnSquare: ChessPiece | undefined = board[x][startY].piece;
      if (!pieceOnSquare) {
        availableSquares.push(coordinates);
      } else {
        if (pieceOnSquare.colour === pieceColour) {
          break;
        }
        canAttackSquares.push(coordinates);
      }
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

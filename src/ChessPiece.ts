import { ISquareCoordinates, columnLetterType, getColumnLetter, getCoordinates } from './boardIndexes';
import { BoardColumn } from './chess-board';

export enum TeamColour {
  black = 'black',
  white = 'white',
}
export enum PieceTypes {
  king = 'king',
  queen = 'queen',
  rook = 'rook',
  bishop = 'bishop',
  knight = 'knight',
  pawn = 'pawn',
}

export interface IMoveLists {
  emptySquares: Array<ISquareCoordinates>;
  attackSquares: Array<ISquareCoordinates>;
}

export class ChessPiece {
  readonly name: string;
  readonly colour: TeamColour;
  readonly id: number;
  coordinates: ISquareCoordinates;
  isFirstMove: boolean;
  move(board: Array<BoardColumn>): IMoveLists {
    if (!board) throw new Error('board is not exist');

    const emptySquares: Array<ISquareCoordinates> = [];
    const attackSquares: Array<ISquareCoordinates> = [];
    return { emptySquares: emptySquares, attackSquares: attackSquares };
  }

  constructor(name: string, colour: TeamColour, id: number, position: ISquareCoordinates) {
    this.name = name;
    this.colour = colour;
    this.id = id;
    this.coordinates = position;
    this.isFirstMove = true;
  }
}
export class Pawn extends ChessPiece {
  override move(board: Array<BoardColumn>): IMoveLists {
    const emptySquares: Array<ISquareCoordinates> = [];
    const attackSquares: Array<ISquareCoordinates> = [];
    const moveLists: IMoveLists = { emptySquares: emptySquares, attackSquares: attackSquares };

    let direction: verticalDirections;
    switch (this.colour) {
      case TeamColour.white:
        direction = verticalDirections.top;
        break;
      case TeamColour.black:
        direction = verticalDirections.down;
        break;
    }
    const [startX, startY] = getCoordinates(this.coordinates);
    let coordinates: ISquareCoordinates;
    let y: number = startY + direction;
    if (y < 0 || y > 7) return moveLists;

    // check sides for enemy piece
    cornerAttack(board, startX, y, attackSquares, this);

    // check for default moves without taking enemy piece
    if (board[startX][y].piece) return moveLists;
    coordinates = { x: getColumnLetter(startX), y: y + 1 };
    emptySquares.push(coordinates);

    if (!this.isFirstMove) return moveLists;
    y += direction;
    if (y < 0 || y > 7) return moveLists;
    if (board[startX][y].piece) return moveLists;
    coordinates = { x: getColumnLetter(startX), y: y + 1 };
    emptySquares.push(coordinates);

    return moveLists;
  }
}
export class Rook extends ChessPiece {
  override move(board: Array<BoardColumn>): IMoveLists {
    const emptySquares: Array<ISquareCoordinates> = [];
    const attackSquares: Array<ISquareCoordinates> = [];
    const moveLists: IMoveLists = { emptySquares: emptySquares, attackSquares: attackSquares };

    horizontalAndVerticalMove(emptySquares, attackSquares, board, this);
    return moveLists;
  }
}
export class Bishop extends ChessPiece {
  override move(board: Array<BoardColumn>): IMoveLists {
    const emptySquares: Array<ISquareCoordinates> = [];
    const attackSquares: Array<ISquareCoordinates> = [];
    const moveLists: IMoveLists = { emptySquares: emptySquares, attackSquares: attackSquares };

    diagonalMove(emptySquares, attackSquares, board, this);
    return moveLists;
  }
}
export class Queen extends ChessPiece {
  override move(board: Array<BoardColumn>): IMoveLists {
    const emptySquares: Array<ISquareCoordinates> = [];
    const attackSquares: Array<ISquareCoordinates> = [];
    const moveLists: IMoveLists = { emptySquares: emptySquares, attackSquares: attackSquares };

    horizontalAndVerticalMove(emptySquares, attackSquares, board, this);
    diagonalMove(emptySquares, attackSquares, board, this);
    return moveLists;
  }
}
export class Knight extends ChessPiece {
  override move(board: Array<BoardColumn>): IMoveLists {
    const emptySquares: Array<ISquareCoordinates> = [];
    const attackSquares: Array<ISquareCoordinates> = [];
    const moveLists: IMoveLists = { emptySquares: emptySquares, attackSquares: attackSquares };

    knightMove(emptySquares, attackSquares, board, this);
    return moveLists;
  }
}
export class King extends ChessPiece {
  override move(board: Array<BoardColumn>): IMoveLists {
    const emptySquares: Array<ISquareCoordinates> = [];
    const attackSquares: Array<ISquareCoordinates> = [];
    const moveLists: IMoveLists = { emptySquares: emptySquares, attackSquares: attackSquares };

    kingMove(emptySquares, attackSquares, board, this);
    return moveLists;
  }
}

enum horizontalDirections {
  left = -1,
  right = 1,
}
enum verticalDirections {
  down = -1,
  top = 1,
}

// check square and and pass it to correct array or break from loop if needed
function distributeSquare(
  board: Array<BoardColumn>,
  emptySquares: Array<ISquareCoordinates>,
  attackSquares: Array<ISquareCoordinates>,
  mainPiece: ChessPiece,
  coordinates: ISquareCoordinates
): boolean {
  const [x, y] = getCoordinates(coordinates);
  const possiblePiece: ChessPiece | undefined = board[x][y].piece;

  const isBreak: boolean = true;
  if (!possiblePiece) {
    emptySquares.push(coordinates);
    return !isBreak;
  }
  if (possiblePiece.colour !== mainPiece.colour) {
    attackSquares.push(coordinates);
    return isBreak;
  }
  return isBreak;
}
// pawn's attack
function cornerAttack(
  board: Array<BoardColumn>,
  x: number,
  y: number,
  attackSquares: Array<ISquareCoordinates>,
  currentPiece: ChessPiece
): void {
  Object.keys(horizontalDirections).forEach((sideValue: string) => {
    if (isNaN(+sideValue)) return;
    const side: number = +sideValue;
    const sideX: number = x + side;
    if (sideX < 0 || sideX > 7) return;

    if (!board[sideX][y].piece || board[sideX][y].piece?.colour === currentPiece.colour) return;
    const coordinates = { x: getColumnLetter(sideX), y: y + 1 };
    attackSquares.push(coordinates);
  });
}
function horizontalAndVerticalMove(
  emptySquares: Array<ISquareCoordinates>,
  attackSquares: Array<ISquareCoordinates>,
  board: Array<BoardColumn>,
  piece: ChessPiece
): void {
  const [startX, startY] = getCoordinates(piece.coordinates);

  Object.keys(horizontalDirections).forEach((directionValue: string) => {
    if (isNaN(+directionValue)) return;
    const direction: number = +directionValue;

    for (let x: number = startX; x >= 0 && x <= 7; x += direction) {
      if (x === startX) continue;

      const columnIndex: columnLetterType = getColumnLetter(x);
      const rowIndex: number = startY + 1;
      const coordinates: ISquareCoordinates = { x: columnIndex, y: rowIndex };
      const isBreak = distributeSquare(board, emptySquares, attackSquares, piece, coordinates);
      if (isBreak) break;
    }
  });

  Object.keys(verticalDirections).forEach((directionValue: string) => {
    if (isNaN(+directionValue)) return;
    const direction: number = +directionValue;

    for (let y: number = startY; y >= 0 && y <= 7; y += direction) {
      if (y === startY) continue;

      const columnIndex: columnLetterType = getColumnLetter(startX);
      const rowIndex: number = y + 1;
      const coordinates: ISquareCoordinates = { x: columnIndex, y: rowIndex };
      const isBreak = distributeSquare(board, emptySquares, attackSquares, piece, coordinates);
      if (isBreak) break;
    }
  });
}
function diagonalMove(
  emptySquares: Array<ISquareCoordinates>,
  attackSquares: Array<ISquareCoordinates>,
  board: Array<BoardColumn>,
  piece: ChessPiece
): void {
  const [startX, startY] = getCoordinates(piece.coordinates);

  Object.keys(horizontalDirections).forEach((horizontalDirectionValue: string) => {
    if (isNaN(+horizontalDirectionValue)) return;
    const horizontalDirection: number = +horizontalDirectionValue;
    Object.keys(verticalDirections).forEach((verticalDirectionValue: string) => {
      if (isNaN(+verticalDirectionValue)) return;
      const verticalDirection: number = +verticalDirectionValue;

      let x: number = startX;
      let y: number = startY;
      while (x >= 0 && x <= 7 && y >= 0 && y <= 7) {
        if (x === startX && y === startY) {
          x += horizontalDirection;
          y += verticalDirection;
          continue;
        }

        const columnIndex: columnLetterType = getColumnLetter(x);
        const rowIndex: number = y + 1;
        const coordinates: ISquareCoordinates = { x: columnIndex, y: rowIndex };
        x += horizontalDirection;
        y += verticalDirection;
        const isBreak = distributeSquare(board, emptySquares, attackSquares, piece, coordinates);
        if (isBreak) break;
      }
    });
  });
}
function knightMove(
  emptySquares: Array<ISquareCoordinates>,
  attackSquares: Array<ISquareCoordinates>,
  board: Array<BoardColumn>,
  piece: ChessPiece
) {
  const [startX, startY] = getCoordinates(piece.coordinates);
  const possibleSquarePositions: Array<{ x: number; y: number }> = [];
  for (let x: number = -2; x <= 2; x++) {
    if (x === 0) continue;
    for (let y: number = -2; y <= 2; y++) {
      if (y === 0 || y === x || y === -x) continue;
      possibleSquarePositions.push({ x, y });
    }
  }

  possibleSquarePositions.forEach((squarePosition) => {
    const x: number = startX + squarePosition.x;
    const y: number = startY + squarePosition.y;
    if (x < 0 || x > 7 || y < 0 || y > 7) return;

    const columnIndex: columnLetterType = getColumnLetter(x);
    const rowIndex: number = y + 1;
    const coordinates: ISquareCoordinates = { x: columnIndex, y: rowIndex };
    distributeSquare(board, emptySquares, attackSquares, piece, coordinates);
  });
}
function kingMove(
  emptySquares: Array<ISquareCoordinates>,
  attackSquares: Array<ISquareCoordinates>,
  board: Array<BoardColumn>,
  piece: ChessPiece
): void {
  const [startX, startY] = getCoordinates(piece.coordinates);

  for (let relativePositionX: number = -1; relativePositionX <= 1; relativePositionX++) {
    for (let relativePositionY: number = -1; relativePositionY <= 1; relativePositionY++) {
      if (relativePositionX === 0 && relativePositionY === 0) continue;

      const x: number = startX + relativePositionX;
      const y: number = startY + relativePositionY;
      if (x < 0 || x > 7 || y < 0 || y > 7) continue;

      const columnIndex: columnLetterType = getColumnLetter(x);
      const rowIndex: number = y + 1;
      const coordinates: ISquareCoordinates = { x: columnIndex, y: rowIndex };
      distributeSquare(board, emptySquares, attackSquares, piece, coordinates);
    }
  }
}

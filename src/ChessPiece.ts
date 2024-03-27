import { ISquareCoordinates, columnLetterType, getColumnLetter, getCoordinates } from './boardIndexes';
import { BoardColumn, IBoardSquare } from './chess-board';
import lodash from 'lodash';

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
export enum KingsId {
  white = 'white-king',
  black = 'black-king',
}

export interface IMoveLists {
  emptySquares: Array<ISquareCoordinates>;
  attackSquares: Array<ISquareCoordinates>;
}
interface IMoveArguments {
  emptySquares: Array<ISquareCoordinates>;
  attackSquares: Array<ISquareCoordinates>;
  board: Array<BoardColumn>;
  piece: ChessPiece;
}

export class ChessPiece {
  readonly name: string;
  readonly colour: TeamColour;
  readonly id: string;
  coordinates: ISquareCoordinates;
  isFirstMove: boolean;
  move(board: Array<BoardColumn>, allyKing: ChessPiece): IMoveLists {
    if (!board || !allyKing) throw new Error('board is not exist');

    const emptySquares: Array<ISquareCoordinates> = [];
    const attackSquares: Array<ISquareCoordinates> = [];
    return { emptySquares: emptySquares, attackSquares: attackSquares };
  }

  constructor(name: string, colour: TeamColour, id: string, coordinates: ISquareCoordinates) {
    this.name = name;
    this.colour = colour;
    this.id = id;
    this.coordinates = coordinates;
    this.isFirstMove = true;
  }
}
export class Pawn extends ChessPiece {
  override move(board: Array<BoardColumn>, allyKing: ChessPiece): IMoveLists {
    const emptySquares: Array<ISquareCoordinates> = [];
    const attackSquares: Array<ISquareCoordinates> = [];
    const moveArguments: IMoveArguments = {
      emptySquares,
      attackSquares,
      board,
      piece: this,
    };

    pawnMove(moveArguments);
    validateMoves(moveArguments, allyKing);

    const moveLists: IMoveLists = {
      emptySquares: moveArguments.emptySquares,
      attackSquares: moveArguments.attackSquares,
    };
    return moveLists;
  }
}
export class Rook extends ChessPiece {
  override move(board: Array<BoardColumn>, allyKing: ChessPiece): IMoveLists {
    const emptySquares: Array<ISquareCoordinates> = [];
    const attackSquares: Array<ISquareCoordinates> = [];
    const moveArguments: IMoveArguments = {
      emptySquares,
      attackSquares,
      board,
      piece: this,
    };

    XYMove(moveArguments);
    validateMoves(moveArguments, allyKing);

    const moveLists: IMoveLists = {
      emptySquares: moveArguments.emptySquares,
      attackSquares: moveArguments.attackSquares,
    };
    return moveLists;
  }
}
export class Bishop extends ChessPiece {
  override move(board: Array<BoardColumn>, allyKing: ChessPiece): IMoveLists {
    const emptySquares: Array<ISquareCoordinates> = [];
    const attackSquares: Array<ISquareCoordinates> = [];
    const moveArguments: IMoveArguments = {
      emptySquares,
      attackSquares,
      board,
      piece: this,
    };

    diagonalMove(moveArguments);
    validateMoves(moveArguments, allyKing);

    const moveLists: IMoveLists = {
      emptySquares: moveArguments.emptySquares,
      attackSquares: moveArguments.attackSquares,
    };
    return moveLists;
  }
}
export class Queen extends ChessPiece {
  override move(board: Array<BoardColumn>, allyKing: ChessPiece): IMoveLists {
    const emptySquares: Array<ISquareCoordinates> = [];
    const attackSquares: Array<ISquareCoordinates> = [];
    const moveArguments: IMoveArguments = {
      emptySquares,
      attackSquares,
      board,
      piece: this,
    };

    XYMove(moveArguments);
    diagonalMove(moveArguments);
    validateMoves(moveArguments, allyKing);

    const moveLists: IMoveLists = {
      emptySquares: moveArguments.emptySquares,
      attackSquares: moveArguments.attackSquares,
    };
    return moveLists;
  }
}
export class Knight extends ChessPiece {
  override move(board: Array<BoardColumn>, allyKing: ChessPiece): IMoveLists {
    const emptySquares: Array<ISquareCoordinates> = [];
    const attackSquares: Array<ISquareCoordinates> = [];
    const moveArguments: IMoveArguments = {
      emptySquares,
      attackSquares,
      board,
      piece: this,
    };

    knightMove(moveArguments);
    validateMoves(moveArguments, allyKing);

    const moveLists: IMoveLists = {
      emptySquares: moveArguments.emptySquares,
      attackSquares: moveArguments.attackSquares,
    };
    return moveLists;
  }
}
export class King extends ChessPiece {
  override move(board: Array<BoardColumn>, allyKing: ChessPiece): IMoveLists {
    const emptySquares: Array<ISquareCoordinates> = [];
    const attackSquares: Array<ISquareCoordinates> = [];
    const moveArguments: IMoveArguments = {
      emptySquares,
      attackSquares,
      board,
      piece: this,
    };

    kingMove(moveArguments);
    validateMoves(moveArguments, allyKing);

    const moveLists: IMoveLists = {
      emptySquares: moveArguments.emptySquares,
      attackSquares: moveArguments.attackSquares,
    };
    return moveLists;
  }
}

enum HorizontalDirections {
  left = -1,
  right = 1,
}
enum VerticalDirections {
  down = -1,
  top = 1,
}

// check square and and pass it to correct array or break from loop if needed
function distributeSquare(moveArguments: IMoveArguments, coordinates: ISquareCoordinates): boolean {
  const [x, y] = getCoordinates(coordinates);
  const possiblePiece: ChessPiece | undefined = moveArguments.board[x][y].piece;

  const isBreak: boolean = true;
  if (!possiblePiece) {
    moveArguments.emptySquares.push(coordinates);
    return !isBreak;
  }
  if (possiblePiece.colour !== moveArguments.piece.colour) {
    moveArguments.attackSquares.push(coordinates);
    return isBreak;
  }
  return isBreak;
}
function defineMainDirection(colour: TeamColour): VerticalDirections {
  switch (colour) {
    case TeamColour.white:
      return VerticalDirections.top;
    case TeamColour.black:
      return VerticalDirections.down;
  }
}
// pawn's attack
function cornerAttack(moveArguments: IMoveArguments): void {
  const direction = defineMainDirection(moveArguments.piece.colour);
  const [startX, startY] = getCoordinates(moveArguments.piece.coordinates);
  const y: number = startY + direction;
  if (y < 0 || y > 7) return;

  Object.keys(HorizontalDirections).forEach((sideValue: string) => {
    if (isNaN(+sideValue)) return;
    const side: number = +sideValue;
    const x: number = startX + side;
    if (x < 0 || x > 7) return;

    const square: IBoardSquare = moveArguments.board[x][y];
    if (!square.piece || square.piece?.colour === moveArguments.piece.colour) return;

    const coordinates = { x: getColumnLetter(x), y: y + 1 };
    moveArguments.attackSquares.push(coordinates);
  });
}
function pawnMove(moveArguments: IMoveArguments): void {
  const direction: VerticalDirections = defineMainDirection(moveArguments.piece.colour);
  const [startX, startY] = getCoordinates(moveArguments.piece.coordinates);
  let coordinates: ISquareCoordinates;
  let y: number = startY + direction;
  if (y < 0 || y > 7) return;

  // check sides for enemy piece
  cornerAttack(moveArguments);

  // check for default moves without taking enemy piece
  if (moveArguments.board[startX][y].piece) return;
  coordinates = { x: getColumnLetter(startX), y: y + 1 };
  moveArguments.emptySquares.push(coordinates);

  if (!moveArguments.piece.isFirstMove) return;
  y += direction;
  if (y < 0 || y > 7) return;
  if (moveArguments.board[startX][y].piece) return;
  coordinates = { x: getColumnLetter(startX), y: y + 1 };
  moveArguments.emptySquares.push(coordinates);
}
function XYMove(moveArguments: IMoveArguments): void {
  const [startX, startY] = getCoordinates(moveArguments.piece.coordinates);

  Object.keys(HorizontalDirections).forEach((directionValue: string) => {
    if (isNaN(+directionValue)) return;
    const direction: number = +directionValue;

    for (let x: number = startX; x >= 0 && x <= 7; x += direction) {
      if (x === startX) continue;

      const columnIndex: columnLetterType = getColumnLetter(x);
      const rowIndex: number = startY + 1;
      const coordinates: ISquareCoordinates = { x: columnIndex, y: rowIndex };
      const isBreak = distributeSquare(moveArguments, coordinates);
      if (isBreak) break;
    }
  });

  Object.keys(VerticalDirections).forEach((directionValue: string) => {
    if (isNaN(+directionValue)) return;
    const direction: number = +directionValue;

    for (let y: number = startY; y >= 0 && y <= 7; y += direction) {
      if (y === startY) continue;

      const columnIndex: columnLetterType = getColumnLetter(startX);
      const rowIndex: number = y + 1;
      const coordinates: ISquareCoordinates = { x: columnIndex, y: rowIndex };
      const isBreak = distributeSquare(moveArguments, coordinates);
      if (isBreak) break;
    }
  });
}
function diagonalMove(moveArguments: IMoveArguments): void {
  const [startX, startY] = getCoordinates(moveArguments.piece.coordinates);

  Object.keys(HorizontalDirections).forEach((horizontalDirectionValue: string) => {
    if (isNaN(+horizontalDirectionValue)) return;
    const horizontalDirection: number = +horizontalDirectionValue;
    Object.keys(VerticalDirections).forEach((verticalDirectionValue: string) => {
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
        const isBreak = distributeSquare(moveArguments, coordinates);
        if (isBreak) break;
      }
    });
  });
}
function knightMove(moveArguments: IMoveArguments): void {
  const [startX, startY] = getCoordinates(moveArguments.piece.coordinates);
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
    distributeSquare(moveArguments, coordinates);
  });
}
function kingMove(moveArguments: IMoveArguments): void {
  const [startX, startY] = getCoordinates(moveArguments.piece.coordinates);

  for (let relativePositionX: number = -1; relativePositionX <= 1; relativePositionX++) {
    for (let relativePositionY: number = -1; relativePositionY <= 1; relativePositionY++) {
      if (relativePositionX === 0 && relativePositionY === 0) continue;

      const x: number = startX + relativePositionX;
      const y: number = startY + relativePositionY;
      if (x < 0 || x > 7 || y < 0 || y > 7) continue;

      const columnIndex: columnLetterType = getColumnLetter(x);
      const rowIndex: number = y + 1;
      const coordinates: ISquareCoordinates = { x: columnIndex, y: rowIndex };
      distributeSquare(moveArguments, coordinates);
    }
  }
}

interface IWhoMove {
  move: (moveArguments: IMoveArguments) => void;
  whoMove: Array<PieceTypes>;
}
type ListOfMoveFunctions = Array<IWhoMove>;
const listOfMoves: ListOfMoveFunctions = [
  { move: XYMove, whoMove: [PieceTypes.queen, PieceTypes.rook] },
  { move: diagonalMove, whoMove: [PieceTypes.queen, PieceTypes.bishop] },
  { move: knightMove, whoMove: [PieceTypes.knight] },
  { move: kingMove, whoMove: [PieceTypes.king] },
  { move: cornerAttack, whoMove: [PieceTypes.pawn] },
];
function validateMoves(moveArguments: IMoveArguments, allyKing: ChessPiece): void {
  const boardCopy: Array<BoardColumn> = lodash.cloneDeep(moveArguments.board);
  const [startX, startY] = getCoordinates(moveArguments.piece.coordinates);
  const piece: ChessPiece = boardCopy[startX][startY].piece!;
  delete boardCopy[startX][startY].piece;

  const kingCopy: ChessPiece = lodash.cloneDeep(allyKing);
  const kingValidationArguments: IMoveArguments = {
    emptySquares: [],
    attackSquares: [],
    board: boardCopy,
    piece: allyKing,
  };
  const filterMoves = (square: ISquareCoordinates): boolean => {
    const [x, y] = getCoordinates(square);
    const attacks: Array<ISquareCoordinates> = kingValidationArguments.attackSquares;
    if (piece.name === PieceTypes.king) {
      kingValidationArguments.piece.coordinates = square;
    }

    boardCopy[x][y].piece = piece;
    let isInvalid: boolean = false;
    const findInvalidMove = (...pieces: Array<PieceTypes>): boolean => {
      for (let i: number = 0; i < attacks.length; i++) {
        const [x, y] = getCoordinates(attacks[i]);
        const enemyPiece: ChessPiece = boardCopy[x][y].piece!;
        if (pieces.some((pieceName: string) => enemyPiece.name === pieceName)) {
          console.log('blocked', enemyPiece.name);
          kingValidationArguments.attackSquares.length = 0;
          return true;
        }
        console.log('allowed', piece);
      }
      kingValidationArguments.attackSquares.length = 0;
      return false;
    };

    for (let i: number = 0; i < listOfMoves.length; i++) {
      listOfMoves[i].move(kingValidationArguments);
      isInvalid = findInvalidMove(...listOfMoves[i].whoMove);
      if (isInvalid) {
        kingValidationArguments.piece.coordinates = kingCopy.coordinates;
        delete boardCopy[x][y].piece;
        return false;
      }
    }

    kingValidationArguments.piece.coordinates = kingCopy.coordinates;
    delete boardCopy[x][y].piece;
    return true;
  };

  const validEmptySquares: Array<ISquareCoordinates> = moveArguments.emptySquares.filter(filterMoves);
  const validAttackSquares: Array<ISquareCoordinates> = moveArguments.attackSquares.filter(filterMoves);
  moveArguments.emptySquares = validEmptySquares;
  moveArguments.attackSquares = validAttackSquares;
  // console.log('empty squares:', validEmptySquares, 'attack squares', validAttackSquares);
}
/*    
    XYMove(kingValidationArguments);
    isInvalid = findInvalidMove(PieceTypes.queen, PieceTypes.rook);
    if (isInvalid) return false;

    diagonalMove(kingValidationArguments);
    isInvalid = findInvalidMove(PieceTypes.queen, PieceTypes.bishop);
    if (isInvalid) return false;

    knightMove(kingValidationArguments);
    isInvalid = findInvalidMove(PieceTypes.knight);
    if (isInvalid) return false;

    kingMove(kingValidationArguments);
    isInvalid = findInvalidMove(PieceTypes.king);
    if (isInvalid) return false;

    cornerAttack(kingValidationArguments);
    isInvalid = findInvalidMove(PieceTypes.pawn);
    if (isInvalid) return false; 
    */

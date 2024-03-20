import { ChessPiece, Rook, TeamColour } from './ChessPiece';
import { pieces, IPieceType } from './starting-positions';
import { getColumnIndex, getRowIndex, ISquareCoordinates } from './boardIndexes';

export enum SquareMarks {
  availableSquare = 'available-square',
  attackSquares = 'attack-square',
  activeSquare = 'active-square ',
  checkSquare = 'check-square',
}

export type BoardSquare = Array<ChessPiece | SquareMarks>;
export type BoardColumn = Array<BoardSquare>;

export class Board {
  board: Array<BoardColumn> = [];
  private createBoard(): void {
    for (let i = 1; i <= 8; i++) {
      const boardColumn: BoardColumn = [];

      for (let j = 1; j <= 8; j++) {
        const boardSquare: BoardSquare = [];
        boardColumn.push(boardSquare);
      }

      this.board.push(boardColumn);
    }
  }

  constructor() {
    this.newGame();
  }

  newGame(): void {
    // empty the board
    this.board.splice(0, 8);
    this.createBoard();

    // put pieces on start position
    let pieceId = 1;
    pieces.forEach((pieceType: IPieceType) => {
      for (const colorKey in pieceType.startingSquare) {
        const startingPositions: Array<ISquareCoordinates> =
          pieceType.startingSquare[colorKey as keyof typeof pieceType.startingSquare];

        startingPositions.forEach((square: ISquareCoordinates) => {
          const color: TeamColour = TeamColour[colorKey as keyof typeof TeamColour];
          const piece = new Rook(pieceType.name, color, pieceId, square);
          pieceId++;
          piece.move(this.board, piece.position);

          const column = getColumnIndex(square.x);
          const row = getRowIndex(square.y);
          this.board[column][row].push(piece);
        });
      }
    });
  }
}
/*
 startingPositions.forEach((square: ISquareCoordinates) => {
          const color: TeamColour = TeamColour[colorKey as keyof typeof TeamColour];
          const piece = new Rook(pieceType.name, color, pieceId, square);
          pieceId++;
          piece.move(this.board, piece.position);

          const column = getColumnIndex(square.x);
          const row = getRowIndex(square.y);
          this.board[column][row].push(piece);
*/

/*
original
 startingPositions.forEach((square: ISquareCoordinates) => {
          const color: TeamColour = TeamColour[colorKey as keyof typeof TeamColour];
          const piece = new ChessPiece(pieceType.name, color, pieceId, square);
          pieceId++;

          const column = getColumnIndex(square.x);
          const row = getRowIndex(square.y);
          this.board[column][row].push(piece);
        });
*/

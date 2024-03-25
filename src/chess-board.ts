import { Bishop, ChessPiece, King, Knight, Pawn, PieceTypes, Queen, Rook, TeamColour } from './ChessPiece';
import { pieces, IPieceType } from './starting-positions';
import { getCoordinates, ISquareCoordinates } from './boardIndexes';

export enum SquareMarks {
  emptySquare = 'empty-square',
  attackSquares = 'attack-square',
  activeSquare = 'active-square ',
  checkSquare = 'check-square',
}
export interface IBoardSquare {
  piece?: ChessPiece;
  squareMark?: SquareMarks;
}
// export type BoardSquare = Array<ChessPiece | SquareMarks>;
export type BoardColumn = Array<IBoardSquare>;

export class Board {
  board: Array<BoardColumn> = [];
  private createBoard(): void {
    for (let i = 1; i <= 8; i++) {
      const boardColumn: BoardColumn = [];
      // const boardColumn: BoardColumn = new Array(8).fill('').map(() => ({}));

      for (let j = 1; j <= 8; j++) {
        const boardSquare: IBoardSquare = {};
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

          let piece: ChessPiece;
          switch (pieceType.name) {
            case PieceTypes.king:
              piece = new King(pieceType.name, color, pieceId, square);
              break;
            case PieceTypes.queen:
              piece = new Queen(pieceType.name, color, pieceId, square);
              break;
            case PieceTypes.rook:
              piece = new Rook(pieceType.name, color, pieceId, square);
              break;
            case PieceTypes.bishop:
              piece = new Bishop(pieceType.name, color, pieceId, square);
              break;
            case PieceTypes.knight:
              piece = new Knight(pieceType.name, color, pieceId, square);
              break;
            case PieceTypes.pawn:
              piece = new Pawn(pieceType.name, color, pieceId, square);
              break;
            default:
              throw new Error(`${pieceType.name} is not a valid name`);
          }
          pieceId++;

          const [column, row] = getCoordinates(square);
          this.board[column][row].piece = piece;
        });
      }
    });
  }
}

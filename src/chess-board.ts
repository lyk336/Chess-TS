import { Bishop, ChessPiece, King, KingsId, Knight, Pawn, PieceTypes, Queen, Rook, TeamColour } from './ChessPiece';
import { pieces, IStartPiece } from './starting-positions';
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
    let id = 1;
    const pieceId = (): string => {
      const pieceId: string = id.toString();
      id++;
      return pieceId;
    };
    pieces.forEach((startPiece: IStartPiece) => {
      startPiece.startingSquare.forEach((coordinates: ISquareCoordinates) => {
        const whiteCoordinates: ISquareCoordinates = coordinates;
        const blackCoordinates: ISquareCoordinates = { x: coordinates.x, y: 9 - coordinates.y };

        let whitePiece: ChessPiece, blackPiece: ChessPiece;
        switch (startPiece.name) {
          case PieceTypes.king:
            whitePiece = new King(startPiece.name, TeamColour.white, KingsId.white, whiteCoordinates);
            blackPiece = new King(startPiece.name, TeamColour.black, KingsId.black, blackCoordinates);
            break;
          case PieceTypes.queen:
            whitePiece = new Queen(startPiece.name, TeamColour.white, pieceId(), whiteCoordinates);
            blackPiece = new Queen(startPiece.name, TeamColour.black, pieceId(), blackCoordinates);
            break;
          case PieceTypes.rook:
            whitePiece = new Rook(startPiece.name, TeamColour.white, pieceId(), whiteCoordinates);
            blackPiece = new Rook(startPiece.name, TeamColour.black, pieceId(), blackCoordinates);
            break;
          case PieceTypes.bishop:
            whitePiece = new Bishop(startPiece.name, TeamColour.white, pieceId(), whiteCoordinates);
            blackPiece = new Bishop(startPiece.name, TeamColour.black, pieceId(), blackCoordinates);
            break;
          case PieceTypes.knight:
            whitePiece = new Knight(startPiece.name, TeamColour.white, pieceId(), whiteCoordinates);
            blackPiece = new Knight(startPiece.name, TeamColour.black, pieceId(), blackCoordinates);
            break;
          case PieceTypes.pawn:
            whitePiece = new Pawn(startPiece.name, TeamColour.white, pieceId(), whiteCoordinates);
            blackPiece = new Pawn(startPiece.name, TeamColour.black, pieceId(), blackCoordinates);
            break;
          default:
            throw new Error(`${startPiece.name} is not a valid name`);
        }

        const [whiteX, whiteY] = getCoordinates(whiteCoordinates);
        const [blackX, blackY] = getCoordinates(blackCoordinates);
        this.board[whiteX][whiteY].piece = whitePiece;
        this.board[blackX][blackY].piece = blackPiece;
      });
    });
  }
}

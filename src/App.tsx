import { FC, useCallback, useEffect, useRef, useState } from 'react';
import './styles/App.css';
import lodash from 'lodash';
import { Board, BoardColumn, SquareMarks } from './chess-board';
import { ISquareCoordinates, getColumnLetter, getCoordinates } from './boardIndexes';
import Column from './components/Columns';
import { ChessPiece } from './ChessPiece';

export interface ISquareHandlers {
  handlePieceInteraction(piece: ChessPiece): void;
  handleMove(squareCoordinates: ISquareCoordinates): void;
}

const compareCoordinates = (coord1: ISquareCoordinates | null, coord2: ISquareCoordinates | null): boolean => {
  if (!coord1 || !coord2) return false;

  const coordJSON1: string = JSON.stringify(coord1);
  const coordJSON2: string = JSON.stringify(coord2);

  return coordJSON1 === coordJSON2;
};

enum MoveType {
  emptySquares = 0,
  attackSquares,
}

const App: FC = () => {
  const [board, setBoard] = useState<Array<BoardColumn>>([]);
  const [whoseTurn, setWhoseTurn] = useState<string>('white');
  const [activePiece, setActivePiece] = useState<ISquareCoordinates | null>(null);
  const [kingCheckLocation, setKingCheckLocation] = useState<ISquareCoordinates | null>(null);
  const [emptySquares, setEmptySquares] = useState<Array<ISquareCoordinates>>([]);
  const [attackSquares, setAttackSquares] = useState<Array<ISquareCoordinates>>([]);

  useEffect(() => {
    const newBoard = new Board();
    setBoard(newBoard.board);
  }, []);

  // add/remove marks
  const previousActivePiece = useRef<ISquareCoordinates | null>(null);
  const previousEmptySquares = useRef<Array<ISquareCoordinates>>([]);
  const previousAttackSquares = useRef<Array<ISquareCoordinates>>([]);

  const createBoardCopy = useCallback((): Array<BoardColumn> => {
    const boardCopy = lodash.cloneDeep(board);
    return boardCopy;
  }, [board]);

  const updateActiveMarks = useCallback(
    (boardCopy: Array<BoardColumn>): void => {
      if (!activePiece) return;

      const [cuurentX, currentY] = getCoordinates(activePiece);

      if (!previousActivePiece.current) {
        boardCopy[cuurentX][currentY].squareMark = SquareMarks.activeSquare;
        previousActivePiece.current = activePiece;
        return;
      }

      // remove previous mark
      const [previousX, previousY] = getCoordinates(previousActivePiece.current);
      previousActivePiece.current = activePiece;
      delete boardCopy[previousX][previousY].squareMark;
      //  add new mark
      boardCopy[cuurentX][currentY].squareMark = SquareMarks.activeSquare;
    },
    [activePiece]
  );
  const updateMovesMarks = useCallback(
    (boardCopy: Array<BoardColumn>, moveType: MoveType): void => {
      const moveLists = [emptySquares, attackSquares];
      const previousListsRefs = [previousEmptySquares, previousAttackSquares];

      const moveList = moveLists[moveType];
      const previousListRef = previousListsRefs[moveType];
      if (!moveList.length && !previousListRef.current.length) return;

      // clear all previous marks
      previousListRef.current.forEach((square: ISquareCoordinates) => {
        const [x, y] = getCoordinates(square);
        delete boardCopy[x][y].squareMark;
      });
      previousListRef.current = [];

      // add new marks
      moveList.forEach((square: ISquareCoordinates) => {
        const [x, y] = getCoordinates(square);
        switch (moveType) {
          case MoveType.emptySquares:
            boardCopy[x][y].squareMark = SquareMarks.emptySquare;
            break;
          case MoveType.attackSquares:
            boardCopy[x][y].squareMark = SquareMarks.attackSquares;
            break;
        }
      });
      previousListRef.current = moveList;
    },
    [emptySquares, attackSquares]
  );
  useEffect(() => {
    if (!board.length) return;
    const boardCopy: Array<BoardColumn> = createBoardCopy();

    updateActiveMarks(boardCopy);
    updateMovesMarks(boardCopy, MoveType.emptySquares);
    updateMovesMarks(boardCopy, MoveType.attackSquares);

    setBoard(boardCopy);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePiece, emptySquares, attackSquares]);

  const changeTurn = (): void => {
    const nextTurn: string = whoseTurn === 'white' ? 'black' : 'white';
    setWhoseTurn(nextTurn);
  };

  let squareNumber: number = 0;
  let isLightSquare: boolean = false;
  const defineSquareColour = (): string => {
    if (squareNumber % 8 === 0 && squareNumber % 16 !== 0) {
      // to avoid rows of one colour
      isLightSquare = !isLightSquare;
    }
    const squareColour: string = isLightSquare ? 'dark' : 'light';
    isLightSquare = !isLightSquare;
    squareNumber++;

    return squareColour;
  };

  // onclick handlers
  const handlePieceInteraction = (piece: ChessPiece): void => {
    if (whoseTurn !== piece.colour) {
      return;
    }
    // deactivate piece
    if (compareCoordinates(activePiece, piece.coordinates)) {
      const boardCopy: Array<BoardColumn> = createBoardCopy();
      const [currentX, currentY] = getCoordinates(activePiece!);
      delete boardCopy[currentX][currentY].squareMark;

      setBoard(boardCopy);
      setEmptySquares([]);
      setAttackSquares([]);
      setActivePiece(null);
      previousActivePiece.current = null;
      return;
    }
    setActivePiece(piece.coordinates);

    const boardCopy: Array<BoardColumn> = createBoardCopy();
    const [x, y] = getCoordinates(piece.coordinates);
    console.log(piece.coordinates);
    const interactingPiece: ChessPiece = board[x][y].piece!;

    const { emptySquares, attackSquares } = interactingPiece.move(boardCopy);
    setEmptySquares(emptySquares);
    setAttackSquares(attackSquares);
  };
  const handleMove = (squareCoordinates: ISquareCoordinates): void => {
    if (!activePiece) return;
    const boardCopy = createBoardCopy();
    const [squareX, squareY] = getCoordinates(squareCoordinates);
    const [pieceX, pieceY] = getCoordinates(activePiece);
    const piece: ChessPiece = boardCopy[pieceX][pieceY].piece!;
    piece.coordinates = squareCoordinates;
    piece.isFirstMove = false;

    boardCopy[squareX][squareY].piece = piece;
    delete boardCopy[pieceX][pieceY].piece;
    delete boardCopy[pieceX][pieceY].squareMark;

    setBoard(boardCopy);
    setEmptySquares([]);
    setAttackSquares([]);
    setActivePiece(null);
    previousActivePiece.current = null;
    changeTurn();
  };

  const squareHandlers: ISquareHandlers = {
    handlePieceInteraction,
    handleMove,
  };

  return (
    <main className='main'>
      <div className='board'>
        <div className='board__numbers'>
          <div className='board__row-number'>1</div>
          <div className='board__row-number'>2</div>
          <div className='board__row-number'>3</div>
          <div className='board__row-number'>4</div>
          <div className='board__row-number'>5</div>
          <div className='board__row-number'>6</div>
          <div className='board__row-number'>7</div>
          <div className='board__row-number'>8</div>
        </div>
        {board.map((column: BoardColumn, i: number) => (
          <Column
            column={column}
            index={i}
            defineSquareColour={defineSquareColour}
            handlers={squareHandlers}
            key={getColumnLetter(i)}
          />
        ))}
      </div>
    </main>
  );
};

export default App;

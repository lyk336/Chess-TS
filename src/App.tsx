import { FC, useCallback, useEffect, useRef, useState } from 'react';
import './styles/App.css';
import lodash from 'lodash';
import { Board, BoardColumn, SquareMarks } from './chess-board';
import { ISquareCoordinates, getColumnIndex, getColumnLetter, getCoordinates, getRowIndex } from './boardIndexes';
// import { columnIndexes, getColumnIndex, getColumnLetter, getRowIndex } from './boardIndexes';
// import { ChessPiece } from './ChessPiece';
import Column from './components/Columns';
import { ChessPiece } from './ChessPiece';

export interface ISquareHandlers {
  handlePieceInteraction(piece: ChessPiece): void;
  handleAvailableSquare(): void;
  handleAttackSquare(): void;
}

const compareCoordinates = (coord1: ISquareCoordinates | null, coord2: ISquareCoordinates | null): boolean => {
  if (!coord1 || !coord2) return false;

  const coordJSON1: string = JSON.stringify(coord1);
  const coordJSON2: string = JSON.stringify(coord2);

  return coordJSON1 === coordJSON2;
};

const App: FC = () => {
  const [board, setBoard] = useState<Array<BoardColumn>>([]);
  const [whoseTurn, setWhoseTurn] = useState<string>('white');
  const [activePiece, setActivePiece] = useState<ISquareCoordinates | null>(null);
  const [kingCheckLocation, setKingCheckLocation] = useState<ISquareCoordinates | null>(null);

  useEffect(() => {
    const newBoard = new Board();
    setBoard(newBoard.board);
  }, []);

  // add/remove mark to/from active square or check
  const previousActivePiece = useRef<ISquareCoordinates | null>(null);
  const createBoardCopy = useCallback((): Array<BoardColumn> => {
    const boardCopy = lodash.cloneDeep(board);
    return boardCopy;
  }, [board]);

  useEffect(() => {
    if (!activePiece) {
      return;
    }

    const boardCopy: Array<BoardColumn> = createBoardCopy();
    const [cuurentX, currentY] = getCoordinates(activePiece);

    if (!previousActivePiece.current) {
      console.log(2);
      boardCopy[cuurentX][currentY].SquareMark = SquareMarks.activeSquare;
      previousActivePiece.current = activePiece;
      setBoard(boardCopy);
      return;
    }
    console.log(3);

    // remove previous mark
    const [previousX, previousY] = getCoordinates(previousActivePiece.current);
    previousActivePiece.current = activePiece;
    delete boardCopy[previousX][previousY].SquareMark;
    //  add new mark
    boardCopy[cuurentX][currentY].SquareMark = SquareMarks.activeSquare;
    setBoard(boardCopy);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePiece]);
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

  // pass check update function to pieces
  const kingUnderCheck = (coordinates: ISquareCoordinates): void => {
    setKingCheckLocation(coordinates);
  };

  // onclick handlers
  const handlePieceInteraction = (piece: ChessPiece): void => {
    if (whoseTurn !== piece.colour) {
      return;
    }
    if (compareCoordinates(activePiece, piece.coordinates)) {
      const boardCopy: Array<BoardColumn> = createBoardCopy();
      const [currentX, currentY] = getCoordinates(activePiece!);

      delete boardCopy[currentX][currentY].SquareMark;
      setBoard(boardCopy);
      setActivePiece(null);
      previousActivePiece.current = null;
      return;
    }
    setActivePiece(piece.coordinates);

    const boardCopy: Array<BoardColumn> = lodash.cloneDeep(board);
    const interactingPiece: ChessPiece =
      board[getColumnIndex(piece.coordinates.x)][getRowIndex(piece.coordinates.y)].piece!;

    interactingPiece.move(boardCopy);
  };
  const handleAvailableSquare = (): void => {
    if (kingCheckLocation) setKingCheckLocation(null);
    // move()
    changeTurn();
  };
  const handleAttackSquare = (): void => {
    if (kingCheckLocation) setKingCheckLocation(null);
    // move()
    changeTurn();
  };

  const squareHandlers: ISquareHandlers = {
    handlePieceInteraction,
    handleAvailableSquare,
    handleAttackSquare,
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

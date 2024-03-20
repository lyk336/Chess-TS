import { FC, useEffect, useState } from 'react';
import './styles/App.css';
import lodash from 'lodash';
import { Board, BoardColumn } from './chess-board';
import { ISquareCoordinates, getColumnLetter } from './boardIndexes';
// import { columnIndexes, getColumnIndex, getColumnLetter, getRowIndex } from './boardIndexes';
// import { ChessPiece } from './ChessPiece';
import Column from './components/Columns';

const App: FC = () => {
  const [board, setBoard] = useState<Array<BoardColumn>>([]);
  const [whoseTurn, setWhoseTurn] = useState<string>('white');
  const [activePiece, setActivePiece] = useState<ISquareCoordinates | null>(null);
  const [kingCheckLocation, setKingCheckLocation] = useState<ISquareCoordinates | null>(null);
  useEffect(() => {
    const newBoard = new Board();
    setBoard(newBoard.board);
  }, []);

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
    const squareColour: string = isLightSquare ? 'light' : 'dark';
    isLightSquare = !isLightSquare;
    squareNumber++;

    return squareColour;
  };

  // pass check update function to pieces
  const kingUnderCheck = (coordinates: ISquareCoordinates): void => {
    setKingCheckLocation(coordinates);
  };

  // onclick handlers
  const handlePieceInteraction = (pieceCoordinates: ISquareCoordinates): void => {
    const boardCopy: Array<BoardColumn> = lodash.cloneDeep(board);
    setActivePiece(pieceCoordinates);
  };
  const handleActivePiece = (): void => {
    setActivePiece(null);
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
          <Column column={column} index={i} defineSquareColour={defineSquareColour} key={getColumnLetter(i)} />
        ))}
      </div>
    </main>
  );
};

export default App;

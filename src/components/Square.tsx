import { FC } from 'react';
import { IBoardSquare, SquareMarks } from '../chess-board';
import Piece from './Piece';
import { ISquareHandlers } from '../App';
import { ISquareCoordinates } from '../boardIndexes';

interface ISquareProps {
  square: IBoardSquare;
  defineSquareColour: string;
  handlers: ISquareHandlers;
  id: string;
  squareCoordinates: ISquareCoordinates;
}

const Square: FC<ISquareProps> = ({ square, defineSquareColour, handlers, id, squareCoordinates }) => {
  const handleMove = (): void => {
    if (square.squareMark === SquareMarks.emptySquare || square.squareMark === SquareMarks.attackSquares) {
      handlers.handleMove(squareCoordinates);
    }
  };

  if (square.piece && square.squareMark) {
    return (
      <div className={`board__square ${defineSquareColour}-square`} id={id}>
        <div className={`${square.squareMark}`} onClick={handleMove}>
          <Piece piece={square.piece} handlers={handlers} key={square.piece.id}></Piece>
        </div>
      </div>
    );
  }
  if (square.squareMark) {
    return (
      <div className={`board__square ${defineSquareColour}-square`} id={id}>
        <div className={`${square.squareMark}`} onClick={handleMove}></div>
      </div>
    );
  }
  if (square.piece) {
    return (
      <div className={`board__square ${defineSquareColour}-square`} id={id}>
        <Piece piece={square.piece} handlers={handlers} key={square.piece.id}></Piece>
      </div>
    );
  }

  return <div className={`board__square ${defineSquareColour}-square`} id={id}></div>;
};

export default Square;

import { FC } from 'react';
import { IBoardSquare, SquareMarks } from '../chess-board';
import Piece from './Piece';
import { ISquareHandlers } from '../App';

interface ISquareProps {
  square: IBoardSquare;
  defineSquareColour: string;
  handlers: ISquareHandlers;
  id: string;
}

const Square: FC<ISquareProps> = ({ square, defineSquareColour, handlers, id }) => {
  const defineMarkHandler = () => {
    switch (square.SquareMark) {
      case SquareMarks.availableSquare:
        return handlers.handleAvailableSquare;

      case SquareMarks.attackSquares:
        return handlers.handleAttackSquare;
    }
  };

  if (square.piece && square.SquareMark) {
    return (
      <div className={`board__square ${defineSquareColour}-square`} id={id}>
        <div className={`${square.SquareMark}`} onClick={defineMarkHandler}>
          <Piece piece={square.piece} handlers={handlers} key={square.piece.id}></Piece>
        </div>
      </div>
    );
  }
  if (square.SquareMark) {
    return (
      <div className={`board__square ${defineSquareColour}-square`} id={id}>
        <div className={`${square.SquareMark}`}></div>
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

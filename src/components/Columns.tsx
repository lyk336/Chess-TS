import { FC } from 'react';
import { ISquareCoordinates, columnIndexes, columnLetterType } from '../boardIndexes';
import { BoardColumn, IBoardSquare } from '../chess-board';
import Square from './Square';
import { ISquareHandlers } from '../App';

interface IColumnProps {
  column: BoardColumn;
  index: number;
  defineSquareColour(): string;
  handlers: ISquareHandlers;
}

const Column: FC<IColumnProps> = ({ column, index, defineSquareColour, handlers }) => {
  const columnIndex: columnLetterType = columnIndexes[index];

  return (
    <div className='board__column' id={columnIndex} key={columnIndex}>
      {column
        .map((square: IBoardSquare, i: number) => {
          const squareCoordinates: ISquareCoordinates = { x: columnIndex, y: i + 1 };
          const squareId: string = squareCoordinates.x + squareCoordinates.y;
          return (
            <Square
              square={square}
              defineSquareColour={defineSquareColour()}
              handlers={handlers}
              id={squareId}
              squareCoordinates={squareCoordinates}
              key={squareId}
            />
          );
        })
        .reverse()}
    </div>
  );
};

export default Column;

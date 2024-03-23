import { FC } from 'react';
import { columnIndexes } from '../boardIndexes';
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
  const columnIndex: string = columnIndexes[index];

  return (
    <div className='board__column' id={columnIndex} key={columnIndex}>
      {column
        .map((square: IBoardSquare, i: number) => {
          const squareKey: string = columnIndex + (i + 1);
          return (
            <Square
              square={square}
              defineSquareColour={defineSquareColour()}
              handlers={handlers}
              id={squareKey}
              key={squareKey}
            />
          );
        })
        .reverse()}
    </div>
  );
};

export default Column;

/* 
  <div className='board__column' id='a'>
    <div className='board__square light-square'></div>
    <div className='board__square dark-square'></div>
    <div className='board__square light-square'></div>
    <div className='board__square dark-square'></div>
    <div className='board__square light-square'></div>
    <div className='board__square dark-square'></div>
    <div className='board__square light-square'></div>
    <div className='board__square dark-square'></div>
  </div>
  <div className='board__column' id='b'>
    <div className='board__square dark-square'></div>
    <div className='board__square light-square'></div>
    <div className='board__square dark-square'></div>
    <div className='board__square light-square'></div>
    <div className='board__square dark-square'></div>
    <div className='board__square light-square'></div>
    <div className='board__square dark-square'></div>
    <div className='board__square light-square'></div>
  </div>
  <div className='board__column' id='c'>
    <div className='board__square light-square'></div>
    <div className='board__square dark-square'></div>
    <div className='board__square light-square'></div>
    <div className='board__square dark-square'></div>
    <div className='board__square light-square'></div>
    <div className='board__square dark-square'></div>
    <div className='board__square light-square'></div>
    <div className='board__square dark-square'></div>
  </div>
  <div className='board__column' id='d'>
    <div className='board__square dark-square'></div>
    <div className='board__square light-square'></div>
    <div className='board__square dark-square'></div>
    <div className='board__square light-square'></div>
    <div className='board__square dark-square'></div>
    <div className='board__square light-square'></div>
    <div className='board__square dark-square'></div>
    <div className='board__square light-square'></div>
  </div>
  <div className='board__column' id='e'>
    <div className='board__square light-square'></div>
    <div className='board__square dark-square'></div>
    <div className='board__square light-square'></div>
    <div className='board__square dark-square'></div>
    <div className='board__square light-square'></div>
    <div className='board__square dark-square'></div>
    <div className='board__square light-square'></div>
    <div className='board__square dark-square'></div>
  </div>
  <div className='board__column' id='f'>
    <div className='board__square dark-square'></div>
    <div className='board__square light-square'></div>
    <div className='board__square dark-square'></div>
    <div className='board__square light-square'></div>
    <div className='board__square dark-square'></div>
    <div className='board__square light-square'></div>
    <div className='board__square dark-square'></div>
    <div className='board__square light-square'></div>
  </div>
  <div className='board__column' id='g'>
    <div className='board__square light-square'></div>
    <div className='board__square dark-square'></div>
    <div className='board__square light-square'></div>
    <div className='board__square dark-square'></div>
    <div className='board__square light-square'></div>
    <div className='board__square dark-square'></div>
    <div className='board__square light-square'></div>
    <div className='board__square dark-square'></div>
  </div>
  <div className='board__column' id='h'>
    <div className='board__square dark-square'></div>
    <div className='board__square light-square'></div>
    <div className='board__square dark-square'></div>
    <div className='board__square light-square'></div>
    <div className='board__square dark-square'></div>
    <div className='board__square light-square'></div>
    <div className='board__square dark-square'></div>
    <div className='board__square light-square'></div>
  </div> 
*/

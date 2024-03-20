import { FC } from 'react';
import { columnIndexes } from '../boardIndexes';
import { BoardColumn, BoardSquare } from '../chess-board';
import { ChessPiece } from '../ChessPiece';
import Piece from './Piece';

interface IColumnProps {
  column: BoardColumn;
  index: number;
  defineSquareColour(): string;
}

const Column: FC<IColumnProps> = ({ column, index, defineSquareColour }) => {
  const columnIndex: string = columnIndexes[index];

  return (
    <div className='board__column' id={columnIndex} key={columnIndex}>
      {column.map((square: BoardSquare) => {
        const squareKey: string = columnIndex + Math.random().toFixed(10);
        return (
          <div className={`board__square ${defineSquareColour()}-square`} id={squareKey} key={squareKey}>
            {square.map((piece: ChessPiece) => (
              <Piece piece={piece} key={piece.id}></Piece>
            ))}
          </div>
        );
      })}
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

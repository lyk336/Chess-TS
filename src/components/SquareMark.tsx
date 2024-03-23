import { FC, ReactNode } from 'react';
import { SquareMarks } from '../chess-board';

interface ISquareMarkProps {
  squareMark: SquareMarks;
  children: ReactNode;
}

const SquareMark: FC<ISquareMarkProps> = ({ squareMark, children }) => {
  return <div className={`board__square ${squareMark}`}>{children}</div>;
};

export default SquareMark;

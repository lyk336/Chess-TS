export type columnLetterType = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h';

export const columnIndexes: Array<columnLetterType> = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

export interface ISquareCoordinates {
  x: columnLetterType;
  y: number;
}

export const getColumnIndex = (i: columnLetterType): number => {
  const index: number = columnIndexes.indexOf(i);
  return index;
};
export const getColumnLetter = (i: number): columnLetterType => {
  const columnLetter: columnLetterType = columnIndexes[i];
  return columnLetter;
};
export const getRowIndex = (i: number): number => i - 1;

export const getCoordinates = (coordinates: ISquareCoordinates): [x: number, y: number] => {
  const x: number = getColumnIndex(coordinates.x);
  const y: number = getRowIndex(coordinates.y);

  return [x, y];
};

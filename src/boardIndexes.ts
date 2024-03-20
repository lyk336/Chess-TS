export const columnIndexes: Array<string> = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

export type columnIndexType = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h';

export interface ISquareCoordinates {
  x: columnIndexType;
  y: number;
}

export const getColumnIndex = (i: columnIndexType): number => {
  const index: number = columnIndexes.indexOf(i);
  return index;
};
export const getColumnLetter = (i: number): string => {
  const columnLetter: string = columnIndexes[i];
  return columnLetter;
};
export const getRowIndex = (i: number): number => i - 1;

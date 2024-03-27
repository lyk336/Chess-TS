import { FC } from 'react';
import { ChessPiece } from '../ChessPiece';
import { ISquareHandlers } from '../App';

interface IPieceProps {
  piece: ChessPiece;
  handlers: ISquareHandlers;
}

const Piece: FC<IPieceProps> = ({ piece, handlers }) => {
  return (
    <div
      className='piece'
      id={piece.id}
      onClick={() => {
        handlers.handlePieceInteraction(piece);
      }}
    >
      <img src={`src/assets/pieces/${piece.colour}/${piece.name}.svg`} alt={piece.name} />
    </div>
  );
};

export default Piece;

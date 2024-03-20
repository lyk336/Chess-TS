import { FC } from 'react';
import { ChessPiece } from '../ChessPiece';

interface IPieceProps {
  piece: ChessPiece;
}

const Piece: FC<IPieceProps> = ({ piece }) => {
  return (
    <div className='piece' id={piece.id.toString()}>
      <img src={`src/assets/pieces/${piece.colour}/${piece.name}.svg`} alt={piece.name} />
    </div>
  );
};

export default Piece;

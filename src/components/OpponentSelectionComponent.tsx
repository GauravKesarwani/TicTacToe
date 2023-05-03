import { useAppDispatch } from '../app/hooks';
import { setOpponent } from '../features/game/gameSlice';

interface OpponentSelectionProps {
  startGame: () => void;
}

const OpponentSelectionComponent = ({ startGame }: OpponentSelectionProps) => {
  const dispatch = useAppDispatch();

  const onSelectOpponent = (opponent: string) => {
    dispatch(setOpponent(opponent));
    startGame();
  };

  return (
    <div className="new-game-wrapper">
      <label>Start New Game</label>
      <button className="btn-cpu" onClick={() => onSelectOpponent('cpu')}>
        VS CPU
      </button>
      <button className="btn-player" onClick={() => onSelectOpponent('player')}>
        VS PLAYER
      </button>
    </div>
  );
};

export default OpponentSelectionComponent;

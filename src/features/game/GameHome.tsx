import { useAppDispatch } from '../../app/hooks';
import { setOpponent, setPlayerMark, GameStatus } from './gameSlice';
import { marks } from '../../utils/constants';
import './gameHome.scss';

interface GameHomeProps {
  startGame: () => void;
}
const GameHome = ({ startGame }: GameHomeProps) => {
  const dispatch = useAppDispatch();
  const cleanSelected = () => {
    const selectedEl = document.querySelector('.selected');
    selectedEl?.classList.remove('selected');
  };

  // @ts-ignore
  const handleXSelect = (ev: MouseEvent<HTMLButtonElement>) => {
    cleanSelected();
    const el = ev.target;
    if (el instanceof HTMLElement) {
      el.classList.add('selected');
    }

    dispatch(setPlayerMark(marks.X));
  };

  // @ts-ignore
  const handleOSelect = (ev: MouseEvent<HTMLButtonElement>) => {
    cleanSelected();
    const el = ev.target; // not always an HTML element.
    if (el instanceof HTMLElement) {
      el.classList.add('selected');
    }

    dispatch(setPlayerMark(marks.O));
  };

  const onSelectOpponent = (opponent: string) => {
    dispatch(setOpponent(opponent));
    startGame();
  };

  return (
    <>
      <div className="new-game-wrapper">
        <label>Start New Game</label>
        <button className="btn-cpu" onClick={() => onSelectOpponent('cpu')}>
          VS CPU
        </button>
        <button
          className="btn-player"
          onClick={() => onSelectOpponent('player')}
        >
          VS PLAYER
        </button>
      </div>

      <div className="game-level-container">
        <label className="label-game-level">Select Game Level</label>
        <button className="btn-easy">Easy</button>
        <button className="btn-medium">Medium</button>
        <button className="btn-hard">Hard</button>
      </div>
      <div className="player-mark-container">
        <label className="player-mark">
          Select Player Mark. (Remember X plays first)
        </label>
        <div className="btn-selection-container">
          <button className="btn-x" onClick={handleXSelect}>
            {marks.X}
          </button>
          <button className="btn-o" onClick={handleOSelect}>
            {marks.O}
          </button>
        </div>
      </div>
    </>
  );
};

export default GameHome;
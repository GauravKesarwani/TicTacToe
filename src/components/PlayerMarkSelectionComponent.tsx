import { useAppDispatch } from '../app/hooks';
import { Marks } from '../utils/constants';
import { selectPlayer } from '../features/game/gameSlice';

const PlayerMarkSelectionComponent = () => {
  const dispatch = useAppDispatch();
  const cleanSelected = () => {
    const selectedEl = document.querySelector('.selected');
    selectedEl?.classList.remove('selected');
  };

  // @ts-ignore
  const handleSelect = async (ev: MouseEvent<HTMLButtonElement>) => {
    cleanSelected();
    const el = ev.target;
    if (el instanceof HTMLElement) {
      el.classList.add('selected');
    }

    const mark = el.dataset.mark;
    if (mark === Marks.X) {
      await dispatch(selectPlayer(mark));
    } else if (mark === Marks.O) {
      await dispatch(selectPlayer(mark));
    }
  };

  return (
    <div className="player-mark-container">
      <label className="player-mark">
        Select Player Mark. (Remember X plays first)
      </label>
      <div className="btn-selection-container">
        <button className="btn-x" onClick={handleSelect} data-mark="X">
          {Marks.X}
        </button>
        <button className="btn-o" onClick={handleSelect} data-mark="O">
          {Marks.O}
        </button>
      </div>
    </div>
  );
};

export default PlayerMarkSelectionComponent;

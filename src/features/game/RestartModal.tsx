import './restart.scss';
import { toggleRestartPrompt, reset } from './gameSlice';
import { useAppDispatch } from '../../app/hooks';

const RestartModal = () => {
  const dispatch = useAppDispatch();
  const handleCancel = () => {
    dispatch(toggleRestartPrompt(false));
  };

  const handleRestart = () => {
    dispatch(reset());
  };

  return (
    <div className="restart-modal">
      <button className="btn-cancel" onClick={handleCancel}>
        Cancel
      </button>
      <button className="btn-quit" onClick={handleRestart}>
        Restart Game
      </button>
    </div>
  );
};

export default RestartModal;

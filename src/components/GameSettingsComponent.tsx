import GameSettingsModal from '../features/game/GameSettings';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { showGameSettings } from '../features/game/gameSlice';
import IconSettings from '../assets/settings.svg';

const GameSettingsComponent = () => {
  const gameSettings = useAppSelector((state) => state.history.gameSettings);
  const dispatch = useAppDispatch();

  // TODO: Implementation to be completed
  const handleGameSettings = () => {
    dispatch(showGameSettings(true));
  };
  return (
    <div>
      <button onClick={handleGameSettings}>
        <img src={IconSettings} className="game-settings" />
      </button>
      {gameSettings && <GameSettingsModal />}
    </div>
  );
};

export default GameSettingsComponent;

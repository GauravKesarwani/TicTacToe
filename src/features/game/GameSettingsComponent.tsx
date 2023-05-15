import ModalComponent from '../../components/ModalComponent';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { GameStates } from '../../utils/constants';
import { setStatus, showGameSettings } from './gameSlice';
import IconSettings from '../../assets/settings.svg';
import { resetGame } from '../board/boardSlice';

const GameSettingsComponent = () => {
  const gameSettings = useAppSelector((state) => state.app.gameSettings);
  const dispatch = useAppDispatch();

  const handleQuitGame = () => {
    // reset the board
    dispatch(resetGame());
    // set game status to NOT_STARTED
    dispatch(setStatus(GameStates.NOT_STARTED));
  };

  // TODO: Implementation to be completed
  const handleGameSettings = () => {
    dispatch(showGameSettings(true));
  };
  return (
    <div>
      <button onClick={handleGameSettings}>
        <img src={IconSettings} className="game-settings" />
      </button>
      {gameSettings && (
        <ModalComponent>
          <div className="settings-container">
            <button onClick={handleQuitGame}>Quit Game</button>
            <button>Play in History Mode</button>
            <button>Change Game level</button>
            <button>Cancel</button>
          </div>
        </ModalComponent>
      )}
    </div>
  );
};

export default GameSettingsComponent;

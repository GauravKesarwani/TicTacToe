import { useAppDispatch, useAppSelector } from '../../app/hooks';
import GameResetComponent from '../../components/GameResetComponent';
import GameSettingsComponent from '../../components/GameSettingsComponent';

// TODO: Make this import statement work. Why this doesn't work ?
// import IconRestart from "../../assets/reset.svg";

import './gameControls.scss';

const GameControls = () => {
  return (
    <>
      <div className="game-controls">
        <GameSettingsComponent />
        <GameResetComponent />
      </div>
    </>
  );
};

export default GameControls;

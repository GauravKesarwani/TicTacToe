import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setGameStatus, addMarkToBoard } from './gameSlice';
import { Opponents, GameStates } from '../../utils/constants';
import './gameHome.scss';
import OpponentSelectionComponent from '../../components/OpponentSelectionComponent';
import GameLevelSelectionComponent from '../../components/GameLevelSelectionComponent';
import PlayerMarkSelectionComponent from '../../components/PlayerMarkSelectionComponent';

const GameHome = () => {
  const dispatch = useAppDispatch();
  const cpuMark = useAppSelector((state) => state.history.cpuMark);
  const nextPlayer = useAppSelector((state) => state.history.nextPlayer);

  const startGame = () => {
    dispatch(setGameStatus(GameStates.INPROGRESS));

    /* If next player is cpu on game start, then play the first turn */
    if (nextPlayer === Opponents.CPU) {
      // @ts-ignore
      dispatch(addMarkToBoard({ i: -1, j: -1, cpuMark }));
    }
  };

  return (
    <>
      <OpponentSelectionComponent startGame={startGame} />
      <GameLevelSelectionComponent />
      <PlayerMarkSelectionComponent />
    </>
  );
};

export default GameHome;

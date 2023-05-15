import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { playTurn } from './boardSlice';
import { setStatus } from '../game/gameSlice';
import { Opponents, GameStates } from '../../utils/constants';
import './gameHome.scss';
import OpponentSelectionComponent from '../../components/OpponentSelectionComponent';
import GameLevelSelectionComponent from '../../components/GameLevelSelectionComponent';
import PlayerMarkSelectionComponent from '../../components/PlayerMarkSelectionComponent';

const GameHome = () => {
  const dispatch = useAppDispatch();
  const cpuMark = useAppSelector((state) => state.board.cpuMark);
  const currentPlayer = useAppSelector((state) => state.board.currentPlayer);

  const startGame = () => {
    dispatch(setStatus(GameStates.INPROGRESS));

    /* If next player is cpu on game start, then play the first turn */
    if (currentPlayer === Opponents.CPU) {
      // @ts-ignore
      dispatch(playTurn({ i: -1, j: -1, cpuMark }));
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

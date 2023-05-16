import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { playCPU } from './boardSlice';
import { setStatus, selectPlayer } from '../game/gameSlice';
import { Opponents, GameStates, Marks } from '../../utils/constants';
import './gameHome.scss';
import OpponentSelectionComponent from '../../components/OpponentSelectionComponent';
import GameLevelSelectionComponent from '../../components/GameLevelSelectionComponent';
import PlayerMarkSelectionComponent from '../../components/PlayerMarkSelectionComponent';

const GameHome = () => {
  const dispatch = useAppDispatch();
  const currentPlayer = useAppSelector((state) => state.board.currentPlayer);

  const startGame = () => {
    dispatch(setStatus(GameStates.INPROGRESS));

    /* If next player is cpu on game start, then play the first turn */
    if (currentPlayer === Opponents.CPU) {
      // @ts-ignore
      dispatch(playCPU());
    }
  };

  // A simple deviation in mark - 0 vs O combined with async can easily wasted an hour of yours.
  const handleMarkSelect = async (mark: Marks) => {
    if (mark === Marks.X) {
      await dispatch(selectPlayer(mark));
    } else if (mark === Marks.O) {
      await dispatch(selectPlayer(mark));
    }
  };

  return (
    <>
      <OpponentSelectionComponent startGame={startGame} />
      <GameLevelSelectionComponent />
      <PlayerMarkSelectionComponent onMarkSelection={handleMarkSelect} />
    </>
  );
};

export default GameHome;

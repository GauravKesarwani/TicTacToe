import { useAppSelector, useAppDispatch } from '../app/hooks';
import GameHome from './game/GameHome';
import PlayComponent from './game/PlayComponent';

import '../app.scss';
import { GameStates } from '../utils/constants';

export default function App() {
  // writing succinct code means less bytes in the javascript
  const gameStatus = useAppSelector((state) => state.history.gameStatus);

  // Somehow the board is being rendered twice.
  return (
    <div className="App">
      {gameStatus === GameStates.NOT_STARTED && <GameHome />}
      {gameStatus === GameStates.INPROGRESS && <PlayComponent />}
    </div>
  );
}

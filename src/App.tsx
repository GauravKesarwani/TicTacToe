import { useAppSelector } from './app/hooks';
import GameHome from './features/board/GameHome';
import PlayComponent from './features/board/PlayComponent';

import './app.scss';
import { GameStates } from './utils/constants';

export default function App() {
  // writing succinct code means less bytes in the javascript
  const gameStatus = useAppSelector((state) => state.app.status);

  return (
    <div className="App">
      {gameStatus === GameStates.NOT_STARTED && <GameHome />}
      {gameStatus === GameStates.INPROGRESS && <PlayComponent />}
    </div>
  );
}

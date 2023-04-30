import { useAppDispatch } from "../../app/hooks";
import "./gameSettings.scss";
import { showGameSettings, reset, setGameStatus } from "./gameSlice";

const GameSettings = () => {
    const dispatch = useAppDispatch();
    const handleQuitGame = () => {
        dispatch(setGameStatus("notStarted"));
    }
    return (
        <div className="settings-container">
            <button onClick={handleQuitGame}>Quit Game</button>
            <button>Play in History Mode</button>
            <button>Change Game level</button>
            <button>Cancel</button>
        </div>
    )
}

export default GameSettings;
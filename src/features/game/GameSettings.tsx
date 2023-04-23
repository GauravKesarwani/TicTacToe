import { useAppDispatch } from '../../app/hooks';
import { setOpponent, setPlayerMark } from './gameSlice';
import { marks } from "../../utils/constants";
import "./gameSettings.scss";

interface GameSettingProps {
    startGame: () => void;
}
const GameSettings = ({ startGame }: GameSettingProps) => {
    const dispatch = useAppDispatch();
    const cleanSelected = () => {
        const selectedEl = document.querySelector('.selected');
        selectedEl?.classList.remove('selected');
    }

    // @ts-ignore
    const handleXSelect = (ev: MouseEvent<HTMLButtonElement>) => {
        cleanSelected();
        const el = ev.target;
        if (el instanceof HTMLElement) {
            el.classList.add('selected');
        } 

        dispatch(setPlayerMark(marks.X));
    }

    // @ts-ignore
    const handleOSelect = (ev: MouseEvent<HTMLButtonElement>) => {
        cleanSelected();
        const el = ev.target;  // not always an HTML element.
        if (el instanceof HTMLElement) {
            el.classList.add('selected');
        }

        dispatch(setPlayerMark(marks.O));
    }

    const onSelectOpponent = (opponent: string) => {
        dispatch(setOpponent(opponent));
        startGame()
    }


    return (
        <>
            <div className="new-game-wrapper">
                <label>START NEW GAME</label>
                <button className="btn-cpu" onClick={() => onSelectOpponent("cpu")}>VS CPU</button>
                <button className="btn-player" onClick={() => onSelectOpponent("player")}>VS PLAYER</button>
            </div>
            <div>Select Player Mark. (Remember X plays first)</div>
            <div className="btn-selection-container">
                <button className="btn-x" onClick={handleXSelect}>X</button>
                <button className="btn-o" onClick={handleOSelect}>O</button>
            </div>
        </>
    )
}

export default GameSettings;

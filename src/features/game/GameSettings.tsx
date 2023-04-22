import { useAppDispatch } from '../../app/hooks';
import { setOpponent, setPlayerMark } from './gameSlice';
import { marks } from "../../utils/constants";

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
            <button onClick={() => onSelectOpponent("cpu")}>New Game(vs CPU)</button>
            <button onClick={() => onSelectOpponent("player")}>New Game(vs Player)</button>
            <div>Select Player Mark. (Remember X plays first)</div>
            <div>
                <button onClick={handleXSelect}>X</button>
                <button onClick={handleOSelect}>O</button>
            </div>
        </>
    )
}

export default GameSettings;

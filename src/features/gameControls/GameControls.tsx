import { update } from '../game/gameSlice';
import { useAppDispatch } from '../../app/hooks';

interface GameControlProps {
    removeWinningSquares: () => void;
}
const GameControls = ({ removeWinningSquares }: GameControlProps) => {
    const dispatch = useAppDispatch();
    const handleReset = () => {
        dispatch(update(0));
        removeWinningSquares();
    }
    return (
        <button onClick={handleReset}>Reset</button>
    )
}

export default GameControls;
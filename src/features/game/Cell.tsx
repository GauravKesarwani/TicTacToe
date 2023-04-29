import React from "react";
import "./cell.scss";
import { marks } from "../../utils/constants";
import IconXActive from "../../assets/x.svg";
import IconOActive from "../../assets/o.svg";
import IconXHover from "../../assets/xhover.svg";
import IconOHover from "../../assets/ohover.svg";

interface CellProps {
  row: number;
  col: number;
  value: string | null;
  nextTurn: string;
  nextPlayerMark: string;
  handleCellClick: (r: number, c: number) => void;
}

// semantic html
export const Cell = ({ row, col, value, nextTurn, nextPlayerMark, handleCellClick }: CellProps) => {
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    handleCellClick(row, col);
  };

  return (
    <div className="cell" data-id={`${row}${col}`} onClick={handleClick}>
      {value === null && nextPlayerMark === marks.X && <img className="mark-hover" src={IconXHover} alt="" />}
      {value === null && nextPlayerMark === marks.O && <img className="mark-hover" src={IconOHover} alt="" />}
      {value === marks.X && <img src={IconXActive} />}
      {value === marks.O && <img src={IconOActive} />}
    </div>
  );
};

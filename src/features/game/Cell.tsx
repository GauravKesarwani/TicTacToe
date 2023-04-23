import React from "react";
import "./cell.scss";

interface CellProps {
  row: number;
  col: number;
  value: string | null;
  handleCellClick: (r: number, c: number) => void;
}

// semantic html
export const Cell = ({ row, col, value, handleCellClick }: CellProps) => {
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    handleCellClick(row, col);
  };

  return (
    <div className="cell" data-id={`${row}${col}`} onClick={handleClick}>
      {value}
    </div>
  );
};

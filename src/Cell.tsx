import React from "react";

interface CellProps {
  row: number;
  col: number;
  value: string;
  handleCellClick: (i: number) => void;
}

// semantic html
export const Cell = ({ row, col, value, handleCellClick }: CellProps) => {
  // const [value, setCellValue] = useState("");

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const idx = row * 3 + col;
    // setCellValue(nextValue);
    handleCellClick(idx);
  };

  return (
    <div className="cell" data-id={`${row}${col}`} onClick={handleClick}>
      {value}
    </div>
  );
};

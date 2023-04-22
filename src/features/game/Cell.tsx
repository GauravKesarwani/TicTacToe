import React from "react";

interface CellProps {
  row: number;
  col: number;
  value: string | null;
  handleCellClick: (r: number, c: number) => void;
}

// semantic html
export const Cell = ({ row, col, value, handleCellClick }: CellProps) => {
  // const [value, setCellValue] = useState("");

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    // setCellValue(nextValue);
    handleCellClick(row, col);
  };

  return (
    <div className="cell" data-id={`${row}${col}`} onClick={handleClick}>
      {value}
    </div>
  );
};

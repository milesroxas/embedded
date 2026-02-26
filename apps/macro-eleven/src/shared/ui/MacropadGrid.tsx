import { MATRIX_LAYOUT, matrixToIndex } from "../../entities/key";

interface MacropadGridProps {
  renderKey: (index: number) => React.ReactNode;
}

export function MacropadGrid({ renderKey }: MacropadGridProps) {
  return (
    <div className="macropad-grid">
      {MATRIX_LAYOUT.map((row, rowIdx) => (
        <div key={rowIdx} className="macropad-row">
          {row.map((pos, colIdx) => {
            if (!pos) {
              return <div key={colIdx} className="macropad-cell empty" />;
            }
            const index = matrixToIndex(pos.row, pos.col);
            return (
              <div key={colIdx} className="macropad-cell">
                {renderKey(index)}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

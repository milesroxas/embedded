import { cn } from "../lib/utils";
import { MATRIX_LAYOUT, matrixToIndex } from "../../entities/key";

interface MacropadGridProps {
  renderKey: (index: number) => React.ReactNode;
  /** When true, cells fill available space (for overlay). Default: fixed 80×64 px cells. */
  fluid?: boolean;
  /** Renders content in the physical empty cell at [row 0, col 3] (where the knob sits). */
  renderEmpty?: () => React.ReactNode;
}

export function MacropadGrid({ renderKey, fluid, renderEmpty }: MacropadGridProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", fluid && "flex-1 min-h-0 min-w-0")}>
      {MATRIX_LAYOUT.map((row, rowIdx) => (
        <div key={rowIdx} className={cn("flex gap-1.5", fluid && "flex-1 min-h-0")}>
          {row.map((pos, colIdx) => {
            if (!pos) {
              return (
                <div
                  key={colIdx}
                  className={cn(
                    fluid ? "flex-1 min-w-0 min-h-0" : "w-20 h-16",
                    renderEmpty ? "flex items-center justify-center @container-[size]" : "invisible"
                  )}
                >
                  {renderEmpty?.()}
                </div>
              );
            }
            const index = matrixToIndex(pos.row, pos.col);
            return (
              <div
                key={colIdx}
                className={cn(fluid ? "flex-1 min-w-0 min-h-0" : "w-20 h-16")}
              >
                {renderKey(index)}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

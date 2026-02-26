interface KeyCellProps {
  index: number;
  pressed: boolean;
}

export function KeyCell({ index, pressed }: KeyCellProps) {
  return (
    <div className={`key-cell ${pressed ? "pressed" : ""}`}>
      {index}
    </div>
  );
}

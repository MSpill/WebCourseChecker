export default function ToggleGroupButton({ text, checked, style, onClick }) {
  return (
    <div
      className="toggleGroupButton"
      style={
        checked ? { ...style, backgroundColor: "rgb(220,255,220)" } : style
      }
      onClick={onClick}
    >
      <label>{text}</label>
    </div>
  );
}

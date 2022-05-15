import ToggleGroup from "./ToggleGroup";

export default function Course({ name, CRN }) {
  return (
    <div className="course">
      <div className="courseText">
        <h4>{name}</h4>
        <p>{"CRN: " + CRN}</p>
      </div>
    </div>
  );
}

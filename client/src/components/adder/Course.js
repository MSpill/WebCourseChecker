import ToggleGroup from "./ToggleGroup";

export default function Course({ name, CRN }) {
  return (
    <div className="course">
      <div className="courseText">
        <h3>{name}</h3>
        <p>{CRN}</p>
      </div>
      <ToggleGroup />
    </div>
  );
}

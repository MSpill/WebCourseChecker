import { FaTimes } from "react-icons/fa";

export default function Course({ name, CRN, onDelete }) {
  return (
    <div className="course">
      <div className="courseText">
        <h4>{name}</h4>
        <p>{"CRN: " + CRN}</p>
      </div>
      <div style={{ cursor: "pointer" }}>
        <FaTimes onClick={onDelete} />
      </div>
    </div>
  );
}

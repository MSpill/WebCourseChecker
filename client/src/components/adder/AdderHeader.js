export default function AdderHeader({ formOpen, setFormOpen }) {
  return (
    <div className="addHeader">
      <h2>Courses</h2>
      <button
        className="btn"
        style={{ backgroundColor: formOpen ? "red" : "green" }}
        onClick={() => setFormOpen(!formOpen)}
      >
        {formOpen ? "Cancel" : "Add"}
      </button>
    </div>
  );
}

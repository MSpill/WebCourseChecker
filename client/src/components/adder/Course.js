export default function Course({ name, CRN }) {
  return (
    <div className="course">
      <h3>{name}</h3>
      <p>{CRN}</p>
    </div>
  );
}

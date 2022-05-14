import AddCourseForm from "./adder/AddCourseForm";
import AdderHeader from "./adder/AdderHeader";
import CourseList from "./adder/CourseList";

export default function CourseAdder() {
  const courses = [
    {
      name: "DN",
      CRN: 123,
    },
    {
      name: "MAMA",
      CRN: 145,
    },
  ];

  return (
    <div className="adderContainer">
      <AdderHeader />
      <AddCourseForm />
      <CourseList courses={courses} />
    </div>
  );
}

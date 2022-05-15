import { useState } from "react";
import ToggleGroupButton from "./ToggleGroupButton";

export default function ToggleGroup() {
  const [values, setValues] = useState([
    { text: "Seats", value: true },
    { text: "WL Seats", value: false },
    { text: "Mjr Restrictions", value: false },
  ]);

  return (
    <div className="toggleGroup">
      {values.map((val, index) => (
        <ToggleGroupButton
          checked={val.value}
          text={val.text}
          className="toggleGroupButton"
          style={
            index === 0
              ? { borderTopLeftRadius: "5px", borderBottomLeftRadius: "5px" }
              : index === values.length - 1
              ? { borderTopRightRadius: "5px", borderBottomRightRadius: "5px" }
              : {}
          }
          onClick={() => {
            let newValues = values.slice();
            newValues[index].value = !values[index].value;
            setValues(newValues);
          }}
          key={index}
        />
      ))}
    </div>
  );
}

import React, { useState } from "react";
import "./styles.css";

const SwitchOptions = {
  OPTION1: "Option 1",
  OPTION2: "Option 2"
};

export default function Switch() {
  const [activeOption, setActiveOption] = useState(SwitchOptions.OPTION1);

  const handleSwitchClick = (option) => {
    setActiveOption(option);
  };

  return (
    
      <div className="SwitchContainer">
        <div
          className="ToggleItem"
          style={{
            backgroundColor:
              activeOption === SwitchOptions.OPTION1 ? "grey" : "transparent"
          }}
          onClick={() => handleSwitchClick(SwitchOptions.OPTION1)}
        >
          <div className={"Text"}>Option 1</div>
        </div>
        <div
          className="ToggleItem"
          style={{
            backgroundColor:
              activeOption === SwitchOptions.OPTION2 ? "grey" : "transparent"
          }}
          onClick={() => handleSwitchClick(SwitchOptions.OPTION2)}
        >
          <div className={"Text"}>Option 2</div>
        </div>
      </div>
  );
}

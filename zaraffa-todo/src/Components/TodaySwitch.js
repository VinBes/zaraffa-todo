import React from "react";
import "../today.css";

import { useState } from "react";

const TodaySwitch = () => {
  const [today, setToday] = useState(true);

  return (
    <>
      <label className="todaySwitch">
        <input
          type="checkbox"
          checked={today}
          onChange={() => {
            setToday(!today);
            console.log(today);
          }}
        />
        <span className={"todaySlider"} />
      </label>
    </>
  );
};

export default TodaySwitch;

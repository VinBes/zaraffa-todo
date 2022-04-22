import React from "react";
import "../today.css";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { TodaySwitch } from "../Redux/todos/actions";

import { Container, Row, Col } from "react-bootstrap";
import { Prev } from "react-bootstrap/esm/PageItem";

const TodaySwitchComp = () => {
  const [today, setToday] = useState(true);
  const dispatch = useDispatch();

  const flipSwitch = () => {
    setToday((prev) => !prev);
    // dispatching the opposite of today, since the checkbox is inversed and when its unchecked its actually set to today
    // Fix would be to make the checkbox be checked if today is true, currently unchecked is true... causing the confusion.
    dispatch(TodaySwitch(!today));
  };

  return (
    <>
      <Container>
        <Row>
          <Col>{today ? <span className="todayState">Today</span> : null}</Col>
          <Col>
            <label className="todaySwitch">
              <input
                type="checkbox"
                checked={!today}
                onChange={() => {
                  flipSwitch();
                }}
              />
              <span className={"todaySlider"} />
            </label>
          </Col>
          <Col>
            {today ? null : <span className="todayState">Tomorrow</span>}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default TodaySwitchComp;

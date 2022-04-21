import React from "react";
import "../today.css";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { TodaySwitch } from "../Redux/todos/actions";

import { Container, Row, Col } from "react-bootstrap";

const TodaySwitchComp = () => {
  const [today, setToday] = useState(true);
  const dispatch = useDispatch();

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
                  dispatch(TodaySwitch(today));
                  setToday(!today);
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

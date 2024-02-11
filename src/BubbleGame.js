import React, { useEffect, useState } from "react";
import "./BubbleGame.css";

// Timer component responsible for timer logic
const Timer = ({ initialTime, setTimeOver }) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    const timerInt = setInterval(() => {
      if (time > 0) {
        setTime((prevTime) => prevTime - 1);
      } else {
        clearInterval(timerInt);
        setTimeOver(time);
      }
    }, 1000);
    return () => clearInterval(timerInt);
  }, [time, initialTime]);

  return <button>{time}</button>;
};

const BubbleGame = () => {
  const num = 140;
  const elem = Array.from({ length: num }, (_, index) => ({
    key: index,
    value: Math.floor(Math.random() * 10),
  }));

  const [timeOver, setTimeOver] = useState(60);
  const hitNum = Math.floor(Math.random() * 10);
  const [score, setScore] = useState(0);

  const matchHandler = (elem) => {
    if (hitNum === elem) {
      setScore(score + 10);
    } else {
      setScore(score - 5);
    }
  };
  return (
    <div className="BubbleContainer">
      <div className="topContainer">
        <div>
          <span>Hit </span>
          <button>{hitNum}</button>
        </div>
        <div>
          <span>Timer </span>
          {/* Use Timer component for the timer */}
          <Timer initialTime={60} setTimeOver={setTimeOver} />
        </div>
        <div>
          <span>Score </span>
          <button>{score}</button>
        </div>
      </div>

      <div className="bottomContainer">
        {timeOver !== 0 ? (
          elem.map((elem) => (
            <div
              className="circle"
              key={elem.key}
              onClick={() => {
                matchHandler(elem.value);
              }}
            >
              {elem.value}
            </div>
          ))
        ) : (
          <div className="gameOver">
            <div>
              <div>Game Over!</div>
              <div>Your Score is {score}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BubbleGame;

import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

/*
let timer; 
this timer instace will be shared accross 
all the instances of this component.
instead of that, use refs 
*/

export default function TimerChallenge({title, targetTime}){
    const timer = useRef(); 
    const dialog = useRef();
    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
    //const [timerStarted, setTimerStarted] = useState(false);
    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime *1000;
    if(timeRemaining <= 0) {
      clearInterval(timer.current);
      setTimeRemaining(targetTime * 1000);
      dialog.current.open();
    }
    function handleStart(){
        timer.current = setInterval(() => {
          setTimeRemaining(prevTime => prevTime -10);
        }, 10);
    }

    function handleStop(){
        clearInterval(timer.current);
    }

    return (
    <>
    <ResultModal ref={dialog} targetTime={targetTime} result="lost"/>
    <section className="challenge">
      <h2>{title}</h2>
      {timerExpired && <p>You Lost!</p>}
      <p className="challenge-time">
        {targetTime} second{targetTime >1 ? 's': ''}
      </p>
      <p>
        <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? 'Stop': 'Start'} Challenge
        </button>
      </p>
      <p className={timerIsActive ? 'active' : undefined}>
         {timerIsActive ? 'Time is running...': 'Timer inactive'}
      </p>
    </section>
    </>
    );
}
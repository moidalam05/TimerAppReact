import React, { useState } from 'react'
import timer from '../assets/Timer.svg'
import icon from '../assets/icon.jpg'
import running from "../assets/running.gif"

let interval = null;

const Timer = () => {
    const [time, setTime] = useState({ second: 0, minute: 0, hour: 0 });
    const [isActive, setIsActive] = useState(false);
    const [isRunning, setIsRunning] = useState(icon);

    function startTimer() {
        if (!isActive) {
            setIsActive(true);
            setIsRunning(running);
            interval = setInterval(() => {
                setTime((prevTime) => {
                    let newSecond = prevTime.second + 1;
                    let newMinute = prevTime.minute;
                    let newHour = prevTime.hour;

                    if (newSecond === 60) {
                        newSecond = 0;
                        newMinute += 1;
                    }
                    if (newMinute === 60) {
                        newMinute = 0;
                        newHour += 1;
                    }

                    return { second: newSecond, minute: newMinute, hour: newHour };
                });
            }, 1000);
        }
    }

    function stopTimer() {
        setIsActive(false);
        clearInterval(interval);
        setIsRunning(icon);
    }

    function clearTimer() {
        stopTimer();
        setTime({ second: 0, minute: 0, hour: 0 });
        setIsRunning(icon);
    }

    return (
        <div className='w-3/4 flex justify-center items-center bg-slate-500 p-10 gap-10 rounded-lg shadow-lg text-white'>
            <div>
                <img src={timer} alt="timer" className='min-h-full h-[75%] ' />
            </div>
            <div>
                <div className='flex justify-center flex-col items-center'>
                    <div className='border-2 border-slate-400 h-72 w-72 flex justify-center items-center rounded-full flex-col'>
                        <div className='w-28 h-28 rounded-3xl overflow-hidden mb-6'>
                            <img src={isRunning} alt="icon" />
                        </div>
                        <h1 className='text-4xl font-bold'>
                            {time.hour < 10 ? `0${time.hour}` : time.hour}:
                            {time.minute < 10 ? `0${time.minute}` : time.minute}:
                            {time.second < 10 ? `0${time.second}` : time.second}
                        </h1>
                    </div>
                    <div className='flex gap-6 mt-10'>
                        <button onClick={startTimer} className='bg-slate-400 transition-transform duration-150 text-white cursor-pointer font-bold py-2 px-10 rounded active:scale-95'>Start</button>
                        <button onClick={stopTimer} className='bg-slate-400 transition-transform duration-150 text-white cursor-pointer font-bold py-2 px-10 rounded active:scale-95'>Stop</button>
                        <button onClick={clearTimer} className='bg-slate-400 transition-transform duration-150 text-white cursor-pointer font-bold py-2 px-10 rounded active:scale-95'>Reset</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Timer


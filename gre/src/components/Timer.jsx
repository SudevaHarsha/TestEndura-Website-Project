"use client"

import React, { useState, useEffect } from 'react';

const TimerClock = ({ TestDuration, onTimeout }) => {
    const [sessionStarted, setSessionStarted] = useState(false);
    const [sessionExpired, setSessionExpired] = useState(false);
    const [minutes, setMinutes] = useState(null);
    const [seconds, setSeconds] = useState(null);

    const date = new Date();
    date.setHours(19, 45, 0, 0); // Set the time to 11:00 PM

    useEffect(() => {
        const countDownTime = date.getTime() + TestDuration * 1000;

        const timer = setInterval(() => {
            const now = new Date();
            const distance = countDownTime - now.getTime();

            const remainingMinutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const remainingSeconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (distance <= 0) {
                clearInterval(timer);
                setSessionExpired(true);
                onTimeout(); // Call the onTimeout callback
            } else {
                setSessionStarted(true);
                setMinutes(remainingMinutes);
                setSeconds(remainingSeconds);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [TestDuration, onTimeout]);

    return (
        <div>
            {sessionStarted && !sessionExpired ? (
                <div>
                    <p>Remaining time: {minutes} : {seconds}</p>
                </div>
            ) : sessionExpired ? (
                <div>
                    <p>Session expired</p>
                </div>
            ) : (
                <div>
                    <p>Timer not started yet</p>
                </div>
            )}
        </div>
    );
};

export default TimerClock;

'use client'

import React, { useState, useEffect } from 'react';

const Timer = ({ duration }) => {
    const [sessionStarted, setSessionStarted] = useState(false);
    const [sessionExpired, setSessionExpired] = useState(false);
    const [minutes, setMinutes] = useState(null);
    const [seconds, setSeconds] = useState(null);

    useEffect(() => {
        const countDownTime = Date.now() + duration * 1000;
        const timer = setInterval(() => {
            const now = new Date();
            const distance = countDownTime - now.getTime();

            const remainingMinutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const remainingSeconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (distance < 0) {
                clearInterval(timer);
                setSessionExpired(true);
                console.log("Countdown ended");
            } else {
                setSessionStarted(true);
                setMinutes(remainingMinutes);
                setSeconds(remainingSeconds);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [duration]);

    return (
        <div>
            {sessionStarted && !sessionExpired ? (
                <div>
                    <p>Remaining time: {minutes} minutes {seconds} seconds</p>
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

export default Timer;

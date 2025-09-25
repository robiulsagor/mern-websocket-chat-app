import { useEffect, useState } from "react";

function useCountdown(inital: number) {
    const [secondsLeft, setSecondsLeft] = useState(inital);

    useEffect(() => {
        if (secondsLeft <= 0) return; // stop timer when it reaches 0

        const interval = setInterval(() => {
            setSecondsLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(interval); // cleanup on unmount
    }, [secondsLeft]);

    const reset = () => setSecondsLeft(inital);

    return { secondsLeft, reset };
}

export default useCountdown;
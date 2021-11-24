import {useEffect, useState} from "react";
import {LinearProgress} from "@mui/material";

export default function ProgressLinear({timeout}: {timeout: number}){
    const [progress, setProgress] = useState(0);
    const interval = 200;

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if(oldProgress >= 100) {clearInterval(timer); return 100;}
                return oldProgress + (100 / (timeout / interval));
            });
        }, interval);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div className="w-full">
            <LinearProgress variant="determinate" value={progress} />
        </div>
    );
}
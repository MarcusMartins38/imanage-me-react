import { useEffect, useState } from "react";
import { cn } from "../lib/utils";
import axios from "axios";

export default function AdviceMessage({ className = "" }) {
    const [advice, setAdvice] = useState("");

    const getNewAdvice = async () => {
        setAdvice("");
        const { data } = await axios.get("https://api.adviceslip.com/advice");
        setAdvice(data.slip.advice);
    };

    useEffect(() => {
        getNewAdvice();
    }, []);

    return (
        <div
            className={cn(
                "card bg-neutral text-neutral-content w-96",
                className,
            )}
        >
            <div className="card-body items-center text-center">
                <h2 className="card-title">!Advice!</h2>
                <p className="font-medium">"{advice}"</p>
                <div className="card-actions justify-end">
                    <button
                        onClick={getNewAdvice}
                        className="btn btn-primary mt-4"
                    >
                        Another Advice
                    </button>
                </div>
            </div>
        </div>
    );
}

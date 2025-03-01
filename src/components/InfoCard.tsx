import React from "react";
import { cn } from "../lib/utils";

type InfoCardProps = {
    svg: React.ReactNode;
    title: string;
    description: string;
    color?: string;
    className?: string;
};

export default function InfoCard({
    svg,
    title,
    description,
    color = "#FFA688",
    className = "",
}: InfoCardProps) {
    return (
        <div
            className={cn(
                `h-96 flex flex-col items-center justify-center p-4 border border-solid border-4 border-[${color}] rounded-lg`,
                className,
            )}
        >
            {svg}

            <h3 className={`font-semibold text-[24px] my-4 text-[${color}]`}>
                {title}
            </h3>

            <p>{description}</p>
        </div>
    );
}

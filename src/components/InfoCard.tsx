import React from "react";

type InfoCardProps = {
    svg: React.ReactNode;
    title: string;
    description: string;
    color?: string;
};

export default function InfoCard({
    svg,
    title,
    description,
    color = "#FFA688",
}: InfoCardProps) {
    return (
        <div
            className={`w-72 h-96 flex flex-col items-center justify-center p-4 border border-solid border-4 border-[${color}] rounded-lg`}
        >
            {svg}

            <h3 className={`font-semibold text-[24px] my-4 text-[${color}]`}>
                {title}
            </h3>

            <p>{description}</p>
        </div>
    );
}

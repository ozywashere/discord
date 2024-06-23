"use client";
import React from 'react';
import {Tooltip, TooltipContent, TooltipTrigger, TooltipProvider} from "@/components/ui/tooltip";

interface ActionTooltipProps {
    label: string;
    children: React.ReactNode;
    side?: "left" | "right" | "top" | "bottom";
    align?: "start" | "center" | "end";

}

const ActionTooltip = ({label, children, align, side}: ActionTooltipProps) => {

    return (

        <TooltipProvider>
            <Tooltip delayDuration={50}>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent side={side} align={align}>
                 <p className="font-semibold text-sm capitalize">
                        {label.toLowerCase()}
                 </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>

    );
};

export default ActionTooltip;
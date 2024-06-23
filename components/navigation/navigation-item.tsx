"use client";
import Image from "next/image";
import {useRouter, useParams} from "next/navigation";
import {cn} from "@/lib/utils";
import ActionTooltip from "@/components/ui/action-tooltip";

import React from 'react';

interface NavigationItemProps {
    id: string;
    name: string;
    imageUrl: string;
}

const NavigationItem = ({id, name, imageUrl}: NavigationItemProps) => {
    const params = useParams();
    const router = useRouter();

    const onClick = () => {
        router.push(`/servers/${id}`);
    }
    return (
        <ActionTooltip
            label={name}
            align="center"
            side="right"
        >

            <button
                type="button"
                className="group relative flex items-center"
                onClick={onClick}
            >
                <div className={cn("absolute left-0 bg-primary rounded-r-full  transition-all w-[4px]",
                    params.serverId !== id && " group-hover:h-[20px]",
                    params.serverId === id ? "h-[36px]" : "h-[8px]")}/>

                <div
                    className={cn("relative group flex mx-3 w-[48px] h-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
                        params?.serverId === id && "bg-primary/10 text-primary rounded-[16px]"
                    )}>
                    <Image src={imageUrl} alt={name}
                           fill
                           />
                </div>
            </button>
        </ActionTooltip>
    );
};

export default NavigationItem;
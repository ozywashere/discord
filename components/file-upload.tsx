"use client";

import {X} from "lucide-react";
import {UploadDropzone} from "@/lib/uploadingthing";
import Image from "next/image";


interface FileUploadProps {
    onChange: (url?: string) => void;
    value: string;
    endpoint: "messageFile" | "serverImage";

}

const FileUpload = ({
                        onChange,
                        value,
                        endpoint
                    }: FileUploadProps) => {


    const fileType = value?.split(".").pop();

    if (value && fileType !== "pdf") {
        return (
            <div className="w-20 h-20 relative">
                <Image src={value} alt="uploaded file"
                     fill
                     className="rounded-full"/>
                <button
                    className="absolute top-0 right-0 p-1 bg-rose-500 rounded-full text-white"
                    onClick={() => onChange("")}
                >
                    <X className="w-4 h-4"/>
                </button>
            </div>
        );
    }
    return (
        <UploadDropzone
            className="text-slate-500 border-0   bg-slate-100/50"

            endpoint={endpoint}

            onClientUploadComplete={(res: any) => {
                onChange(res?.[0].url);
            }}
            onUploadError={(error) => {
                window.alert(`${error?.message}`);
            }}


        />

    );
};

export default FileUpload;
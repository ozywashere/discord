"use client"
import axios from "axios";
import {useState, useEffect} from "react";
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"


import {
    Dialog,
    DialogDescription,
    DialogTitle,
    DialogFooter,
    DialogHeader,
    DialogContent
} from "@/components/ui/dialog";


import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import FileUpload from "@/components/file-upload";
import {useRouter} from "next/navigation";

const formSchema = z.object({
    name: z.string().min(1, {message: "Server name is required"}),
    imageUrl: z.string().min(1, {message: "Server image is required"})
})

const InitialModal = () => {
    const router=useRouter();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            imageUrl: ""
        }
    })
    const isLoading = form.formState.isSubmitting;

    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            axios.post("/api/servers", values).then(() => {
                form.reset();
                router.refresh();
                window.location.reload();
            });
        } catch (error) {
            console.error(error);
        }
    }


    const [isMounted, setIsMounted] = useState<boolean | null>(false);

    useEffect(() => {
        setIsMounted(true);

    }, []);

    if (!isMounted) return null;


    return (
        <Dialog open>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">Customize your server</DialogTitle>
                    <DialogDescription className="text-cente text-zinc-500">Give your server personality with a name and
                        and image.You can always change it later</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            <div className="flex items-center justify-center text-center w-full">
                                <FormField
                                    label="Server Image"
                                    name="imageUrl"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormControl>
                                                <FileUpload
                                                    onChange={field.onChange} endpoint="serverImage" value={field.value}
                                                />

                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                label="Server Name"
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel
                                            className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">Server
                                            Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                className="bg-zinc-300/50 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-primary-500 focus-visible:ring-opacity-50"
                                                placeholder="Enter server name"
                                                {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}


                            />

                        </div>
                        <DialogFooter className="px-6 py-4 bg-gray-100 ">
                            <Button variant="primary"
                                    type="submit"
                                    loading={isLoading}>Create Server</Button>
                        </DialogFooter>
                    </form>

                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default InitialModal;
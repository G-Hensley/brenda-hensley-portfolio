import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form";
import { Electrolize, Share_Tech_Mono } from "next/font/google";

const electrolize = Electrolize({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-electrolize',
});

const shareTechMono = Share_Tech_Mono({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-share-tech-mono',
});

export default function ContactModal( {isOpen, setIsOpen}: {isOpen: boolean, setIsOpen: (isOpen: boolean) => void} ) {

  const form = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const onSubmit = (data: FieldValues) => {
    console.log(data);
    setIsOpen(false);
  }

  return (
    isOpen && (
      <div className="fixed top-0 left-0 w-full h-full bg-black/90 flex items-center justify-center z-50">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="bg-zinc-950 rounded-lg p-8 w-84 contact-form flex flex-col gap-2">
            <p className={`text-green-500 text-2xl text-center ${electrolize.className}`}>Contact Me</p>
            <FormItem>
              <FormLabel className={`text-green-700 text-base left-1 top-2 relative ${shareTechMono.className}`}
                >
                  Name
              </FormLabel>
              <FormControl>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <Input className="py-4 px-2 text-base text-green-500 border-green-950 bg-green-950/10 focus:border-green-500 focus:bg-green-950/20 focus:outline-none" 
                  type="text" 
                  placeholder="Your Name" 
                {...field} 
                />
              )}
            />
          </FormControl>
            <FormMessage />
              </FormItem>
              <FormItem>
              <FormLabel className={`text-green-700 text-base left-1 top-2 relative ${shareTechMono.className}`}
                >
                  Email
              </FormLabel>
              <FormControl>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <Input className="py-4 px-2 text-base text-green-500 border-green-950 bg-green-950/10 focus:border-green-500 focus:bg-green-950/20 focus:outline-none" 
                  type="text" 
                  placeholder="Your Email" 
                {...field} 
                />
              )}
            />
          </FormControl>
            <FormMessage />
              </FormItem>
              <FormItem>
              <FormLabel className={`text-green-700 text-base left-1 top-2 relative ${shareTechMono.className}`}
                >
                  Message
              </FormLabel>
              <FormControl>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <Textarea className="resize-none p-2 text-base text-green-500 focus:border border-green-950 bg-green-950/10 focus:border-green-500 focus:bg-green-950/20 focus:outline-none" 
                  placeholder="Your Message" 
                {...field} 
                />
              )}
            />
          </FormControl>
          <FormMessage />
              </FormItem>
              <Button type="submit" className="w-fit mx-auto py-4 text-green-500 border border-green-950 bg-green-950/10 focus:border-green-500 focus:bg-green-950/20 focus:outline-none cursor-pointer mt-4">SEND</Button>
          </form>
        </Form>
      </div>
    )
  )

}
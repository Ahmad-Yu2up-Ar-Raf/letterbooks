"use client";

import { Link } from "@inertiajs/react";
import { cn } from "@/lib/utils";
import { useLottie } from "lottie-react";
import * as React from "react";

import animationData from "@/config/assets/animations/Phoenix.json";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChevronLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/fragments/shadcn-ui/card";
type AuthLayoutProps = {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  quote?: string;
  loading?: boolean;
  className?: string;
  numberOfIterations?: number;
  formType?: "login" | "register";
};

const AuthLayoutTemplate = ({
  formType,
  numberOfIterations,
  className,
  loading = false,
  title = `Selamat Datang`,
  quote = `Gagasmu bukan cuma wacana — jadikan aksi.`,
  description = `Perjalanan akan segera dimulai `,
  ...props
}: AuthLayoutProps) => {
  const formTypeLabel = formType == "register" ? "login" : "register";
  const formTypeLink = formType == "register" ? "login" : "register";
    
      const lottieOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      };
      const style = { width:  "100%", height: "100%" , margin: "auto"  , }; // atur sesuai kebutuhan
   const { View } = useLottie(lottieOptions, style);
      const isMobile = useIsMobile()
  return (
    <>
   
          <Card
          className={cn(
            "p-8 shadow-none border-0 justify-center items-center min-h-n  lg:m-auto h-full content-center relative bg-background z-[100] text-secondary-foreground overflow-visible ",
            className
          )}>
             <nav
      
      
              className='z-[999999]  left-7  absolute  top-4 bg-background/95 backdrop-blur   flex items-center   '>
      
              <Link href="/" className={cn(buttonVariants({ variant: "link" }), '  flex   has-[>svg]:px-0   w-fit py-2 md:flex  text-base items-center gap-3 px-0  group transition-colors')}>
                <ChevronLeft className=" size-5  group-hover:-translate-x-1  group-hover:transform transition-all ease-out duration-300" />
                <span className=''>Back </span>
              </Link>
              
            </nav>
          <CardContent className=" p-0 justify-center  w-full  max-w-sm flex m-auto flex-col h-full">
            <CardHeader className="flex w-full text-center flex-col  p-0   items-left mb-7">
             
             <div className=" m-auto  w-50 h-42 ">
              {  View}
              </div> 

         
          

              <CardTitle className=" text-xl w-full lg:text-2xl mt-6  font-medium  tracking-tight">
                {title}
              </CardTitle>
              <CardDescription className=" w-full line-clamp-1 text-sm opacity-80">{description}</CardDescription>
            </CardHeader>

           <CardAction className=" w-full">

            {props.children}
           </CardAction>

            {formType && (
              <CardFooter className="text-center cursor-target w-full  mt-2 text-muted-foreground text-sm">
                      <CardAction className=" text-center w-full">
                {formType == "register"
                  ? `Sudah punya akun? `
                  : "belum punya akun? "}
            

                <Link
                  aria-disabled={loading}
                  tabIndex={!loading ? -1 : undefined}
                  href={`/${formTypeLink}`}
                  className={cn(
                    "text-secondary-foreground capitalize font-medium underline",
                    loading
                      ? "pointer-events-none cursor-none text-foreground/50"
                      : ""
                  )}>
                  {formTypeLabel}
                </Link>
                  </CardAction>
              </CardFooter>
            )}
          </CardContent>
        </Card>
    {/* <div className=" relative  h-full flex items-center justify-center overflow-hidden ">
      <div
        className={cn(
          "  w-full relative max-w-lg  overflow-hidden flex flex-col  lg:flex-row shadow-xl lg:max-w-none h-lvh",
          className
        )}>
           <nav
      
      
              className='z-[999999]  left-7  absolute  top-4 bg-background/95 backdrop-blur   flex items-center   '>
      
              <Link href="/" className={cn(buttonVariants({ variant: "link" }), '  flex   has-[>svg]:px-0   w-fit py-2 md:flex  text-base items-center gap-3 px-0  group transition-colors')}>
                <ChevronLeft className=" size-5  group-hover:-translate-x-1  group-hover:transform transition-all ease-out duration-300" />
                <span className=''>Back </span>
              </Link>
              
            </nav>
   

       
      </div>
    </div> */}
    
    </>
  );
};

export default AuthLayoutTemplate;

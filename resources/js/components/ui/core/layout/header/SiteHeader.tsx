"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/fragments/shadcn-ui/avatar"
import React, { useState } from "react";
import { Bell, Book, Compass, Heart, House, LucideIcon, Menu, Search, ShoppingCart, Sunset, Trees, User, WandSparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/fragments/shadcn-ui/navigation-menu";



import { cn } from "@/lib/utils";
import { Link, router, usePage } from "@inertiajs/react";

import { Logo } from "@/components/ui/fragments/assets/svg/logo";
import { User as profile, type SharedData } from '@/types';
import { useMotionValueEvent, useScroll , motion} from "framer-motion";
import DropdownMenuUserMenuDemo from "./useProfile";

import { useModal } from "../providers/ContextProvider";


const TopMenu = [


  { name: "Trends", href: "#" },
  { name: "Explore", href: "/explore" },
  { name: "Blog", href: "#" },
];





export   function SiteHeader() {

const user = usePage<SharedData>().props.auth.user;


// const userWhishlist = usePage<SharedData>().props.whishlist;
// const userWhishlistCount = userWhishlist?.length;

    const { open } = useModal();
const onClick = () => open({ redirectTo: "/" });

     const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);
  const [delay, setDelay] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      const direction = current! - scrollYProgress.getPrevious()!;
    setDelay(false);
    
    if (scrollYProgress.get() < 0.18) {
      setVisible(false);
    } else {
      if (direction > 0) {
        setVisible(true);
      } 
    }
      
    }
  });



   return (
  <>


    <motion.nav 
    
    
       
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: delay ?  0. : 0.2,
          delay: delay ? 3 : 0,
        }}
    className={cn("w-full  px-5   hidden md:block py-4    md:backdrop-blur-none border-b-2 border-border/40 bg-background backdrop-blur-md fixed top-0 z-50  ", 

   

    )}>
        <main className="  max-w-[1190px] m-auto  justify-between md:flex ">
          <div className="flex items-center gap-6">
            <h1 className="text-xl font-bold flex items-center gap-3 ">
             <div className="size-10 sm:w-5 md:size-8 transition-transform duration-300 group-hover:scale-105 group-hover:brightness-110">
                            <Logo />
                          </div>
              <span className="">Letterbooks</span>
            </h1>
          </div>
              <div className="flex items-center text-xs ">
              <NavigationMenu className="relative text-xs z-[100]">
                <NavigationMenuList>
                  {TopMenu.map((menu, idx) => 
                     <NavigationMenuItem key={idx} className=" ">
                        <Link
                          className={navigationMenuTriggerStyle()}
                          href={menu.href}
                        >
                          {menu.name}
                        </Link>
                      </NavigationMenuItem>
                    
                 
                  )}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          <div className="items-center flex gap-5">

           
            <div className=" flex items-center gap-2 border-r-2 border-accent-foreground/30 pr-6">
  <Button variant={"ghost"} size={"icon"}>


   <Search className="size-5 text-accent-foreground/70 hover:text-primary cursor-pointer transition-all duration-300 ease-out " />
  </Button>
{/*   
 <CartProductsSheet  cartTotal={userCartTotal} cartCount={userCartCount}  cart={userCartData}/> */}
      {/* <Button variant={"ghost"} className=" relative" size={"icon"}>

         <Heart className="size-5 text-accent-foreground/70 hover:text-primary cursor-pointer transition-all duration-300 ease-out" />
            {  userWhishlistCount! > 0 &&(

         <span className={(" absolute bottom-[-0.2em] bg-primary rounded-full py-[1.8px] px-1.5  text-xs text-primary-foreground right-[-0.3em]")}>{userWhishlistCount}</span>
         )}
      </Button>
       */}
            </div>
            {user != null  ? ( 
              
              <>
              
  
              <DropdownMenuUserMenuDemo profile={user} />
              </>
            ) : (

             
   
             <Avatar onClick={onClick} className="  cursor-pointer">
  <AvatarImage src="assets/images/defaultProfile.webp" />
  <AvatarFallback className=" text-xs">US</AvatarFallback>
</Avatar>

               
            
            )}
          </div>
        </main>
 

        {/* Mobile Menu */}
      
      
    </motion.nav>
    <nav className="w-full  md:hidden   px-4  lg:px-0 py-2 md:py-0 md:bg-background/0  md:backdrop-blur-none border-b-2 border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-50 md:border-0 ">

     <div className="block md:hidden">
          <div className="flex items-center justify-between">
             <h1 className="text-lg font-bold flex items-center gap-3 ">
              <Logo className=" [&_svg]:size-9" />
              <span className="">Letterbooks</span>
            </h1>
          
          </div>
        </div> 
    </nav>
  </>




  );


 
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-xl p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";






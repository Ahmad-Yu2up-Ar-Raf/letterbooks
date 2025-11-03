import { cn } from '@/lib/utils'
import { router } from '@inertiajs/react'

import React from 'react'



type componentsProps = {
    isLast?  : boolean
    curentActive : number
}

function NavStepper({ isLast  , curentActive}: componentsProps) {
    const stepRegister: string[] = ["/register", "/register/password"  , "/register/location", "/register/occupasion" ,"/register/role"]

  return (
 <nav aria-label="Checkout Steps" className={cn("group pl-2 absolute bottom-5 right-1/2 left-1/2", isLast && "sr-only")}>
        <ol
          className="flex items-center w-full justify-center m-auto gap-2"
          aria-orientation="horizontal"
        >
          {stepRegister.map((step, index) => {
const active = index <= curentActive
              return(
                <React.Fragment key={index}>
                  <li  
       
                    className={cn(
                      "flex  rounded min-h-[0.5dvh] items-center gap-3 flex-shrink-0",
                      active ? "min-w-[2em] bg-primary" : "min-w-[1em] bg-primary/30"
                    )}
                  />
                </React.Fragment>
              )
          }
          )}
        </ol>
      </nav>
  )
}

export default NavStepper

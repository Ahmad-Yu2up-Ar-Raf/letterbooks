'use client';



import { AnimatePresence } from 'framer-motion';
import SiteFooter from '../header/SiteFooter';

import ReactLenis from 'lenis/react'




import { cn } from '@/lib/utils';


import { TooltipProvider } from '@/components/ui/tooltip';
import { ModalProvider } from './ContextProvider';
import Neslatter from '@/components/ui/fragments/custom-ui/Neslatter';
import SignInModal from '../../auth/SignInModal';
import { SiteHeader } from '../header/SiteHeader';
import { useIsMobile } from '@/hooks/use-mobile';



const Providers = ({ children }: { children: React.ReactNode  }) => {

const disable = [ '/seller' , '/settings',  '/dashboard' , '/login'  , '/register']
const currentPath = window.location.pathname;

   const isDisabled = disable.some(prefix => currentPath.startsWith(prefix))
 const isMobile = useIsMobile()
    return (


        <ReactLenis root>
            <ModalProvider>


                <AnimatePresence mode='wait'>
                 <TooltipProvider>

      <SignInModal/>
                {  !isDisabled  &&  !isMobile &&  (

                       <SiteHeader 
           
                        key="nav-content-header" 
                       />
                )}

               
                    <div 
                        key="main-content" 
                        className={cn("relative  min-h-dvh w-full overflow-hidden  content-center" ,

                          
                        )}
                    >
                        <div className={cn("mx-auto flex flex-col gap-13   lg:gap-25   h-full w-full", 



                        ) }>
                    
            {children}
              
                
                        </div>
                    </div>
                    
                           </TooltipProvider>
                </AnimatePresence>
    
                { !isDisabled  && (
<>

<Neslatter/>
   <SiteFooter/>
</>
                )}
             
          
            </ModalProvider>
        </ReactLenis>

    );
};

export default Providers;
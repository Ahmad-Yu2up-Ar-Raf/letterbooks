"use client"

import React, { useEffect} from 'react'
import AuthSimpleLayout from '@/layouts/auth/auth-simple-layout';
import LoginForms from '@/components/ui/core/auth/components/forms/login-form';


import { loginSchema, LoginSchema } from '@/lib/validations/auth';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';



import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/fragments/shadcn-ui/dialog"
import { useModal } from '../layout/providers/ContextProvider';
import { cn } from '@/lib/utils'
import { router } from '@inertiajs/react'
import AuthLayoutTemplate from '../layout/providers/auth/auth-simple-layout';


function SignInModal({ className }: { className?: string}) {

  const { isOpen, close, payload } = useModal();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);
 const [isPending, startTransition] = React.useTransition();
  const [loading, setLoading] = React.useState(false);  

 const form = useForm<LoginSchema> ({
        mode: "onSubmit", 
    defaultValues: {
       email: "",
       password: "",
       remember_token: false
      },
    resolver: zodResolver(loginSchema),
  })


  function onSubmit(input: LoginSchema ) {
    try {
          toast.loading("Login....", {id: "login"});
                setLoading(true)
        startTransition(async () => { 
     router.post(route('login.store'),  input, { 
         preserveScroll: true,
         preserveState: true,
         forceFormData: true, 
         onSuccess: () => {
           form.reset();
            
           toast.success("Login Succes", {id: "login"});
           setLoading(false);
         },
         onError: (error) => {
           console.error("Submit error:", error);
           toast.error(`Error: ${Object.values(error).join(', ')}` , {id: "login"});
           setLoading(false);
              form.reset();
         }
       });
        })
 
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }



  return (
        <Dialog    onOpenChange={close}  open={isOpen}  >
       
      <DialogContent 
  
        className={cn("max-h-[95lvh] overflow-hidden  w-full p-0  h-full lg:max-w-xl  lg:max-h-[40rem] justify-between border-0 ", className)}
      >
         <DialogHeader className=' sr-only'>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
            <AuthLayoutTemplate formType="login" loading={loading} title="Log in to your account" description="Enter your email and password below to log in" className=' h-full lg:max-w-[76em] min-h-0  [&_nav]:sr-only'>
         
  <LoginForms  form={form} onSubmit={onSubmit} isPending={loading}/>

            {status && <div className="mb-4 text-center text-sm font-medium text-yellow-600">{status}</div>}
        </AuthLayoutTemplate>
              
      </DialogContent>
    </Dialog>

  )
}

export default SignInModal

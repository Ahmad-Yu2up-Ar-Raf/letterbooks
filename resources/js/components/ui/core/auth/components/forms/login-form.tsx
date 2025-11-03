import React from 'react'
import { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/fragments/shadcn-ui/form"
import { Input } from '@/components/ui/fragments/shadcn-ui/input';
import { PasswordInput } from '@/components/ui/fragments/custom-ui/input/password-input';
import { Button } from '@/components/ui/fragments/shadcn-ui/button';
import { LoaderIcon } from 'lucide-react';
import { Checkbox } from '@/components/ui/fragments/shadcn-ui/checkbox';
import { Link } from '@inertiajs/react';
interface TaskFormProps<T extends FieldValues>
  extends Omit<React.ComponentPropsWithRef<"form">, "onSubmit"> {

  form: UseFormReturn<T>;
  onSubmit: (data: T) => void;
  isPending: boolean;


}



function LoginForms<T extends FieldValues>( {   
isPending,
form,
onSubmit
} : TaskFormProps<T>) {
  return (
 <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className=" mb-4 space-y-5  w-full mx-auto ">
        
        <FormField
        disabled={isPending}
          control={form.control}
           name={"email" as FieldPath<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                placeholder="email"
                
                type="email"
                {...field} />
              </FormControl>
              <FormDescription className=' sr-only'>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
         disabled={isPending}
          control={form.control}
    name={"password" as FieldPath<T>}
          render={({ field }) => (
            <FormItem 
            >
              <FormLabel className=' flex w-full justify-between'><span>Password</span> 
              <Link
              className=' underline text-muted-foreground hover:text-accent-foreground'
              href={'/forgot-password'}
              >Forgot Password?</Link></FormLabel>
              <FormControl>
                <PasswordInput placeholder="Placeholder" {...field} />
              </FormControl>
              <FormDescription className=' sr-only'>Enter your password.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
           <FormField
          control={form.control}
      name={"remember_token" as FieldPath<T>}
          render={({ field }) => (
            <FormItem className="flex cursor-pointer flex-row items-start space-x-2 space-y-0 rounded-xl ">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                   className='  cursor-pointer  border-accent-foreground/40'
                />
              </FormControl>
              <div className="space-y-1  cursor-pointer  leading-none">
                <FormLabel className='  cursor-pointer'>Remember me</FormLabel>
                <FormDescription className=' sr-only'>You can manage your mobile notifications in the mobile settings page.</FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
            <Button type="submit" className="mt-2 w-full cursor-pointer"  disabled={isPending}>
                                {isPending && <LoaderIcon className="h-4 w-4 animate-spin" />}
                                Log in
                            </Button>
</form>
</Form>
  )
}

export default LoginForms
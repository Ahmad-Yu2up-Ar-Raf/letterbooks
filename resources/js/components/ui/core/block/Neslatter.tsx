
import { Input } from '../../input'
import { Button } from '../../button'

import { Link } from '@inertiajs/react'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../card'

function Neslatter() {
  return (
    <section className=" container   py-20 sm:px-12 px-5   space-y-7">

<Card className="w-full     flex flex-col justify-center  rounded-xl bg-primary/20 relative md:py-15 py-10 md:text-center  m-auto  gap-6  ">
    {/* <MediaItem webViewLink='https://koro.imgix.net/media/5b/07/fc/1687174556/Newsletter-Background-Image.jpg'
    className=' absolute w-full h-full '
    /> */}
       <CardHeader className=" gap-3  md:justify-center m-auto w-full">
            <CardTitle className="text-4xl font-serif! leading-9 font-bold">
          Make Your Inbox Tasty
            </CardTitle>
            <CardDescription className="text-balance text-xs   font-medium   text-accent-foreground">
            Never Miss Out Again! Stay up to date with our newsletter from now on.
            </CardDescription>
          </CardHeader>
      <CardContent className="flex items-center md:justify-center   justify-start  col-span-2 px-4.5">
       
       

          <form  className="grid gap-8">
     
            <div className="flex w-full max-w-xs md:max-w-md md:m-auto items-center space-x-2">
              <Input
                type="email"
                placeholder="Emailaddres.@gmail.com"
                name="email"
                required
                className='  bg-background w-full   placeholder:text-xs'
              />
                   <CardAction>    
              <Button type="submit" className=' text-xs '>Subscribe</Button>
          </CardAction>
            </div>
          </form>
          {/* Display the alert based on alertVisible state */}
        
     
      </CardContent>
      <CardFooter className='  max-w-lg gap-3  md:justify-center m-auto w-full'>

            <p className="text-[10.5px] leading-3.5 text-accent-foreground">
  You hereby agree to receive our newsletter. Consent can be revoked at any time using, for example, the unsubscribe link in the newsletter. Find more information in our 
  
  
  <Link
  href={'/'}
  className='  text-muted-foreground underline'
  >
   {" "}  data protection information.
  </Link>
            </p>
      </CardFooter>

    </Card>
    </section>
  
  )
}

export default Neslatter

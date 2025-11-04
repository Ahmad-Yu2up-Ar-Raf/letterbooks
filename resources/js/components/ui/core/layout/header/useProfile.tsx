import { UserIcon, SettingsIcon, BellIcon, LogOutIcon, CreditCardIcon, LucideIcon, Store, ShoppingCart, LogOut } from 'lucide-react'


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,

  DropdownMenuTrigger
} from '@/components/ui/fragments/shadcn-ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/fragments/shadcn-ui/avatar"
import { useInitials } from '@/hooks/use-initials'
import { User, type SharedData } from '@/types';


import { Link, router } from '@inertiajs/react'
import { cn } from '@/lib/utils'
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';

interface DropdownMenuUserMenuDemoProps {
  label: string
  icon: LucideIcon
  href?: string
  onSelect?: () => void
}


interface groupItems {
   name: string
   dataGroup?: DropdownMenuUserMenuDemoProps[]
}

const DropdownMenuUserMenuDemo = ({ profile }: { profile : User}) => {

const user = profile
  const baseURL = "/profile"
const listItems : groupItems[] = [
  {
    name: "Profile",
    dataGroup: [
      { label: 'Profile', icon: UserIcon, href: `${baseURL}/user` },
      { label: 'Settings', icon: SettingsIcon, href: `${baseURL}/settings` },
    ]
  },
  // {
  //   name: "action",
  //   dataGroup: [
  //     { label: 'Cart', icon: ShoppingCart, href: `${baseURL}/cart` },
  //     { label: 'Notifications', icon: BellIcon, href: `${baseURL}/notifications` },
  //   ]
  // },

]
      const cleanup = useMobileNavigation();

    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };

    const useInitial = useInitials()
  




  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='  cursor-pointer'>
      <Avatar>
  <AvatarImage src={user.avatar}  alt={`${user.email}`} />
  <AvatarFallback>{useInitial(user.name)}</AvatarFallback>
</Avatar>
      </DropdownMenuTrigger>
  <DropdownMenuContent      className="w-[--radix-dropdown-menu-trigger-width]    "
  
  
     side={"bottom"}
            align="end"
            sideOffset={4}>
        <DropdownMenuLabel className='flex items-center gap-2'>
          <Avatar>
            <AvatarImage src={`${user.avatar}`} alt={`${user.email}`} />
            <AvatarFallback className='text-xs'>{useInitial(user.name)}</AvatarFallback>
          </Avatar>
          <div className='flex flex-1 flex-col'>
            <span className='text-popover-foreground'>{user.name}</span>
            <span className='text-muted-foreground text-xs'>{user.email}</span>
          </div>
        </DropdownMenuLabel>
        {listItems.map((group, index) => {
          

   
   return(
<div key={index}>
        <DropdownMenuSeparator   key={index}/> 

<>
        <DropdownMenuGroup key={index} >
  {  group.dataGroup?.map((item, i) => {
    return(
  
          <DropdownMenuItem key={i} >
          <Link href={item.href || '#'} className=' flex items-center gap-3  w-full h-full'>  
            <item.icon className={cn(" h-4 w-4")} />
            {item.label}
            </Link>
            </DropdownMenuItem>
       
      )
    })}  
    </DropdownMenuGroup>
</>
      
     
</div>
        )})}
       <DropdownMenuSeparator /> 
        {/* <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            {user.role === 'seller' ? (
                    <DropdownMenuItem>
                  <Link href={`/my-shop`} className=' w-full h-full'>  
                 My Shop
                 </Link>
                 </DropdownMenuItem>
            ) : (

              <DropdownMenuItem>
                  <Link href="${baseURL}/cart" className=' w-full h-full'>  
                 Cart
                 </Link>
                 </DropdownMenuItem>
            ) }
          </DropdownMenuSub>
               </DropdownMenuGroup>
                       <DropdownMenuSeparator /> */}
       <Link method="post" className=" w-full" href={('logout')} as="button" onClick={handleLogout}>
            <DropdownMenuItem>
              <LogOut />
              Log out
            </DropdownMenuItem>
              </Link>
          {/* <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuItem disabled>API</DropdownMenuItem> */}
   
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DropdownMenuUserMenuDemo

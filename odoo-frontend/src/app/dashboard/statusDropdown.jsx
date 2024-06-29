
'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useRouter } from 'next/navigation'

// const LABEL_MAP: Record<keyof typeof OrderStatus, string> = {
//   awaiting_shipment: 'Awaiting Shipment',
//   fulfilled: 'Fulfilled',
//   shipped: 'Shipped',
// }

const OrderStatus = { Awaiting_shipment: 'awaiting_shipment', Fulfilled: 'fulfilled', shipped: 'shipped' }




const StatusDropdown = ({
  id , orderStatus
}) => {
  const router = useRouter()

// 
  return (
    <DropdownMenu >
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          className='w-52 flex justify-between items-center'>
            {orderStatus}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-0'>
        {Object.keys(OrderStatus).map((status) => (
          <DropdownMenuItem
            key={status}
            className={cn(
              'flex text-sm gap-1 items-center p-2.5 cursor-default hover:bg-zinc-100',
              {
                'bg-zinc-100': orderStatus === status,
              }
            )}
            onClick={() => {}}>
            <Check
              className={cn(
                'mr-2 h-4 w-4 text-primary',
                orderStatus === status ? 'opacity-100' : 'opacity-0'
              )}
            />

            {status}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default StatusDropdown

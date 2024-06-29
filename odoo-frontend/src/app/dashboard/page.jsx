"use client"
import React, { useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card'
  import { Progress } from '@/components/ui/progress'
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table'
import StatusDropdown from './statusDropdown'
import withAuth from '@/hoc/withAuth'

  const orders = [
    {
      id: 1,
      amount: 100,
      status: 'pending',
      createdAt: new Date(),
        shippingAddress: {
            name: 'John Doe',
        },
        user: {
            email: '',
        }
    }
  ]

const Page = () => {
    const [position, setPosition] = useState('pending')
    const weeklyGoal = 200
    const lastWeekSum = 100
    const lastMonthSum = 459
    const monthlyGoal = 500



  return (
    <div className='flex min-h-screen w-full bg-muted/40'>
    <div className='max-w-7xl w-full mx-auto flex flex-col sm:gap-4 sm:py-4 py-20'>
        <h2 className=' text-3xl font-bold'>Dashboard</h2>
      <div className='flex flex-col gap-16'>
        <div className='grid gap-4 sm:grid-cols-2'>
          <Card>
            <CardHeader className='pb-2'>
              <CardDescription>Last Week</CardDescription>
              <CardTitle className='text-4xl'>
                    {lastWeekSum} <span>&#8377;</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-sm text-muted-foreground'>
                of {weeklyGoal} <span>&#8377;</span>  goal
              </div>
            </CardContent>
            <CardFooter>
              <Progress
                value={((lastWeekSum ?? 0) * 100) / weeklyGoal}
              />
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className='pb-2'>
              <CardDescription>Last Month</CardDescription>
              <CardTitle className='text-4xl'>
                {lastMonthSum?? 0} <span>&#8377;</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-sm text-muted-foreground'>
                of {lastMonthSum} <span>&#8377;</span> goal
              </div>
            </CardContent>
            <CardFooter>
              <Progress
                value={((lastMonthSum ?? 0) * 100) / monthlyGoal}
              />
            </CardFooter>
          </Card>
        </div>

        <h1 className='text-4xl font-bold tracking-tight'>Previous orders</h1>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead className='hidden sm:table-cell'>Status</TableHead>
              <TableHead className='hidden sm:table-cell'>
                Purchase date
              </TableHead>
              <TableHead className='text-right'>Amount</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} className='bg-accent'>
                <TableCell>
                  <div className='font-medium'>
                    {order.shippingAddress?.name}
                  </div>
                  <div className='hidden text-sm text-muted-foreground md:inline'>
                    {order.user.email}
                  </div>
                </TableCell>
                <TableCell className='hidden sm:table-cell'>
                  <StatusDropdown id={order.id} orderStatus={order.status} position={position} setPosition={setPosition} />
                </TableCell>
                <TableCell className='hidden md:table-cell'>
                  {order.createdAt.toLocaleDateString()}
                </TableCell>
                <TableCell className='text-right'>
                  {order.amount} <span>&#8377;</span>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  </div>
  )
}

export default withAuth(Page)
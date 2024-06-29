import { SearchIcon } from 'lucide-react'
import React from 'react'
import { Slider } from "@/components/ui/slider"
import { Popover, PopoverContent } from '@radix-ui/react-popover'
import { PopoverTrigger } from '@/components/ui/popover'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


const Search = ({ setSearch ,search,setPrice,price}) => {
  

  const onChange = (e) => {
    setPrice(e)
  }

  const onSearch = (e)=>{
    setSearch(e.target.value)
  }

  return (
    <div className=' w-full text-center flex justify-center py-5 items-center '>
      <SearchIcon size='15' className=' ' />

      <input type="text" className=' w-1/2 border-2 rounded-lg p-1 px-2' placeholder='  Search.' value={search} onChange={onSearch} />
      
      

      

      <Slider defaultValue={[50]} max={500} step={10} onValueChange = {onChange} className=" w-1/4 px-2" />
      Price Range : {price}



    </div>
  )
}

export default Search
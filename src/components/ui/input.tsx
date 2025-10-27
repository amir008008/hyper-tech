import * as React from 'react'
import { cn } from './utils'
export function Input({className,...p}: React.InputHTMLAttributes<HTMLInputElement>){
  return <input className={cn('h-9 px-3 rounded-md bg-white/5 text-white placeholder:text-white/40 outline-none',className)} {...p}/>
}

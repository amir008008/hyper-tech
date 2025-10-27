import * as React from 'react'
import { cn } from './utils'
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'outline'|'ghost' }
export function Button({ className, variant, ...props }: Props) {
  const base = 'px-3 py-2 text-sm rounded-md transition border border-transparent'
  const style = variant==='outline'
    ? 'bg-transparent border-white/20 hover:bg-white/10'
    : 'bg-white/10 hover:bg-white/20'
  return <button className={cn(base, style, className)} {...props} />
}

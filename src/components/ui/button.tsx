import * as React from 'react'
import { cn } from './utils'

type Size = 'sm' | 'md' | 'lg'
type Variant = 'outline' | 'ghost' | 'solid'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: Size
  variant?: Variant
}

export function Button({ className, size='md', variant='solid', ...props }: Props) {
  const base = 'rounded-md transition border border-transparent'
  const sizeCls =
    size === 'sm' ? 'px-3 py-1.5 text-sm' :
    size === 'lg' ? 'px-5 py-3 text-base' :
                    'px-4 py-2 text-sm'
  const style =
    variant === 'outline'
      ? 'bg-transparent border-white/20 hover:bg-white/10'
      : variant === 'ghost'
      ? 'bg-transparent hover:bg-white/10'
      : 'bg-white/10 hover:bg-white/20'
  return <button className={cn(base, sizeCls, style, className)} {...props} />
}

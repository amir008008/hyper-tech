import { cn } from './utils'
export function Badge({className,...p}: any){ return <span className={cn('px-2 py-0.5 text-xs rounded-full bg-white/10',className)} {...p}/> }

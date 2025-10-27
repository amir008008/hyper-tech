import { cn } from './utils'
export function Card({className, ...p}: any){ return <div className={cn('rounded-2xl border border-white/10 bg-white/5',className)} {...p}/> }
export function CardHeader({className,...p}: any){ return <div className={cn('p-4',className)} {...p}/> }
export function CardContent({className,...p}: any){ return <div className={cn('p-4 pt-0',className)} {...p}/> }
export function CardTitle({className,...p}: any){ return <div className={cn('font-semibold',className)} {...p}/> }

import type { LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const StatsBox = ({ title, value, icon }: Props) => {
    const LucideIcon = icon

    return (
        <Card className='hover:bg-zinc-100/5 cursor-default transform-gpu transition-all duration-300 ease-in-out'>
            <CardContent className='flex flex-row justify-between items-center px-6 py-4'>
                <div className='flex flex-col'>
                    <span className='bg-gradient-to-tr from-purple-300 to-primary text-transparent bg-clip-text font-bold text-4xl w-fit'>
                        {FormatNumber(Number(value))}
                    </span>
                    <span className='text-foreground text-sm'>{title}</span>
                </div>
                <LucideIcon
                    size={30}
                    className='text-foreground'
                />
            </CardContent>
        </Card>
    )
}

const FormatNumber = (number: number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')

interface Props {
    title: string
    value: string | number
    icon: LucideIcon
}

export default StatsBox
'use client';
import {Calendar as CalendarIcon} from 'lucide-react';
import * as React from 'react';

import dateRangeAtom from '@/atoms/shared/date-range';
import {Button} from '@/components/ui/button';
import {Calendar} from '@/components/ui/calendar';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {cn} from '@/lib/utils';
import dayjs from 'dayjs';
import {useAtom} from 'jotai';
import {DateRange} from 'react-day-picker';

export function DatePickerWithRange({className}: React.HTMLAttributes<HTMLDivElement>) {
	const [time, setTime] = useAtom(dateRangeAtom);

	const [date, setDate] = React.useState<DateRange | undefined>({
		from: time?.from,
		to: time?.to,
	});

	React.useEffect(() => {
		setTime({
			from: dayjs(date?.from).startOf('day').toDate(),
			to: dayjs(date?.to).endOf('day').toDate(),
		});
	}, [date, setTime]);

	return (
		<div className={cn('grid gap-2', className)}>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						id='date'
						variant={'outline'}
						className={cn('w-[300px] justify-start text-left font-normal', !date && 'text-muted-foreground')}>
						<CalendarIcon className='mr-2 h-4 w-4' />
						{date?.from ? (
							date.to ? (
								<>
									{dayjs(date.from).format('ddd DD MMM YYYY')} - {dayjs(date.to).format('ddd DD MMM YYYY')}
								</>
							) : (
								dayjs(date.from).format('ddd DD MMM YYYY')
							)
						) : (
							<span>Pick a date</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className='w-auto p-0' align='start'>
					<Calendar
						initialFocus
						mode='range'
						defaultMonth={date?.from}
						selected={date}
						onSelect={setDate}
						numberOfMonths={3}
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
}

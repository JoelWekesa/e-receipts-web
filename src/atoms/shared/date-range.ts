import dayjs from "dayjs";
import { atom } from "jotai";
import { DateRange } from "react-day-picker";
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
dayjs.extend(quarterOfYear);

const dateRangeAtom = atom<DateRange | undefined>({
    from: dayjs().startOf('Q').toDate(),
    to: dayjs().endOf('Q').toDate(),
})

export default dateRangeAtom;
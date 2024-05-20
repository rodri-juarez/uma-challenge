import {add, endOfMonth, format, getMonth, isFuture, isSameMonth, parse, startOfToday} from 'date-fns'
import {useState} from 'react'
import {getMonthQuery} from '../utils/getMonth'
import {useQuery} from '@tanstack/react-query'
import {CalendarDay} from '../types/calendar'

export default function useCalendar() {
  const today = startOfToday()
  const [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
  const firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', today)
  const [startDate, setStartDate] = useState<string>(format(firstDayCurrentMonth, 'yyyy-MM-dd'));
  const [endDate, setEndDate] = useState<string>(format(today, 'yyyy-MM-dd'));
  const [isCalendarAvailable, setIsCalendarAvailable] = useState(true)
  const [daySelected, setDaySelected] = useState<CalendarDay>();

  const {data, isError} = useQuery({queryKey: ['month', currentMonth], queryFn: () => getMonthQuery({month: currentMonth, startDate, endDate}), select: (data) => data.data, enabled: !!startDate && !!endDate && !!currentMonth && isCalendarAvailable})

  function previousMonth() {
    const firstDayPreviousMonth = add(firstDayCurrentMonth, {months: -1});
    setCurrentMonth(format(firstDayPreviousMonth, 'MMM-yyyy'))
    setStartDate(format(firstDayPreviousMonth, 'yyyy-MM-dd'));
    if (isFuture(add(firstDayCurrentMonth, {months: -1}))) {
      setIsCalendarAvailable(false);
      return;
    }
    setIsCalendarAvailable(true);
    if (isSameMonth(
      today,
      getMonth(firstDayPreviousMonth)
    )) {
      setEndDate(format(today, 'yyyy-MM-dd'))
    } else {
      setEndDate(format(endOfMonth(firstDayPreviousMonth), 'yyyy-MM-dd'))
    }
  }

  function nextMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, {months: 1});
    setCurrentMonth(() => format(firstDayNextMonth, 'MMM-yyyy'))
    setStartDate(format(firstDayNextMonth, 'yyyy-MM-dd'));
    if (isFuture(add(firstDayCurrentMonth, {months: 1}))) {
      setIsCalendarAvailable(false);
      return;
    }
    setIsCalendarAvailable(true);
    if (isSameMonth(
      today,
      getMonth(firstDayNextMonth)
    )) {
      setEndDate(format(today, 'yyyy-MM-dd'))
    } else {
      setEndDate(format(endOfMonth(firstDayNextMonth), 'yyyy-MM-dd'))
    }
  }


  return {
    data,
    isError,
    firstDayCurrentMonth,
    previousMonth,
    nextMonth,
    isCalendarAvailable,
    daySelected,
    setDaySelected,
    currentMonth
  }

}

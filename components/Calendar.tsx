'use client'

import {
  format,
} from 'date-fns'
import useModal from 'Shared/lib/hooks/useModal'
import useCalendar from 'Shared/lib/hooks/useCalendar'
import Day from './Day'
import {useState} from 'react'
import {CalendarDay} from 'Shared/lib/types/calendar'
import WeekHeader from './WeekHeader'
import MonthHeader from './MonthHeader'
import DayModal from './DayModal'

export default function Calendar() {
  const {isOpen, openModal, closeModal} = useModal();

  const {
    data,
    isError,
    firstDayCurrentMonth,
    previousMonth,
    nextMonth,
    isCalendarAvailable,
    daySelected,
    setDaySelected,
    currentMonth
  } = useCalendar()

  return (
    <div className={`relative h-full w-full flex justify-center items-center ${isOpen && 'bg-gray-400'}`}>
      {

        isOpen && daySelected ?

          <DayModal
            open={isOpen}
            closeModal={() => {
              closeModal();
            }}
            mediaType={daySelected.mediaType}
            imgUrl={daySelected.imgUrl}
            title={daySelected.title}
            description={daySelected.description}
            comments={daySelected.comments}
            month={currentMonth}
            date={daySelected.date}
          />
          :
          <div className="w-auto h-auto px-2">
            <MonthHeader month={format(firstDayCurrentMonth, 'MMMM yyyy')} nextMonth={nextMonth} previousMonth={previousMonth} />
            <WeekHeader />
            <div className="grid grid-cols-7 mt-2">
              {isCalendarAvailable && !isError ? data?.days.map((day: CalendarDay, dayIdx: number) => (
                <Day key={day.date} selectDay={setDaySelected} openModal={openModal} day={day} index={dayIdx} />
              )) :
                <div className="flex h-[18rem] text-2xl md:text-5xl col-span-7 items-center justify-center">
                  Calendar is not available yet
                </div>
              }
            </div>
          </div>
      }
    </div>
  )
}


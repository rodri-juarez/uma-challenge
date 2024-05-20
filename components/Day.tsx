import {format, getDay} from "date-fns";
import {CalendarDay} from "Shared/lib/types/calendar";
import {Dispatch, SetStateAction} from "react";

interface DayProps {
  openModal: () => void;
  selectDay: Dispatch<SetStateAction<CalendarDay | undefined>>;
  day: CalendarDay;
  index: number;

}

const Day = ({selectDay, openModal, day, index}: DayProps) => {

  const colStartClasses = [
    'col-start-1',
    'col-start-2',
    'col-start-3',
    'col-start-4',
    'col-start-5',
    'col-start-6',
    'col-start-7',
  ]

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <>
      <div
        className={classNames(
          index === 0 ? day.date && colStartClasses[getDay(day.date) + 1] : '',
          'w-12 h-12 md:w-24 md:h-24 lg:w-32 lg:h-32 m-2 flex justify-center items-center bg-red-300',
        )}
        style={{backgroundImage: `url(${day.mediaType === 'image' ? day.imgUrl : day.thumbnailUrl})`, backgroundSize: 'cover'}}
      >
        <button
          type="button"
          onClick={() => {
            selectDay(day);
            openModal();
          }}
          className="font-semibold flex-col mx-auto text-white text-xl flex h-full items-center justify-center w-full cursor-pointer overflow-hidden transition-opacity hover:opacity-90"
        >
          <div>
            {format(day.date.replace(/-/g, '\/'), 'd')}
          </div>
        </button>
      </div>
    </>
  )
}

export default Day

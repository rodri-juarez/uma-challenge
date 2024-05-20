import {format} from "date-fns";
import {ChevronLeftIcon} from '@heroicons/react/24/solid'
import {ChevronRightIcon} from '@heroicons/react/24/solid'

interface Props {
  month: string;
  nextMonth: () => void;
  previousMonth: () => void;
}

export default function MonthHeader({month, nextMonth, previousMonth}: Props) {
  return (
    <div className="flex items-center w-full">
      <h2 className="flex-auto font-semibold text-gray-900 text-2xl md:text-3xl">
        {month}
      </h2>
      <button
        type="button"
        onClick={previousMonth}
        className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
      >
        <span className="sr-only">Previous month</span>
        <ChevronLeftIcon color='black' className="w-5 h-5" aria-hidden="true" />
      </button>
      <button
        onClick={nextMonth}
        type="button"
        className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
      >
        <span className="sr-only">Next month</span>
        <ChevronRightIcon color='black' className="w-5 h-5" aria-hidden="true" />
      </button>
    </div>
  )
}

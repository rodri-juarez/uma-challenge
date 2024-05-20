export default function WeekHeader()  {
  return (
    <>
      <div className="md:hidden grid grid-cols-7 mt-10 text-sm leading-6 text-center text-gray-500 w-full">
        <div>S</div>
        <div>M</div>
        <div>T</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div>S</div>
      </div>
      <div className="hidden md:grid grid-cols-7 mt-10 text-md leading-6 text-center text-gray-500 w-full">
        <div>Sunday</div>
        <div>Monday</div>
        <div>Thursday</div>
        <div>Wednesday</div>
        <div>Tuesday</div>
        <div>Friday</div>
        <div>Saturday</div>
      </div>
    </>
  )
}

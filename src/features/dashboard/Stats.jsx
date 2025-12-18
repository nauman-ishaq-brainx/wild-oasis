import { HiAcademicCap, HiOutlineBriefcase, HiOutlineCalendar, HiOutlineChartBar } from "react-icons/hi";
import Stat from "./Stat";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";

export default function Stats({bookings, stays, confirmedStays, numDays, cabins}){

    const sales = bookings.reduce((acc, val)=>{return acc + val.totalPrice}, 0)
    const numNights = confirmedStays.reduce((acc, value)=>{return value.numNights + acc}, 0)
    const totalExpected = numDays * cabins.length

    const occupancy = Math.round((numNights / totalExpected ) * 100 )

    return (
        <>
        <Stat icon={<HiOutlineBriefcase />} title='Bookings' value={bookings.length} color='blue' />
        <Stat icon={<HiOutlineBanknotes />} title='Sales' value={sales} color='green' />
        <Stat icon={<HiOutlineCalendarDays />} title='Stays' value={confirmedStays.length} color='indigo' />
        <Stat icon={<HiOutlineChartBar />} title='Occupancy Rate' value={occupancy} color='yellow' />
        </>
    )
}
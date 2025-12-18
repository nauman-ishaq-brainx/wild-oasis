import styled from "styled-components";
import { useRecentBooking } from "./useRecentBooking";
import Spinner from '../../ui/Spinner'
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import { useCabins } from "../cabins/useCabins";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout(){
  const {bookings, isBookingLoading} = useRecentBooking();
  const {stays, isStaysLoading, confirmedStays, numDays} = useRecentStays();
  const {cabins, isLoading:isCabinsLoading} = useCabins();
  if (isBookingLoading || isStaysLoading || isCabinsLoading) return <Spinner />
  return <StyledDashboardLayout>
    <Stats stays={stays} bookings={bookings} confirmedStays={confirmedStays} numDays={numDays} cabins={cabins} />
  </StyledDashboardLayout>
}
import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useParams } from "react-router-dom";
import { useBookingDetails } from "../bookings/useBookingDetails";
import Spinner from "../../ui/Spinner";
import { useCheckin } from "./useCheckin";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useEffect, useState } from "react";
import useSettings from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const { checkin, isCheckingin } = useCheckin();
  const { booking, isPending, error } = useBookingDetails();
  const {setting, isPending:isLoadingSetting} = useSettings();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [includeBreakfast, setIncludeBreakfast] = useState(false);
  

  useEffect(() => {
    booking && booking.isPaid && setIsConfirmed(true);
  }, [booking]);
  if (isPending || isLoadingSetting) return <Spinner />;

  const optionalBreakFastPrice = includeBreakfast ? setting.breakfastPrice : 0;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  function handleCheckin() {
    if (!isConfirmed) return;

    if (includeBreakfast){
      checkin({bookingId, breakfast:{
        extrasPrice: optionalBreakFastPrice,
        totalPrice: totalPrice + optionalBreakFastPrice,
        hasBreakfast: true
      }})

    }
    else{

      checkin({bookingId});
    }

    
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {!hasBreakfast && <Box>
        <Checkbox
          checked={includeBreakfast}
          onChange={() => {setIncludeBreakfast(includeBreakfast=>!includeBreakfast)}}
          id="has-breakfast"
          disabled={isCheckingin}
        >
          Breakfast for {formatCurrency(setting.breakfastPrice)} ?
        </Checkbox>
      </Box>}
      <Box>
        <Checkbox
          checked={isConfirmed}
          onChange={() => {setIsConfirmed(confirmed=>!confirmed)}}
          id="checkin-confirmation"
          disabled={(booking.isPaid || isCheckingin) }
        >
          I confirm that I have received payment {isConfirmed} of {optionalBreakFastPrice ? formatCurrency(booking.totalPrice + optionalBreakFastPrice) : formatCurrency(booking.totalPrice)}
          { optionalBreakFastPrice ? `(${formatCurrency(booking.totalPrice)} + ${formatCurrency(optionalBreakFastPrice)})` : ''} from {booking.guests.fullName}.
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={isCheckingin || !isConfirmed}>Check in booking #{bookingId}</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;

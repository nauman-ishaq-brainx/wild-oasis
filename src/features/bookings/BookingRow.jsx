import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import { HiArrowUp, HiEye, HiTrash } from "react-icons/hi";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";


const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: gray;
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: gray;
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) {
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  const navigate = useNavigate();
  const {deleteBooking, isDeleting} = useDeleteBooking();
  const { checkout, isCheckingOut } = useCheckout();

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
      <Amount>{formatCurrency(totalPrice)}</Amount>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId}></Menus.Toggle>
          <Menus.List id={bookingId}>

              <Modal.Open opens="delete-booking-modal">
                <Menus.Button
                  icon={<HiTrash />}
                >
                  {" "}
                  Delete Booking
                </Menus.Button>
              </Modal.Open>
            <Menus.Button
              onClick={() => {
                navigate(`${bookingId}`);
              }}
              icon={<HiEye />}
            >
              See details
            </Menus.Button>
            {status === "checked-in" && (
              <Menus.Button
                onClick={() => {
                  checkout(bookingId);
                }}
                disabled={isCheckingOut}
                icon={<HiArrowUp />}
              >
                Check Out
              </Menus.Button>
            )}
          </Menus.List>

          {/* resourceName, onConfirm, disabled, onClose  */}
          <Modal.Window name="delete-booking-modal">
            <ConfirmDelete
              resourceName={"cabin"}
              onConfirm={() => {deleteBooking(bookingId)}}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Menus.Menu>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;

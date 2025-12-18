import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Modal from "../../ui/Modal";
import toast from "react-hot-toast";
import { useState } from "react";

import Row from "../../ui/Row";
import CreateCabinForm from "./CreateCabinForm";
import { HiDuplicate, HiPencil, HiTrash } from "react-icons/hi";
import useDeleteCabin from "./useDeleteCabin";
import useCreateCabin from "./useCreateCabin";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Button from "../../ui/Button";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

export default function CabinRow({ cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;
  const { isDeleting: cabinDeleting, deleteCabin } = useDeleteCabin(id);

  const { createNewCabin, isCreating } = useCreateCabin();
  function handleDuplicateCabin() {
    const { id, name, ...rest } = cabin;
    createNewCabin({ ...rest, name: `Copy of ${name}` });
  }
  return (
    <>
      <Table.Row>
        <Img src={cabin.image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{formatCurrency(discount)}</Discount>
        <Row type="horizontal">
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={id} />
              <Menus.List id={id}>
                <Menus.Button
                  icon={<HiDuplicate />}
                  onClick={handleDuplicateCabin}
                >
                  Duplicate
                </Menus.Button>
                <Modal.Open opens="cabin-delete">
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>

                <Modal.Open opens="edit-cabin">
                  <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                </Modal.Open>
                </Menus.List>
                
                
                <Modal.Window name="edit-cabin">
                  <CreateCabinForm cabinToEdit={cabin} />
                </Modal.Window>

                
                <Modal.Window name="cabin-delete">
                  <ConfirmDelete
                    resourceName={name}
                    onConfirm={() => {
                      deleteCabin(id);
                    }}
                    disabled={cabinDeleting}
                  />
                </Modal.Window>
            </Menus.Menu>
          </Modal>
        </Row>
      </Table.Row>

      {/* {isDeleting && (
        <Modal
          onClose={() => {
            setIsDeleting(false);
          }}
        >
          <ConfirmDelete
            onConfirm={() => {
              deleteCabin();
            }}
            resourceName={name}
            onClose={() => {
              setIsDeleting(false);
            }}
            disabled={cabinDeleting}
          />
        </Modal>
      )} */}
    </>
  );
}

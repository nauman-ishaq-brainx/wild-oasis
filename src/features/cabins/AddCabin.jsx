import { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

export default function AddCabin() {
  return (
    <>  
    <Modal name="create-cabin">
        <Modal.Open opens={"create-cabin"} >
          <Button>Add a new cabin</Button>
        </Modal.Open>
        <Modal.Window name='create-cabin'>
          <CreateCabinForm />
        </Modal.Window>
      </Modal>

      
    </>
  );
}

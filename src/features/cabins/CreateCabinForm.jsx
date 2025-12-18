import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";
import Row from "../../ui/Row";
import useCreateCabin from "./useCreateCabin";
import useEditCabin from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onClose }) {
  const { id, ...editData } = cabinToEdit;
  const IS_EDIT_SESSION = Boolean(id);

  const { register, handleSubmit, reset, formState, getValues } = useForm({
    defaultValues: IS_EDIT_SESSION ? editData : "",
  });
  const { isEditing, editCabin } = useEditCabin(id);
  const { isCreating, createNewCabin } = useCreateCabin();

  function onSubmit(data) {
    if (IS_EDIT_SESSION) {
      editCabin(
        {
          ...data,
          image: typeof data.image === "string" ? data.image : data.image[0],
        },
        {
          onSuccess: () => {
            reset();
            onClose?.();
          },
        }
      );
    } else {
      createNewCabin(
        { ...data, image: data.image[0] },
        {
          onSuccess: () => {
            reset();
            onClose()?.()
          },
        }
      );
    }
  }
  const isWorking = isEditing || isCreating;

  return (
    <Form type='modal' onSubmit={handleSubmit(onSubmit)}>
      <FormRow label={"Cabin name"} error={formState?.errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: { value: true, message: "This field can not be empty." },
          })}
        />
      </FormRow>
      <FormRow
        label={"Maximum capacity"}
        error={formState?.errors?.maxCapacity?.message}
      >
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: { value: true, message: "This field can not be empty." },
            min: { value: 1, message: "Capacity should be greater than 1." },
            max: {
              value: 99,
              message: "Maximum capacity can not be greater than 99",
            },
          })}
        />
      </FormRow>

      <FormRow
        label={"Regular price"}
        error={formState?.errors?.regularPrice?.message}
      >
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: { value: true, message: "This field can not be empty." },
          })}
        />
      </FormRow>

      <FormRow label={"Discount"} error={formState?.errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: { value: true, message: "This field can not be empty." },
            validate: (value) =>
              value <= getValues("regularPrice") ||
              "Discount can not be greater than regular price.",
          })}
        />
      </FormRow>

      <FormRow
        label={"Description for website"}
        error={formState?.errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description")}
        />
      </FormRow>

      <FormRow label={"Cabin photo"} error={formState?.errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: IS_EDIT_SESSION ? false : "Image is required",
            onChange: (e) => e.target.files,
          })}
        />
      </FormRow>
      <Row>
        <Button variation="secondary" type="reset" onClick={()=>{onClose?.()}}>
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {IS_EDIT_SESSION ? "Edit cabin" : "Create cabin"}
        </Button>
      </Row>
    </Form>
  );
}

export default CreateCabinForm;

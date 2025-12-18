import Form from '../../ui/Form';
import FormRow2 from '../../ui/FormRow';
import Input from '../../ui/Input';
import useSettings from './useSettings';
import Spinner from '../../ui/Spinner';
import useEditSetting from './useEditSetting';


function UpdateSettingsForm() {
  const {setting, error, isPending} = useSettings();
  const {updateSetting, isUpdating} = useEditSetting()

  function handleUpdate(value, column){
    updateSetting({[column]:value})
  }
  if (isPending) return <Spinner />
  return (
    <Form>
      <FormRow2 label='Minimum nights/booking'>
        <Input type='number' id='min-nights' defaultValue={setting.minimumBookingLength} onBlur={(e)=>{handleUpdate(e.target.value, 'minimumBookingLength')}} onKeyDown={(e)=>{if (e.key==='Enter'){
          handleUpdate(e.target.value,'minimumBookingLength' )
        }}}/>
      </FormRow2>
      <FormRow2 label='Maximum nights/booking'>
        <Input type='number' id='max-nights' defaultValue={setting.maxBookingLength} onBlur={(e)=>{handleUpdate(e.target.value, 'maxBookingLength')}} onKeyDown={(e)=>{if (e.key === 'Enter'){
          handleUpdate(e.target.value, 'maxBookingLength')
        }}}/>
      </FormRow2>
      <FormRow2 label='Maximum guests/booking'>
        <Input type='number' id='max-guests' defaultValue={setting.maxGuestsPerBooking} onBlur={(e)=>{handleUpdate(e.target.value, 'maxGuestsPerBooking')}} onKeyDown={(e)=>{if (e.key === 'Enter'){
          handleUpdate(e.target.value, 'maxGuestsPerBooking')
        }}}/>
      </FormRow2>
      <FormRow2 label='Breakfast price'>
        <Input type='number' id='breakfast-price' defaultValue={setting.breakfastPrice} onBlur={(e)=>{handleUpdate(e.target.value, 'breakfastPrice')}} onKeyDown={(e)=>{if (e.key === 'Enter'){
          handleUpdate(e.target.value, 'breakfastPrice')
        }}}/>
      </FormRow2>
    </Form>
  );
}

export default UpdateSettingsForm;

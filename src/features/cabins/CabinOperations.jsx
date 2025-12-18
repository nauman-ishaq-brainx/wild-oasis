import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

export default function CabinOperations(){
    return (
    
    <>
    <Filter filterField={'discount'} options={[
        {value: 'all', label:'All'},
        {value: 'no-discount', label:'No Discount'},
        {value: 'with-discount', label:'With Discount'},
    ]}/>
    <SortBy options={[
        {value: 'regularPrice-asc', label:'Price (lowest first)'},
        {value: 'regularPrice-desc', label:'Price (highest first)'},
        {value: 'discount-asc', label:'Discount (lowest first)'},
        {value: 'discount-desc', label:'Discount (highest first)'},
    ]}/>
    </>
    
)
}
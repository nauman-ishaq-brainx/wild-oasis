
import CabinTable from "../features/cabins/CabinTable";
import AddCabin from '../features/cabins/AddCabin'

import Modal from "../ui/Modal";
import CabinOperations from "../features/cabins/CabinOperations";
import SortBy from "../ui/SortBy";

function Cabins() {


  return (
    <>

    <CabinOperations />
    

          <CabinTable />
          <AddCabin />
    </>
  );
}

export default Cabins;

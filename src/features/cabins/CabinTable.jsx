import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getCabins } from "../../services/apiCabins";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import { useCabins } from "./useCabins";

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
//   width: 100%;
// `;

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;

export default function CabinTable() {
  const {cabins, isLoading, error} = useCabins();

  const [searchParams] = useSearchParams();
  if (isLoading) return <Spinner />;
  if (error) return null;
  const discountFilter = searchParams.get('discount') || 'all';
  const sortBy = searchParams.get('sortBy') || 'price-asc';
  let filteredCabins;
  // filter the cabins
  if (discountFilter === 'with-discount'){
    filteredCabins = cabins.filter(cabin=>{return cabin.discount > 0})
  }
  else if (discountFilter === 'no-discount'){

    filteredCabins = cabins.filter(cabin=>cabin.discount === 0)
  }
  else{
    filteredCabins = cabins;
  }


  // Sort the cabins

  const [sortValue, direction] = sortBy.split('-')
  const modifier = direction === 'asc' ? 1 : -1


  
  filteredCabins.sort((a, b)=>{ return (a[sortValue] - b[sortValue]) * modifier})
  
  
  return (
    <Menus>
      <Table columns={"0.6fr 1.8fr 2.2fr 1fr 1fr 1fr"}>
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          resource={filteredCabins}
          render={(cabin) => {
            return <CabinRow cabin={cabin} key={cabin.id} />;
          }}
        />
      </Table>
    </Menus>
  );
}

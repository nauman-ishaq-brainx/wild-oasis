import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import { getUser } from "../services/apiAuth";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export default function ProtectedComponent({ children }) {
    const navigate = useNavigate();
  const { data, isFetching } = useUser();
    useEffect(()=>{
        if (!isFetching && !data){

            navigate('/login')
        }
    }, [isFetching, data, navigate])
  if (isFetching) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }
  return children;
}

import styled from "styled-components";

export const ProjectTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const Button = styled.button`
  display: flex;
`;

export const StyledTable = styled.table`
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 0.9em;
  font-family: sans-serif;
  min-width: 400px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  font-family: "Share Tech", sans-serif;
`;

export const StyledTableHead = styled.tr`
  background-color: #c81d25;
  color: #ffffff;
  text-align: center;
`;
export const StyledTh = styled.th`
  padding: 12px 15px;
`;

export const StyledTd = styled.td`
  padding: 12px 15px;
`;

import styled from "styled-components";

export const AddButton = styled.button`
  min-width: 165px;
  width: auto;
  height: 45px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px 0 35px;
  font-size: 15px;
  background-color: #00b4d8;
  color: white;
  text-transform: uppercase;
  font-family: "Open Sans Condensed";
  font-weight: bolder;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin-bottom: 1vh;
  font-family: "Share Tech", sans-serif;

  &:hover {
    background-color: #90e0ef;
    color: white;
    border: 1px solid black;
    font-family: "Share Tech", sans-serif;
  }
`;

export const EditButton = styled(AddButton)`
  background-color: #4caf50;
  color: white;
  font-family: "Share Tech", sans-serif;

  &:hover {
    background-color: lightgreen;
    border: none;
    font-family: "Share Tech", sans-serif;
  }
`;

export const DeleteButton = styled(AddButton)`
  background-color: #ba181b;
  color: white;
  font-family: "Share Tech", sans-serif;

  &:hover {
    background-color: #e5383b;
    color: white;
    border: none;
    font-family: "Share Tech", sans-serif;
  }
`;

export const CancelButton = styled(AddButton)`
  background-color: #555555;
  color: white;
  border: 1px solid white;
  font-family: "Share Tech", sans-serif;

  &:hover {
    background-color: grey;
    color: white;
    border: none;
    font-family: "Share Tech", sans-serif;
  }
`;

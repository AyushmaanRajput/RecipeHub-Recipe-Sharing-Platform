import styled from "@emotion/styled";
import React from "react";

export const Container = ({ children }) => {
  return <CONTAINER>{children}</CONTAINER>;
};
const CONTAINER = styled.div`
  width: min(100%, 80rem);
  background-color: transparent;
  margin-inline: auto;
`;

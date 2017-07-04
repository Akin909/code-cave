import styled from 'styled-components';

export const Title = styled.h1`
  
`;

export const Button = styled.button`
  background-color: #96D9FF;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 10px solid #0065A6;
  outline: none;
  transition: all .2 cubic-bezier(0, 1.26, .8, 1.28);

  &:hover {
    background-color: #96D9FF;
    cursor: pointer;
    border-color: #003557;
    transform: scale(1.2,1.2)
   }
`;

import styled from 'styled-components';

export const Title = styled.h1`
  
`;

export const Input = styled.input`
  border: none;
  border-radius: 4px;
  height: 3em;
  width: 16em;
  margin: 0.5em;
  padding: 0.3em;
  font-size: 14px;
`;

export const Form = styled.form`
  width: 100%;
  height: auto;
  margin: 0;
`;

export const Label = styled.label`
  width: 100%;
  height: 3.5em;
  color: ${({ dark }) => (dark ? 'black' : 'white')};
`;

const AdaptedSelect = Input.withComponent('select');

export const Select = AdaptedSelect.extend`

`;
export const Option = styled.option`

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

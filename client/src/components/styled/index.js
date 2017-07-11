import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

export const flex = css`
  display:flex;
  flex-direction: ${props => (props.row ? 'row' : 'column')};
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
  ${flex}
`;

export const Grid = Container.extend`
  align-items: flex-start;
  flex-wrap: wrap;
  overflow-y: scroll;
`;

export const StyledLink = styled(Link)`
  color: white;
  margin: 0 1em;
  font-size: 1.2em;
  text-decoration: none;
  &:hover {
  text-decoration: underline;
  font-weight: 800;
  }
`;

export const Title = styled.h1`
  color: white;
  text-align: center;
`;

export const Input = styled.input`
  border: none;
  border-radius: 4px;
  height: 10%;
  width: 80%;
  margin: 0.5em;
  padding: 0.3em;
  font-size: 1.2em;
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
  width: 80px;
  height: 40px;
  border-radius: 4px;
  border: none;
  box-shadow: 0 1px 0.5px rgba(0, 0, 0, 0.5);
`;

export const RoundButton = styled.button`
  z-index: 10;
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

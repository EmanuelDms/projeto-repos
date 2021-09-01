import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Loading = styled.div`
color: #FFF;
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const RepositoryContainer = styled.div`
  width: 80vw;
  background: #FFF;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  padding: 30px;
  /* margin: 80px auto; */
`;

export const Owner = styled.header`
  display: flex;
  justify-content: start;
  align-items: flex-start;

  img, Details{
    float: left;
  }

  img{
    margin-right: 30px;
    width: 150px;
    border-radius: 20%;
  }

  h1{
    font-size: 30px;
    color: #0D2636;
  }

  p{
    margin-top: 5px;
    color: #000;
    text-align: left;
    line-height: 1.4;
  }
`;

export const Details = styled.div`

`;

export const BackButton = styled(Link)`
  border: 0;
  outline: 0;
  background: transparent;

  align-self: flex-start;
  margin  : 30px 0 0 30px;
`;
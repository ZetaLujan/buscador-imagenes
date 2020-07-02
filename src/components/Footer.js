import React from 'react';
import styled from '@emotion/styled';

const Copy = styled.div`
    color: #A0A0A0;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    text-align: center;
    margin: 1.9rem auto;
`;

const Footer = () => {
    return ( 
        <Copy>
            <p>Ezequiel Luján Escobar &copy; 2020</p>
        </Copy>
    );
}
 
export default Footer;
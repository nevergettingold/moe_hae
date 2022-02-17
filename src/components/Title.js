import React from 'react';
import styled from 'styled-components';

const Title = props => {
    const {text} = props;

    return (
        <WrapTitle>
            <h4>{text}</h4>
        </WrapTitle>
    );
};
const WrapTitle = styled.div`
    margin-bottom: 2rem;
    width: 100%;
    display: flex;
    justify-content:center; 
    h4{
        font-size: 2.4rem;
    }
`

export default Title;
import React from 'react';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';

/* Componenet */
import {Title} from '../components/component';

/* Elements */
import {Btn} from '../elements/element';

const WrongPage = (props) => {
    const navigate = useNavigate();

    return (
        <WrongPageLayer>
            <Title>멈춰!</Title>
            <p>잘못된 경로로 들어오셨습니다. 아래버튼으로 메인으로 돌아가주시길바랍니다.</p>
            <Btn _click={() => {navigate("/", {replace: true})}} text={"메인으로 가기"}/>
        </WrongPageLayer>
    );
};
const WrongPageLayer = styled.div`
    h4{
        margin-bottom: 2rem;
        font-size: 1.5rem;
    }
    p{
        margin-bottom: 2rem;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`
export default WrongPage;
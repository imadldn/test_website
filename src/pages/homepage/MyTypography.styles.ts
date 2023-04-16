import styled from 'styled-components';
export const Wrapper = styled.div`
 display: flex;
 justify-content: space-between;
 flex-direction: column;
 width: 100%;
 height: 100%;

 button {
    border-radius: 0 0 20px 20px;
 }

 img {
    object-fit: cover;
    height: 100%;
    width: 100%;
 }

 div .normal-text{
    font-family: Arial, Helvetica, sans-serif;
    padding: 1rem;
    height: 100%;
 }

 .image-container {
    position: relative;
    text-align: center;
    overflow: hidden;
 }
 .text-image-center {
    position: absolute;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 20px;
    text-align: left;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 0; 
    height: fit-content;
    text-shadow: 0 0 25px black;
 }
`;
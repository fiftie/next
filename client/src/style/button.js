import styled from 'styled-components';

const BaseButton = styled.button`
    display: inline-block;
    padding: 0.5em 1em;
    text-decoration: none;
    color: #FFF;
    border-bottom: solid 4px #627295;
    border-radius: 3px;
`

const ShowCodeButton = styled(BaseButton)`
    background: #668ad8;
`

const RunCodeButton = styled(BaseButton)`
    background: #58be93;
`

export {ShowCodeButton, RunCodeButton};
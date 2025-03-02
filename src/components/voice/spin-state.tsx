'use client';
import React, { useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';

type CortanaProps = {
  mode: string;
};

const cortanaScale = 2;

const outerStartSize = 50 * cortanaScale;
const outerRingSize = 14 * cortanaScale;

const innerStartSize = 40 * cortanaScale;
const innerRingSize = 7 * cortanaScale;

const cortanaListen = keyframes`
  0% {
    border-width: ${innerRingSize}px;
    box-shadow: 0 0 0 ${outerRingSize * 3}px #6E0D0D;
  }
  100% {
    border-width: ${innerRingSize * 1.25}px;
    box-shadow: 0 0 0 ${outerRingSize * 2.75}px #6E0D0D;
  }
`;

const cortanaBreath = keyframes`
  0% {
    border-width: ${innerRingSize}px;
    box-shadow: 0 0 0 ${outerRingSize * 2.5}px #6E0D0D;
  }
  100% {
    border-width: ${innerRingSize * 3}px;
    box-shadow: 0 0 0 ${outerRingSize}px #6E0D0D;
  }
`;

const cortanaThink = keyframes`
  0%   { transform: rotateY(0deg); }
  100% { transform: rotateY(180deg); }
`;

const cortanaThinkO = keyframes`
  0%   { transform: rotateY(0deg); }
  100% { transform: rotateY(-180deg); }
`;

const CortanaDiv = styled.div<CortanaProps>`
  color: #6E0D0D;
  box-shadow: 0 0 0 ${outerRingSize}px;
  display: block;
  margin: 50;
  /* margin-left: 50px; */
  width: ${outerStartSize}px;
  height: ${outerStartSize}px;
  border-radius: 100%;
  position: absolute;
  border: ${innerRingSize}px solid #D70000;
  transition: border-width 1s, box-shadow 1s;
  transform-style: preserve-3d;
  animation: ${cortanaBreath} 1s infinite ease-in-out alternate;

  ${(props) =>
    props.mode === 'listen' &&
    css`
      background-color: #D70000;
      animation: ${cortanaListen} 0.5s infinite ease-in-out alternate;
    `}

  ${(props) =>
    props.mode === 'think' &&
    css`
      width: ${outerStartSize * 2}px;
      height: ${outerStartSize * 2}px;
      box-shadow: 0 0 0 ${outerRingSize * 0.75}px;
      color: #D70000;
      border-color: transparent;
      animation: ${cortanaThink} 0.65s infinite ease-in-out alternate;

      &:before {
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        margin-left: -${innerRingSize}px;
        margin-top: -${innerRingSize}px;
        border-radius: 100%;
        border: ${innerRingSize}px solid #6E0D0D;
        animation: ${cortanaThinkO} 0.6s infinite linear alternate;
      }
    `}

  ${(props) =>
    props.mode === 'inactive' &&
    css`
      border-color: #fff;
      animation: none;
      border-width: ${innerRingSize / 2}px;
      box-shadow: 0 0 0 ${outerRingSize / 3}px #999999;
    `}
`;

function Cortana({ listeningMode }: { listeningMode: string }) {
  const [mode, setMode] = useState(listeningMode);

  useEffect(() => {
    setMode(listeningMode);
  }, [listeningMode]);

  return (
    <div className='m-60'>
      <CortanaDiv id='cortana' mode={mode} />
    </div>
  );
}

export default Cortana;
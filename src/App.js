import React, { Component } from 'react';
import styled from 'styled-components';

import logo from './assets/logo.png';
import inside from './assets/fullUnder.svg';
import repeatableBackground from './assets/checkerboard.png'
import {StickyDraggableWindow} from './components/DraggableWindow'

const ORIGIN_X = "14%";
const ORIGIN_Y = "150px";

const Container = styled.div`
  background-image: url(${repeatableBackground});
  height: 100%;
`

const ScaledImage = styled.img`
  max-width:100%;
  max-height:100%;
`

const CenteredBox = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  height: ${props => props.height ? props.height+"px" : ""};
  width: ${props => props.width ? props.width+"px" : ""};
  padding: 10px;
`

class App extends Component {
  render() {
    return (
      <Container className="App">
        <StickyDraggableWindow
          bounceBack={false}
          hiddenImage={inside}
          title="oglogo"
          left={ORIGIN_X}
          top={ORIGIN_Y}
        >
          <CenteredBox height={150} width={160}>
            <ScaledImage src={logo}/>
          </CenteredBox>
        </StickyDraggableWindow>
      </Container>
    );
  }
}

export default App;

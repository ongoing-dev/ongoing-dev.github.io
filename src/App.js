import React, { Component } from 'react';
import styled from 'styled-components';

import logo from './assets/logo.png';
import inside from './assets/inside2x.png';
import repeatableBackground from './assets/checkerboard.png'
import DraggableWindow from './components/DraggableWindow'

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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDragging: false,
      minimized: false,
      controlledPosition: {
        x: 0, y: 0
      }
    };
  }

  onStart(e, position) {
    this.setState({
      isDragging: true
    })
  }

  resetBox(e, position) {
    this.setState({
      isDragging: false,
      controlledPosition: {x:0, y:0}
    });
  }

  changeView(e) {
    this.setState({
      minimized: !this.state.minimized
    });
  }

  render() {
    return (
      <Container className="App">
        <DraggableWindow
          bounceBack={true}
          hiddenImage={inside}
          title="oglogo"
          width={180}
          height={194}
          left={ORIGIN_X}
          top={ORIGIN_Y}
        >
          <ScaledImage src={logo}/>
        </DraggableWindow>
      </Container>
    );
  }
}

export default App;

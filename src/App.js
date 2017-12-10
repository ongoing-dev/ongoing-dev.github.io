import React, { Component } from 'react';
import Draggable from 'react-draggable';
import styled from 'styled-components';

import logo from './assets/logo.png';
import inside from './assets/inside2x.png';
import repeatableBackground from './assets/checkerboard.png'

const ORIGIN_X = "14%";
const ORIGIN_Y = "150px";

const Container = styled.div`
  background-image: url(${repeatableBackground});
  height: 100%;
`

const Box = styled.div`
  background: #fff;
  width: 180px;
  border: 1px solid #999;
  border-radius: 1px;
  position: absolute;
  left: ${ORIGIN_X};
  top: ${ORIGIN_Y};
  transition: ${props => props.dragging ? "" : "550ms transform ease"};
  cursor: move;
`;

const Square = styled.div`
  background: #fff;
  width: 180px;
  height: 194px;
  border-radius: 1px;
  position: absolute;
  left: ${props => props.left};
  top: ${props => props.top};
  display: ${props => props.hidden ? "none" : "flex"};
`

const BAR_FONT_SIZE = "13px";

const Bar = styled.div`
  height: 20px;
  background-color: #23aa99;
  padding: 1px 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const BarText = styled.div`
  color: #fff;
  font-size: ${BAR_FONT_SIZE};
  height: 90%;
`

const ActionButton = BarText.extend`
  margin-right: 5px;
  cursor: pointer;
  font-size: 22px;
  line-height: ${BAR_FONT_SIZE};
  z-index: 1000;
  position: relative;

  &:after {
    content:'';
    position:absolute;
    top:-10px; bottom:-10px;
    left:-10px; right:-10px;
  }
`

const Content = styled.div`
  height: 150px;
  display: ${props => props.hidden ? "none" : "flex"};
  padding: 10px;
  align-items: center;
  justify-content: center;
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
        <div onTouchMove={(e) => e.preventDefault()}>
          <Square
            left={ORIGIN_X}
            top={ORIGIN_Y}
            hidden={this.state.minimized}
          >
            <ScaledImage src={inside}/>
          </Square>
          <Draggable
            position={this.state.controlledPosition}
            onStart={(e, position) => this.onStart(e, position)}
            onStop={(e, position) => this.resetBox(e, position)}
          >
            <Box
              dragging={this.state.isDragging}
            >
              <Bar>
                <BarText>oglogo</BarText>
                <ActionButton
                  onMouseDown={(e) => this.changeView(e)}
                >
                  {this.state.minimized ? "+" : "-"}
                </ActionButton>
              </Bar>
              <Content
                hidden={this.state.minimized}
              >
                <ScaledImage src={logo}/>
              </Content>
            </Box>
          </Draggable>
        </div>
      </Container>
    );
  }
}

export default App;

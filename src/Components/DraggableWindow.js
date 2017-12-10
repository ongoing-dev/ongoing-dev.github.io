import React, { Component } from 'react';
import Draggable from 'react-draggable';
import styled from 'styled-components';

import logo from '../assets/logo.png';
import inside from '../assets/inside2x.png';
import repeatableBackground from '../assets/checkerboard.png'

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
  left: ${props => props.left? props.left : "0"};
  top: ${props => props.top? props.top : "0"};
  transition: ${props => props.dragging ? "" : "550ms transform ease"};
  cursor: move;
`;

const Square = styled.div`
  background: #fff;
  width: 180px;
  height: 194px;
  border-radius: 1px;
  position: absolute;
  left: ${props => props.left? props.left : "0"};
  top: ${props => props.top? props.top : "0"};
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

type Props = {
  bounceBack?: bool,
  hiddenImage?: string,
  title?: string,
  left?: string,
  top?: string,
  children: React.Node,
  width: number,
  height: number,
};

class DraggableWindow extends Component {
  static defaultProps = {
    bounceBack: false,
    hiddenImage: null,
    titile: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      dragging: false,
      minimized: false,
      controlledPosition: {
        x: 0, y: 0
      },
    };
  }

  onStart(e, foo) {
    this.setState({ dragging: true })
  }

  onStop(e, foo) {
    if(this.props.bounceBack){
      this.setState({ dragging: false, });
    } else {
      this.setState({
        controlledPosition: {
          x: foo.x, y: foo.y
        }
      })
    }
  }

  changeView(e) {
    this.setState({ minimized: !this.state.minimized });
  }

  render() {
    const { controlledPosition } = this.state;
    const { hiddenImage, title, children, left, top } = this.props;

    const backgroundImage = (
      <Square
        left={left}
        top={top}
        position={controlledPosition}
        hidden={this.state.minimized}
      >
        <ScaledImage src={hiddenImage}/>
      </Square>
    )

    const titleBar = (
      <Bar>
        <BarText>{title}</BarText>
        <ActionButton onMouseDown={(e) => this.changeView(e)}>
          {this.state.minimized ? "+" : "-"}
        </ActionButton>
      </Bar>
    )

    return (
      <div onTouchMove={(e) => e.preventDefault()}>
        {hiddenImage? backgroundImage : null}
        <Draggable
          position={controlledPosition}
          onStart={(e, position) => this.onStart(e, position)}
          onStop={(e, position) => this.onStop(e, position)}
        >
          <Box left={left} top={top} dragging={this.state.dragging}>
            {titleBar}
            <Content hidden={this.state.minimized}>
              {children}
            </Content>
          </Box>
        </Draggable>
      </div>
    );
  }
}

export default DraggableWindow;

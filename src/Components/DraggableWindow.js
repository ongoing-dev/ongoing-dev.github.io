import React, { Component } from 'react';
import Draggable from 'react-draggable';
import styled from 'styled-components';

const Box = styled.div`
  background: #fff;
  border: 1px solid #999;
  border-radius: 1px;
  position: absolute;
  left: ${props => props.left? props.left : "0"};
  top: ${props => props.top? props.top : "0"};
  transition: ${props => props.dragging ? "" : "550ms transform ease"};
  cursor: move;
`;

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
  display: ${props => props.hidden ? "none" : "flex"};
`

type Coordinate = {
  x: number,
  y: number,
}

type Props = {
  onStart?: (e: Event, data: DraggableData) => void;
  onStop?: (position: Coordinate) => void;
  onViewChange?: (hidden: bool) => void;
  bounceBack?: bool,
  title?: string,
  left?: string,
  top?: string,
  children: React.Node,
};

class DraggableWindow extends Component<Props> {
  static defaultProps = {
    onStart: () => {},
    onStop: () => {},
    onViewChange: () => {},
    bounceBack: false,
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

  onStart(e, data) {
    this.setState({ dragging: true })

    this.props.onStart(e, data);
  }

  onStop(e, data) {
    if(this.props.bounceBack){
      this.setState({ dragging: false, });
    } else {
      this.setState({
        controlledPosition: {
          x: data.x, y: data.y
        }
      })
    }

    this.props.onStop(e, data);
  }

  changeView(e) {
    e.stopPropagation();
    const minimized = !this.state.minimized;
    this.props.onViewChange(minimized);
    this.setState({ minimized: minimized });
  }

  render() {
    const { controlledPosition } = this.state;
    const { title, children, left, top } = this.props;

    const titleBar = (
      <Bar>
        <BarText>{title}</BarText>
        <ActionButton onMouseDown={(e) => this.changeView(e)}>
          {this.state.minimized ? "+" : "-"}
        </ActionButton>
      </Bar>
    )

    return (
      <div ref="test" onTouchMove={(e) => e.preventDefault()}>
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

const CroppedBackground = styled.img`
  position: absolute;
  background-color: #fff;
  display: ${props => props.hidden ? "none" : "flex"};
  width:100%;
  height:100%;
  object-fit: cover;
  object-position: 0 0;
  clip: rect(
    ${props => props.top}px,
    ${props => props.right}px,
    ${props => props.bottom}px,
    ${props => props.left}px
  );
`

type StickyDraggableWindowProps = {
  ...Props,
  hiddenImage: string;
};
// its sticky because it takes part of the background with it
// exposing the hidden stuffs beneath
export class StickyDraggableWindow extends Component<StickyDraggableWindowProps> {
  constructor(props) {
    super(props);
    this.state = {
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      hidden: false,
      controlledPosition: {
        x: 0, y: 0
      },
    };
  }

  // a little meh but we're not trying to win any prizes here
  setInitialPosition(e, data) {
    const node = data.node;

    this.setState({
      left: node.offsetLeft,
      top: node.offsetTop,
      width: node.offsetWidth - 1, // dunno why but seems to work better
      height: node.offsetHeight,
    })
  }

  resetPosition(e, data) {
    if(!this.props.bounceBack) {
      this.setState({
        controlledPosition: {
          x: data.x, y: data.y
        },
      })
    }
  }

  changeView(hidden) {
    this.setState({
      hidden: hidden
    });
  }

  render() {
    const { controlledPosition, left, top, width, height, hidden } = this.state;
    const { hiddenImage } = this.props;
    const absoluteLeft = left + controlledPosition.x;
    const absoluteTop = top + controlledPosition.y;

    return (
      <div>
        <CroppedBackground
          hidden={hidden}
          top={absoluteTop}
          right={absoluteLeft + width}
          bottom={absoluteTop + height}
          left={absoluteLeft}
          src={hiddenImage}
        />
        <DraggableWindow
          onStart={(e, data) => this.setInitialPosition(e, data)}
          onStop={(e, data) => this.resetPosition(e, data)}
          onViewChange={(hidden) => this.changeView(hidden)}
          {...this.props}
        />
      </div>
    )
  }
}


export default DraggableWindow;

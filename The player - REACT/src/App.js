import React from "react";
import image from "./minion-front.png"
import imageRight from "./minion-right.png"
import imageLeft from "./minion-left.png"
import imageUp from "./minion-up.png"
import imageMoving from "./minion-moving.gif"

function PlayerFront(props) {
  console.log(props)
  const stylePlayer = {
    width: "20px",
    height: "20px",
    top: props.top + "px",
    left: props.left + "px",
    position: "absolute"
  };
  return (
    <div style={stylePlayer}>
      <img src={image} width="50" height="60" />
    </div>
  )
}

function PlayerLeft(props) {
  const stylePlayer = {
    top: props.top + "px",
    left: props.left + "px",
    position: "absolute"
  }
  return (
    <div style={stylePlayer}>
      <img src={imageLeft} width="50" height="60" />
    </div>
  )
}

function PlayerRight(props) {
  const stylePlayer = {
    top: props.top + "px",
    left: props.left + "px",
    position: "absolute"
  }
  return (
    <div style={stylePlayer}>
      <img src={imageRight} width="50" height="60" />
    </div>
  )
}

function PlayerUp(props) {
  const stylePlayer = {
    top: props.top + "px",
    left: props.left + "px",
    position: "absolute"
  }
  return (
    <div style={stylePlayer}>
      <img src={imageUp} width="50" height="50" />
    </div>
  )
}

function PlayerMoving(props) {
  const stylePlayer = {
    top: props.top + "px",
    left: props.left + "px",
    position: "absolute"
  }
  return (
    <div style={stylePlayer}>
      <img src={imageMoving} width="70" height="70" />
    </div>
  )
}

class GameArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      top: 40,
      left: 30,
      playerImage: 'front'
    };
  }

  componentDidMount() {
    document.addEventListener("keydown", (event) => {
      console.log(event.code);
      let nextTop = this.state.top;
      let nextLeft = this.state.left;
      switch (event.code) {
        case "ArrowUp":
          nextTop -= 10;
          break;
        case "ArrowDown":
          nextTop += 10;

          break;
        case "ArrowLeft":
          nextLeft -= 10;
          break;

        case "ArrowRight":
          nextLeft += 10;
          break;
        default:
      }

      console.log("nextTop", nextTop);
      console.log("nextLeft", nextLeft);
      console.log(this.playerIsOutSideOfContainer(nextTop, nextLeft))

      if (this.playerIsOutSideOfContainer(nextTop, nextLeft)) {
        this.setValues(nextTop, nextLeft)
      } else {
        this.setState({ top: nextTop, left: nextLeft });
      }
      this.setImage(event.code)
      this.setGif(nextTop, nextLeft)

      this.playerHitObstacles(nextTop, nextLeft)
    });
  }

  // changing playerPicture when the event keypress is changing
  setImage(code) {
    if (code === "ArrowUp") {
      this.setState({ playerImage: 'up' })
    } else if (code === "ArrowLeft") {
      this.setState({ playerImage: 'left' })
    } else if (code === "ArrowRight") {
      this.setState({ playerImage: 'right' })
    } else if (code === "ArrowDown") {
      this.setState({ playerImage: 'front' })
    }
  }

  setGif(nextTop, nextLeft) {
    if (nextTop > 280 && nextTop < 320 && nextLeft > 320 && nextLeft < 350) {

      this.setState({ playerImage: 'moving' })
    }
  }

  // set values when the player wants to go outside of the grey box
  setValues(nextTop, nextLeft) {
    let topValue;
    let leftValue;

    if (nextTop > 390 && nextLeft > 550) {
      topValue = 350;
      leftValue = 560
      this.setState({ top: topValue, left: leftValue })
    } else if (nextTop > 390 && nextLeft < 10) {
      topValue = 350;
      leftValue = 0;
      this.setState({ top: topValue, left: leftValue })
    } else if (nextTop < 10 && nextLeft > 550) {
      topValue = 0;
      leftValue = 560;
      this.setState({ top: topValue, left: leftValue })
    } else if (nextTop < 10 && nextLeft < 10) {
      console.log('aici')
      topValue = 0;
      leftValue = 0;
      this.setState({ top: topValue, left: leftValue })
    }
  }

  //function that stops the player to go outside the grey box
  playerIsOutSideOfContainer(nextTop, nextLeft) {
    let isOutSide = false;
    if (nextTop > 340 || nextTop < 10 || nextLeft > 550 || nextLeft < 10) {
      isOutSide = true;
    }
    return isOutSide;
  }

  // stopping the player to go inside the obstacles
  playerHitObstacles(nextTop, nextLeft) {
    let fixTop;
    let fixLeft;

    this.hitObstacle1(nextLeft, nextTop, fixLeft, fixTop)
    this.hitObstacle2(nextLeft, nextTop, fixLeft, fixTop)
    this.hitObstacle3(nextLeft, nextTop, fixLeft, fixTop)
  }

  // obstacle 1
  hitObstacle1(nextLeft, nextTop, fixLeft, fixTop) {
    // left part 
    if (nextLeft > 10 && nextLeft < 50 && nextTop > 300) {
      fixLeft = 20;
      this.setState({ top: nextTop, left: fixLeft })
      // right part
    } else if (nextLeft > 70 && nextLeft < 100 && nextTop > 300) {
      fixLeft = 90;
      this.setState({ top: nextTop, left: fixLeft })
      // top part
    } else if (nextLeft > 20 && nextLeft < 90 && nextTop > 280) {
      fixTop = 300
      this.setState({ top: fixTop, left: nextLeft })
    }
  }

  //obstacle 2
  hitObstacle2(nextLeft, nextTop, fixLeft, fixTop) {
    // left part
    if (nextTop > 90 && nextTop < 190 && nextLeft > 410 && nextLeft < 430) {
      fixLeft = 410;
      this.setState({ top: nextTop, left: fixLeft })
      // right part
    } else if (nextTop > 90 && nextTop < 190 && nextLeft > 460 && nextLeft < 490) {
      fixLeft = 480;
      this.setState({ top: nextTop, left: fixLeft })
      // top part
    } else if (nextTop > 80 && nextTop < 110 && nextLeft > 410 && nextLeft < 480) {
      fixTop = 90;
      this.setState({ top: fixTop, left: nextLeft });
      // bottom part
    } else if (nextTop > 160 && nextTop < 200 && nextLeft > 410 && nextLeft < 480) {
      fixTop = 190;
      this.setState({ top: fixTop, left: nextLeft })
    }
  }

  // obstacle 3
  hitObstacle3(nextLeft, nextTop, fixLeft, fixTop) {
    // left part
    if (nextLeft > 140 && nextLeft < 170 && nextTop > 20 && nextTop < 120) {
      fixLeft = 150;
      this.setState({ top: nextTop, left: fixLeft })
      // right part
    } else if (nextLeft > 220 && nextLeft < 250 && nextTop > 20 && nextTop < 120) {
      fixLeft = 240;
      this.setState({ top: nextTop, left: fixLeft })
      // top part
    } else if (nextLeft >= 150 && nextLeft <= 240 && nextTop > 10 && nextTop < 50) {
      fixTop = 20;
      this.setState({ top: fixTop, left: nextLeft })
      // bottom part
    } else if (nextLeft >= 150 && nextLeft <= 240 && nextTop > 100 && nextTop < 130) {
      fixTop = 120;
      this.setState({ top: fixTop, left: nextLeft })
    }
  }

  render() {
    const styleAera = {
      width: "600px",
      height: "400px",
      backgroundColor: "grey"
    };

    const obstacle1 = {
      width: "40px",
      height: "40px",
      top: "360px",
      left: "60px",
      backgroundColor: "yellow",
      position: "absolute",
      border: "2px solid #dadada",
      boxShadow: "0px 0px 14px #4195fc",
      MozBoxShadow: "0px 0px 14px #4195fc",
      WebkitBoxShadow: "0px 0px 14px #4195fc"
    }
    const obstacle2 = {
      width: "40px",
      height: "40px",
      top: "150px",
      left: "450px",
      backgroundColor: "purple",
      position: "absolute",
      border: "2px solid ",
      boxShadow: "0px 0px 14px #4195fc",
      MozBoxShadow: "0px 0px 14px #4195fc",
      WebkitBoxShadow: "0px 0px 14px #4195fc"
    }
    const obstacle3 = {
      width: "40px",
      height: "40px",
      top: "80px",
      left: "200px",
      backgroundColor: "green",
      position: "absolute",
      border: "2px solid ",
      boxShadow: "0px 0px 14px #4195fc",
      MozBoxShadow: "0px 0px 14px #4195fc",
      WebkitBoxShadow: "0px 0px 14px #4195fc"
    }
    const obstacle4 = {
      width: "70px",
      height: "55px",
      top: "310px",
      left: "330px",
      backgroundColor: "blue",
      position: "absolute",
      borderRadius: "50px",
      color: "white",
      textAlign: 'center'
    }


    let displayImage;
    if (this.state.playerImage === 'front') {
      displayImage = <PlayerFront top={this.state.top} left={this.state.left} />
    } else if (this.state.playerImage === 'right') {
      displayImage = <PlayerRight top={this.state.top} left={this.state.left} />
    } else if (this.state.playerImage === 'left') {
      displayImage = <PlayerLeft top={this.state.top} left={this.state.left} />
    } else if (this.state.playerImage === 'up') {
      displayImage = <PlayerUp top={this.state.top} left={this.state.left} />
    } else if (this.state.playerImage === 'moving') {
      displayImage = <PlayerMoving top={this.state.top} left={this.state.left} />
    }


    return (
      <div>
        <div style={styleAera}>
          <div style={obstacle1}></div>
          <div style={obstacle2}></div>
          <div style={obstacle3}></div>
          <div style={obstacle4}>Special Spot</div>
          {displayImage}
        </div>
      </div>
    );
  }
}

export default function App() {
  return (
    <div className="App">
      <GameArea />
    </div>
  );
}


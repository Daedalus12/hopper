import React, {Component} from "react";

class Bar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      y0: props.height * 0.5,
      y1: props.height * (0.5 + 0.15 * props.sign),
      y2: props.height * (0.5 + 0.50 * props.sign),
      dx: props.height / 8,
      xLow: props.xLow,
      xHigh: props.xHigh,
      dxLow: 0,
      dxHigh: 0,
    };
    this.animate = null;
  }

  static calcIncrement(d1, d2) {
    return (d1 - d2) / 15;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dxLow: Bar.calcIncrement(nextProps.xLow, this.props.xLow),
      dxHigh: Bar.calcIncrement(nextProps.xHigh, this.props.xHigh),
    });
  }

  increment() {
    // Kill the interval if we've reached the destination
    if (this.state.xLow === this.props.xLow && this.state.xHigh === this.props.xHigh) {
      clearInterval(this.animate);
      return this.animate = null;
    }

    // change xLow if still needed
    if (this.state.xLow !== this.props.xLow) {
      if (Math.abs(this.state.xLow - this.props.xLow) < Math.abs(this.state.dxLow)) {
        this.setState({xLow: this.props.xLow});
      } else {
        this.setState({xLow: this.state.xLow + this.state.dxLow});
      }
    }

    // change xHigh if still needed
    if (this.state.xHigh !== this.props.xHigh) {
      if (Math.abs(this.state.xHigh - this.props.xHigh) < Math.abs(this.state.dxHigh)) {
        this.setState({xHigh: this.props.xHigh});
      } else {
        this.setState({xHigh: this.state.xHigh + this.state.dxHigh});
      }
    }
  }

  scaleX(r) {
    return this.props.xLeft + this.state.dx + r * (this.props.xRight - this.props.xLeft - this.state.dx * 2);
  }

  points() {
    let points = [];
    let x1 = this.scaleX(this.state.xLow);
    let x2 = this.scaleX(this.state.xHigh);

    points.push([this.props.xLeft, this.state.y0]);
    points.push([this.props.xLeft, this.state.y1]);
    points.push([x1 - this.state.dx, this.state.y1]);
    points.push([x1, this.state.y2]);
    points.push([x2, this.state.y2]);
    points.push([x2 + this.state.dx, this.state.y1]);
    points.push([x2 + this.state.dx, this.state.y0]);
    points.push([this.props.xLeft, this.state.y0]);

    return points.join(' ');
  }

  textHeight() {
    let dy = 3;
    if (this.props.sign < 0) {
      return this.state.y1 - dy;
    } else {
      return this.state.y1 + 6 + dy;
    }
  }
  render() {
    if ((this.state.xLow !== this.props.xLow || this.state.xHigh !== this.props.xHigh) && !this.animate) {
      this.animate = setInterval(() => {
        this.increment();
      }, 10);
    }

    if (this.state.xHigh === 0) {
      return null;
    }

    let x1 = this.scaleX(this.state.xLow) - 3;
    let x2 = this.scaleX(this.state.xHigh) + 3;
    let y = this.textHeight();


    return (
      <g>
        <polygon className={this.props.className} points={this.points()}/>
        <text className="radarLabel" x={x1} y={y} textAnchor="end">
          {this.props.sLow}
        </text>
        <text className="radarLabel" x={x2} y={y} textAnchor="start">
          {this.props.sHigh}
        </text>
      </g>
    );
  }

}

class BarSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xLeft: 100,
      h1: 0.15,
      width: 400,
    }
  }


  render(){
    const scale = this.props.data.gmax - this.props.data.gmin;
    let bar1MinVal = 0;
    let bar1MaxVal = 0;
    let bar1MinText = "";
    let bar1MaxText = "";

    let bar2MinVal = 0;
    let bar2MaxVal = 0;
    let bar2MinText = "";
    let bar2MaxText = "";
    if (this.props.data.bar1 !== null) {
      bar1MinVal = (this.props.data.bar1[0] - this.props.data.gmin) / scale;
      bar1MaxVal = (this.props.data.bar1[1] - this.props.data.gmin) / scale;
      bar1MinText = this.props.data.bar1[0];
      bar1MaxText = this.props.data.bar1[1];
    }

    if (this.props.data.bar2 !== null)
    {
      bar2MinVal = (this.props.data.bar2[0] - this.props.data.gmin) / scale;
      bar2MaxVal = (this.props.data.bar2[1] - this.props.data.gmin) / scale;
      bar2MinText = this.props.data.bar2[0];
      bar2MaxText = this.props.data.bar2[1];
    }

    return (
      <svg
          width={this.props.width}
          height={this.props.height}
          className='BarChart'
          viewBox={"-1 -1 " + (this.props.width + 2) + " " + (this.props.height + 2)}
          xmlns='http://www.w3.org/2000/svg'
      >
        <text x="0" y={this.props.height / 2 + 2}
              textAnchor="left"
              className="barLabel"
        >
          {this.props.label}
        </text>

        <line x1={this.state.xLeft} y1={this.props.height / 2} x2={this.props.width} y2={this.props.height / 2}
              className="tick"/>
        <Bar
          xLeft={this.state.xLeft}
          xRight={this.props.width}
          xLow={bar1MinVal}
          xHigh={bar1MaxVal}
          height={this.props.height}
          sign={-1}
          className="wedge"
          sLow={bar1MinText}
          sHigh={bar1MaxText}
        />;
        <Bar
          xLeft={this.state.xLeft}
          xRight={this.props.width}
          xLow={bar2MinVal}
          xHigh={bar2MaxVal}
          height={this.props.height}
          sign={1}
          className="wedge2"
          sLow={bar2MinText}
          sHigh={bar2MaxText}
        />;
      </svg>
    );
  }
}

export {BarSlider};

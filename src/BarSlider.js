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

  points() {
    let points = [];
    let x1 = this.props.xLeft + (this.props.xRight - this.props.xLeft) * this.state.xLow;
    let x2 = this.props.xLeft + (this.props.xRight - this.props.xLeft) * this.state.xHigh;

    points.push([this.props.xLeft, this.state.y0]);
    points.push([this.props.xLeft, this.state.y1]);
    points.push([x1, this.state.y1]);
    points.push([x1 + this.state.dx, this.state.y2]);
    points.push([x2 - this.state.dx, this.state.y2]);
    points.push([x2, this.state.y1]);
    points.push([x2, this.state.y0]);
    points.push([this.props.xLeft, this.state.y0]);

    return points.join(' ');
  }

  render() {
    if ((this.state.xLow !== this.props.xLow || this.state.xHigh !== this.props.xHigh) && !this.animate) {
      this.animate = setInterval(() => {
        this.increment();
      }, 10);
    }
    
    return (
      <polygon className={this.props.className} points={this.points()}/>
    );
  }

}

class BarSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xLeft: 95,
    }
  }

  render() {

    let bar1 = <Bar
      xLeft={this.state.xLeft}
      xRight={this.props.width}
      xLow={(this.props.min - this.props.gmin) / (this.props.gmax - this.props.gmin)}
      xHigh={(this.props.max - this.props.gmin) / (this.props.gmax - this.props.gmin)}
      height={this.props.height}
      sign={-1}
      className="wedge"
    />;

    let bar2 = <; >;

  if (this.props.data.bar2 === null)
  {

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

        {/*<text x="0" y={this.props.height / 2 + 2}*/}
        {/*textAnchor="right"*/}
        {/*className="radarLabel">*/}
        {/*{this.props.min}*/}
        {/*</text>*/}

        <rect
          x={this.state.xLeft}
          y="0"
          width={this.props.width - this.state.xLeft} height={this.props.height} className="tick"/>
        <line x1={this.state.xLeft} y1={this.props.height / 2} x2={this.props.width} y2={this.props.height / 2}
              className="tick"/>
        {bars}
      </svg>;
    );
  }
}

export {BarSlider};

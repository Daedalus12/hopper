import React, {Component} from "react";

class BarSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xLeft: 40,
    }
  }

  scaleX(x) {
    let a = (x - this.props.gmin) / (this.props.gmax - this.props.gmin);
    return this.state.xLeft + (this.props.width - this.state.xLeft) * a;
  }


  render() {

    let bars;
    let min1 = this.props.hop1.basics[this.props.field][0];
    let max1 = this.props.hop1.basics[this.props.field][1];

    if (this.props.hop2 === null) {
      bars = <rect
        x={this.scaleX(min1)}
        y="0"
        width={this.scaleX(max1) - this.scaleX(min1)} height={this.props.height / 2} className="wedge"/>;
    } else {
      let min2 = this.props.hop2.basics[this.props.field][0];
      let max2 = this.props.hop2.basics[this.props.field][1];
      bars =
        <g>
          <rect
            x={this.scaleX(min1)}
            y="0"
            width={this.scaleX(max1) - this.scaleX(min1)} height={this.props.height / 2} className="wedge"/>
          <rect
            x={this.scaleX(min2)}
            y={this.props.height / 2}
            width={this.scaleX(max2) - this.scaleX(min2)} height={this.props.height / 2} className="wedge2"/>
        </g>;
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
        {bars}
        <rect x={this.scaleX(this.props.min)} y="0" width={this.scaleX(this.props.max) - this.scaleX(this.props.min)}
              height={this.props.height / 2} className="wedge"/>
      </svg>
    );
  }
}

export {BarSlider};

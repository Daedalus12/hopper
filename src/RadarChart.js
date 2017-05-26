import React, {Component} from "react";

class Label extends Component {

  getTransformString(){
    let angle = 360 / this.props.nWedges * this.props.i;
    let flipString = 90 < angle && angle < 270 ? "rotate(180) translate(0 6)" : "";
    let translateString = "translate(0 -"+  this.props.radius + ")";
    let rotateString = "rotate(" + angle + ")";

    return rotateString + translateString + flipString;
  }

  render() {
    return(
        <text transform={this.getTransformString()}
              textAnchor="middle"
              className="radarLabel"
        >
          {this.props.text}
        </text>
    )
  }

}

const VertexLine = ({point}) => {
  return(
    <line
      x1={0}
      y1={0}
      x2={point[0]}
      y2={point[1]}
      className='tick'
    />
  )
};

const Axes = ({ points }) => {
  const pointsData = points.join(' ');

  return (
      <polygon className='tick' points={pointsData} />
  )
};

class Wedge extends Component {
  constructor (props) {
    super();

    this.state = {
      diameterDestination: props.diameter,
      diameter: 0,
      increment: Wedge.calcIncrement(0, props.diameter),
    };

    this.animateWedge = null;
  }

  getTransformString(){
    let angle = this.props.theta * this.props.i;
    return "rotate(" + (180 + 180 / Math.PI * angle) + ")";
  }

  static calcIncrement(d1, d2)
  {
    return Math.abs(d2- d1)/15;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      diameterDestination: nextProps.diameter,
      increment: Wedge.calcIncrement(nextProps.diameter, this.state.diameter),
    });

  }

  increment() {
    // Kill the interval if we've reached the destination
    if (this.state.diameterDestination === this.state.diameter) {
      clearInterval(this.animateWedge);
      return this.animateWedge = null;
    }

    if (this.state.diameter < this.state.diameterDestination) {
      // Kill jitter
      if (this.state.diameterDestination - this.state.diameter < this.state.increment) {
        return this.setState({ diameter: this.state.diameterDestination });
      } else {
        // Increment
        return this.setState({ diameter: this.state.diameter + this.state.increment });
      }
    } else {
      // Kill jitter
      if (this.state.diameter - this.state.diameterDestination < this.state.increment) {
        return this.setState({ diameter: this.state.diameterDestination });
      } else {
        // Decrement
        return this.setState({ diameter: this.state.diameter - this.state.increment });
      }
    }
  }

  calcPoints(radius) {

    let x = radius * Math.sin(this.props.theta / 2) * this.props.width;
    let y = radius * Math.cos(this.props.theta / 2);
    return [
      [0, 0],
      [-x, y],
      [x, y],
      [0, 0],
    ];
  }

  render() {
    if (this.state.diameter !== this.state.diameterDestination && !this.animateWedge) {
      this.animateWedge = setInterval(() => {
        this.increment();
      }, 10);
    }

    const pointsData = this.calcPoints(this.state.diameter).join(' ');

    return (
      <polygon className={this.props.s} points={pointsData} transform={this.getTransformString()} />
    );
  }
}

class RadarChart extends Component {
  constructor(props){
    super(props);
    this.state = {
      ticks: [0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0],
      radius: (props.size/2) - 20,
      nWedges: props.data.length,
      theta: (Math.PI * 2) / props.data.length,
      angle: -Math.PI / 2,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      radius: (nextProps.size / 2) - 20,
      nWedges: nextProps.data.length,
      theta: (Math.PI * 2) / nextProps.data.length,
    });
  }

  calcPoints(radius) {
    const points = [];

    for (let i = 0; i < this.state.nWedges + 1; i++) {
      let x = radius * Math.cos(this.state.theta * (i + 0.5) + this.state.angle);
      let y = radius * Math.sin(this.state.theta * (i + 0.5) + this.state.angle);
      points.push([x, y]);
    }
    return points;
  }

  render(){

    let tickPoints = [];

    for (let i=0; i < this.state.ticks.length; ++i)
    {
      tickPoints.push(this.calcPoints(this.state.ticks[i] / 5.0 * this.state.radius, this.props.size));
    }

    let outerPoints = tickPoints[tickPoints.length - 1];

    return (
      <svg
          width={this.props.size}
          height={this.props.size}
          className='Chart'
          viewBox={"-" + this.props.size/2 + " -" + this.props.size/2 + " " + this.props.size + " " + this.props.size}
          xmlns='http://www.w3.org/2000/svg'
      >

        {tickPoints.map((points, index)=> <Axes key={index} points={points} class="tick"/>)}

        { outerPoints.map((point, i) =>
          <VertexLine key={i} point={point} size={this.props.size} />)
        }
        { this.props.data.map((key, index)=>
          <Wedge key={index}
                 diameter={key.values[0] / 5 * this.state.radius}
                 i={index}
                 s="wedge"
                 angle={this.state.angle}
                 theta={this.state.theta}
                 nWedges={this.state.nWedges}
                 width={1}
          />
        )}
        { this.props.data.map((key, index)=>
          <Wedge key={index}
                 diameter={key.values[1] / 5 * this.state.radius}
                 i={index}
                 s="wedge2"
                 angle={this.state.angle}
                 theta={this.state.theta}
                 nWedges={this.state.nWedges}
                 width={0.5}
          />
        )}
        { this.props.data.map((key, index)=>
          <Label text={key.name} radius={this.state.radius} i={index} nWedges={this.state.nWedges} key={index}/>)
        }

      </svg>
    );
  }
}

export {RadarChart};

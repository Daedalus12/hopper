import React, {Component} from 'react';

const nWedges = 14;

const RAD = Math.PI / 180;
const TWO_PI = Math.PI * 2;
const theta = TWO_PI / nWedges;
const angle = RAD * -90;

const calcPoints = (diameter, size) => {
  const points = [];
  const center = size/2;
  const radius = diameter/2;

  for(let i = 0; i < nWedges+1; i++) {
    let x = radius * Math.cos(theta * (i+0.5) + angle) + center;
    let y = radius * Math.sin(theta * (i+0.5) + angle) + center;
    points.push([x, y]);
  }
  return points;
};

class Label extends Component {

  getTransformString(){
    let translateString1 = "translate(0 -"+  this.props.size/2 + ")";
    let translateString2 = "translate(" + this.props.size/2 + " " + this.props.size/2 + ")";
    let rotateString = "rotate(" + 360/nWedges*(1+this.props.i) + ")";
    return translateString2 + rotateString + translateString1;
  }

  render() {
    return(
        <text transform={this.getTransformString()} textAnchor="middle">
          {this.props.text}
        </text>
    )
  }

}

// const centerX = size/ 2;
//   const centerY = size/ 2;


const VertexLine = ({
                      point,
                      size
                    }) => {
  const centerX = size/ 2;
  const centerY = size/ 2;

  return(
    <line
      x1={centerX}
      y1={centerY}
      x2={point[0]}
      y2={point[1]}
      className='axes'
    />
  )
};

const Polygon = ({ points }) => {
  const pointsData = points.join(' ');

  return (
    <polygon className='axes' points={pointsData} />
  )
};

class Wedge extends Component {
  constructor (props) {
    super();

    console.log('constructing');
    this.state = {
      diameterDestination: props.diameter,
      diameter: 0,
      increment: Wedge.calcIncrement(0, props.diameter),
    };

    this.animateWedge = null;
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

  render() {
    if (this.state.diameter !== this.state.diameterDestination && !this.animateWedge) {
      this.animateWedge = setInterval(() => {
        this.increment();
      }, 10);
    }

    const points = calcPoints(this.state.diameter, this.props.size);

    const centerX = this.props.size/ 2;
    const centerY = this.props.size/ 2;

    const wedgePoints = [];
    wedgePoints.push([centerX, centerY]);
    wedgePoints.push(points[this.props.i]);
    wedgePoints.push(points[this.props.i+1]);
    wedgePoints.push([centerX, centerY]);

    const pointsData = wedgePoints.join(' ');

    return (
      <polygon className='wedge' points={pointsData} />
    );
  }
}

class RadarChart extends Component {
  render(){

    let ticks = [0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0];
    let radius = this.props.radius;
    let size = this.props.size;

    let tickPoints = [];

    for (let i=0; i < ticks.length; ++i)
    {
      tickPoints.push(calcPoints(ticks[i]/5.0*radius, size));
    }
    let outerPoints = tickPoints[tickPoints.length - 1];

    return (
      <svg
        className='Chart'
        viewBox={`0 0 ${this.props.size} ${this.props.size}`}
        xmlns='http://www.w3.org/2000/svg'
      >
        {tickPoints.map((points, index)=> <Polygon key={index} points={points}/>)}

        { outerPoints.map((point, i) =>
          <VertexLine key={i} point={point} size={this.props.size} />)
        }
        { this.props.vals.map((key, index)=>
            <Wedge key={index} diameter={key/5*radius} size={size} i={index}/>)
        }
        <Label text="Citrus" size={this.props.size} i={0}/>
        <Label text="Tropical Fruit" size={this.props.size} i={1}/>
        <Label text="Stone Fruit" size={this.props.size} i={2}/>
        <Label text="Apple/Pear" size={this.props.size} i={3}/>
        <Label text="Melon" size={this.props.size} i={4}/>
        <Label text="Berry" size={this.props.size} i={5}/>
        <Label text="Floral" size={this.props.size} i={6}/>
        <Label text="Spicy/Herbal" size={this.props.size} i={7}/>
        <Label text="Pine" size={this.props.size} i={8}/>
        <Label text="Resinous" size={this.props.size} i={9}/>
        <Label text="Grassy" size={this.props.size} i={10}/>
        <Label text="Earthy/Woody" size={this.props.size} i={11}/>
        <Label text="Onion/Garlic" size={this.props.size} i={12}/>
        <Label text="Dank/Catty" size={this.props.size} i={13}/>


      </svg>
    );
  }
}

export {calcPoints, RadarChart};

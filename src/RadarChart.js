import React, {Component} from 'react';

const nWedges = 15;

const RAD = Math.PI / 180;
const TWO_PI = Math.PI * 2;
const theta = TWO_PI / nWedges;
const angle = RAD * -90;

const calcPoints = (diameter, size) => {
  const points = [];
  const center = size/2;
  const radius = diameter/2;

  for(let i = 0; i < nWedges; i++) {
    let x = radius * Math.cos(theta * (i+0.5) + angle) + center;
    let y = radius * Math.sin(theta * (i+0.5) + angle) + center;
    points.push([x, y]);
  }
  return points;
};

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
      className='polygon'
    />
  )
};

const Polygon = ({
                   points,
                 }) => {
  const pointsData = points.join(' ');

  return (
    <polygon className='polygon' points={pointsData} />
  )
};

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
        className='Svg'
        viewBox={`0 0 ${this.props.size} ${this.props.size}`}
        xmlns='http://www.w3.org/2000/svg'
      >
        {tickPoints.map((points)=> <Polygon points={points}/>)}

        { outerPoints.map((point, i) =>
          <VertexLine key={i} point={point} size={this.props.size} />)
        }

      </svg>
    );
  }
}

export {calcPoints, RadarChart};
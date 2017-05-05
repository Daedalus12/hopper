import React from 'react';

const calcPoints = (circleRadius, size, vertices) => {
  const RAD = Math.PI / 180;
  const TWO_PI = Math.PI * 2;
  const points = [];
  const radius = (size/2) - circleRadius;
  const center = radius + circleRadius;
  const theta = TWO_PI / vertices;
  const angle = RAD * -90;

  for(let i = 0; i < vertices; i++) {
    let x = radius * Math.cos(theta * i + angle) + center;
    let y = radius * Math.sin(theta * i + angle) + center;
    points.push([x, y]);
  }
  return points;
};

const VertexDot = ({
                     circleRadius,
                     point
                   }) => {
  return(
    <circle
      cx={point[0]}
      cy={point[1]}
      r={circleRadius}
      className='circle'
    />
  )
};

const VertexLine = ({
                      point,
                      radius
                    }) => {
  const centerX = radius / 2;
  const centerY = radius / 2;
  return(
    <line
      x1={centerX}
      y1={centerY}
      x2={point[0]}
      y2={point[1]}
      className='App-line'
    />
  )
};

const Polygon = ({
                   points,
                   width,
                 }) => {
  const pointsData = points.join(' ');

  return (
    <polygon className='polygon' points={pointsData} />
  )
};

const RadarChart = ({
                 circleRadius,
                 points,
                 showVertexDots,
                 showVertexLines,
                 width,
                 height,
               }) => {
  return (
    <svg
      className='Svg'
      viewBox={`0 0 ${height} ${width}`}
      xmlns='http://www.w3.org/2000/svg'
    >

      <Polygon points={points}/>

      { showVertexLines ?
        points.map((point, i) =>
          <VertexLine key={i} point={point} radius={width} />
        )
        : null }

      { showVertexDots ?
        points.map((point, i) =>
          <VertexDot circleRadius={circleRadius} key={i} point={point} radius={width} />
        )
        : null }
    </svg>
  )
};

export {calcPoints, RadarChart};
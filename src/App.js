import React, { Component } from 'react';
import './App.css';

const hopData = [
  {
    id: 0,
    name: "Willamette",
    alphaMin: 4.5,
    alphaMax: 6.5,
    betaMin: 3.0,
    betaMax: 3.5,
  },
  {
    id: 1,
    name: "Bravo",
    alphaMin: 15.0,
    alphaMax: 18.0,
    betaMin: 3.5,
    betaMax: 5.5,
  },
  {
    id: 2,
    name: "Loral",
    alphaMin: 11.3,
    alphaMax: 12.2,
    betaMin: 4.9,
    betaMax: 5.3,
  },
  {
    id: 3,
    name: "Bru-1",
    alphaMin: 13.0,
    alphaMax: 15.0,
    betaMin: 8.0,
    betaMax: 10.0,
  }
];

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

const Chart = ({
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

class HopItem extends Component {
  onListItemClick() {
    this.props.cb(this.props.hop.id);
  }

  render() {
    console.log(this);

    let selectionState = "";
    if (this.props.i === this.props.hop.id) {
      selectionState = "selected";
    }

    return (
      <li className={selectionState} onClick={this.onListItemClick.bind(this)} key={this.props.hop.id}>
        {this.props.hop.name}
      </li>
    )
  }
}

class HopSelector extends Component {
  render(){
    let cb = this.props.changeSelection;
    let i = this.props.selectedHopId;
    return (
      <ul >
        {hopData.map(function(hop) {return <HopItem hop={hop} cb={cb} i={i}/>})}
      </ul>
    );
  }
}

class App extends Component {
  constructor(){
    super();
    this.changeSelectedHop = this.changeSelectedHop.bind(this);
    this.state =
      {
        hops: hopData,
        currentHop: hopData[0],
      }
  }

  changeSelectedHop(i)
  {
    let activeHop = this.state.hops[i];
    console.log("changeSelectedHop called with " + i);
    this.setState({currentHop: activeHop});
  }


  render() {

    return (
      <div className="App">
        <div className="App-header">
          <h2>The Hop Chronicles</h2>
          <p>Visualize results from the wonderful <a href="http://brulosophy.com/other-projects/hop-chronicles/">Brulosophy</a></p>
        </div>

        <div className="Hop-names">
          <h2>Select Hop</h2>
          <HopSelector changeSelection={this.changeSelectedHop} selectedHopId={this.state.currentHop.id}/>
        </div>

        <div className="Hop-details">
          <h2>Information</h2>
          <h3>{this.state.currentHop.name}</h3>
          <p>Alpha: {this.state.currentHop.alphaMin} – {this.state.currentHop.alphaMax}%</p>
          <p>Beta: {this.state.currentHop.betaMin} – {this.state.currentHop.betaMax}%</p>
          {/*<p>Cohumulone: 28 – 32% of alpha acids</p>*/}
          {/*<p>Total Oil: 0.6 – 1.6 mL/100g</p>*/}
          {/*<p>Myrcene: 22 – 32%</p>*/}
          {/*<p>Humulene: 31 – 35%</p>*/}
          {/*<p>Caryophyllene: 12 – 14%</p>*/}
          {/*<p>Farnesene: 7 – 10%</p>*/}
          {/*<p>Linalool: 0.4 – 0.7%</p>*/}
          {/*<p>Geraniol: 0.1 – 0.3%</p>*/}
          {/*<p>ß-Pinene: 0.3 – 0.5%</p>*/}
          {/*<p>Parentage: triploid seedling of English Fuggle</p>*/}
        </div>

        <div className="Hop-chart">
          <h2>Chart</h2>
          <div>
            <Chart
              circleRadius={3}
              points={calcPoints(3, 200, 10)}
              showVertexDots={true}
              showVertexLines={true}
              width={200}
              height={200}
            />
          </div>
        </div>

      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import {HopSelector} from './HopSelector';
import {hopData} from './HopData';
import {RadarChart} from './RadarChart';

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
          <HopSelector hops={this.state.hops} changeSelection={this.changeSelectedHop} selectedHopId={this.state.currentHop.id}/>
        </div>

        <div className="Hop-details">
          <h2>Information</h2>
          <h3>{this.state.currentHop.name}</h3>
          <p>Alpha: {this.state.currentHop.alphaMin} – {this.state.currentHop.alphaMax}%</p>
          <p>Beta: {this.state.currentHop.betaMin} – {this.state.currentHop.betaMax}%</p>
        </div>

        <div className="Hop-chart">
          <h2>Chart</h2>
          <div>
            <RadarChart
              radius={398}
              size={400}
              vals={[
                this.state.currentHop.characteristics.citrus,
                this.state.currentHop.characteristics.tropicalFruit,
                this.state.currentHop.characteristics.stoneFruit,
                this.state.currentHop.characteristics.applePear,
                this.state.currentHop.characteristics.melon,
                this.state.currentHop.characteristics.berry,
                this.state.currentHop.characteristics.floral,
                this.state.currentHop.characteristics.spicyHerbal,
                this.state.currentHop.characteristics.pine,
                this.state.currentHop.characteristics.resinous,
                this.state.currentHop.characteristics.grassy,
                this.state.currentHop.characteristics.earthyWoody,
                this.state.currentHop.characteristics.onionGarlic,
                this.state.currentHop.characteristics.dankCatty,
              ]}
            />
          </div>
        </div>

      </div>
    );
  }
}

export default App;

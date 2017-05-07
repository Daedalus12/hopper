import React, { Component } from 'react';
import {HopSelector} from './HopSelector';
import {hopData} from './HopData';
import {RadarChart} from './RadarChart';
import {HopBasicInfo} from './HopBasicInfo';

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
        <div className="page-header">
          <h1>THE HOP CHRONICLES</h1>
          <p>Visualize results from the wonderful <a href="http://brulosophy.com/other-projects/hop-chronicles/">Brulosophy</a></p>
        </div>

        <div className="container-fluid">
          <div className="col-md-3">
            <h3>Select Hop:</h3>
            <HopSelector hops={this.state.hops} changeSelection={this.changeSelectedHop} selectedHopId={this.state.currentHop.id}/>
          </div>

          <div className="col-md-6">
            <h3>Characteristics:</h3>
            <RadarChart
                size={300}
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

          <div className="col-md-3">
            <h3>Basic Info:</h3>
              <HopBasicInfo basics={this.state.currentHop.basics}/>
          </div>

        </div>
      </div>
    );
  }
}

export default App;

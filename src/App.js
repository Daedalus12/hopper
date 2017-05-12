import React, { Component } from 'react';
import {HopSelector} from './HopSelector';
import {hopData} from './HopData';
import {RadarChart} from './RadarChart';
import {HopBasicInfo} from './HopBasicInfo';
import {Tab, Tabs} from 'react-bootstrap';

class App extends Component {
  constructor(){
    super();
    this.state =
      {
        hops: hopData,
        hop1: hopData[0],
        hop2: hopData[1],
        activeTab: 1,
      };

    this.changeSelectedHop1 = this.changeSelectedHop1.bind(this);
    this.changeSelectedHop2 = this.changeSelectedHop2.bind(this);
    this.handleTabSelect = this.handleTabSelect.bind(this);
  }
  changeSelectedHop1(i)
  {
    if (this.state.hops[i].id === this.state.hop2.id) return;
    this.setState({hop1: this.state.hops[i]});
  }
  changeSelectedHop2(i)
  {
    if (this.state.hops[i].id === this.state.hop1.id) return;
    this.setState({hop2: this.state.hops[i]});
  }

  handleTabSelect(i)
  {
    this.setState({activeTab: i});
  }


  render() {

    return (
      <div className="App">
        <div className="page-header">
          <h1>THE HOP CHRONICLES</h1>
          <p>Visualize results from the wonderful <a href="http://brulosophy.com/other-projects/hop-chronicles/">Brulosophy</a></p>
        </div>
        <br/>

        <div className="container-fluid">
          <div className="col-md-2 col-xs-6">
            <HopSelector hops={this.state.hops} changeSelection={this.changeSelectedHop1} selectedHopId={this.state.hop1.id} disabledHop={this.state.hop2.id}/>
          </div>
          <div className="col-md-2 col-xs-6">
            <HopSelector hops={this.state.hops} changeSelection={this.changeSelectedHop2} selectedHopId={this.state.hop2.id} disabledHop={this.state.hop1.id}/>
          </div>

          <div className="col-md-8 col-xs-12">
          <Tabs activeKey={this.state.activeTab} onSelect={this.handleTabSelect} id="Visualization Selector">
            <Tab eventKey={1} title="Aroma">
                <RadarChart
                  size={300}
                  vals1={[
                    this.state.hop1.characteristics.citrus,
                    this.state.hop1.characteristics.tropicalFruit,
                    this.state.hop1.characteristics.stoneFruit,
                    this.state.hop1.characteristics.applePear,
                    this.state.hop1.characteristics.melon,
                    this.state.hop1.characteristics.berry,
                    this.state.hop1.characteristics.floral,
                    this.state.hop1.characteristics.spicyHerbal,
                    this.state.hop1.characteristics.pine,
                    this.state.hop1.characteristics.resinous,
                    this.state.hop1.characteristics.grassy,
                    this.state.hop1.characteristics.earthyWoody,
                    this.state.hop1.characteristics.onionGarlic,
                    this.state.hop1.characteristics.dankCatty,
                  ]}
                  vals2={[
                    this.state.hop2.characteristics.citrus,
                    this.state.hop2.characteristics.tropicalFruit,
                    this.state.hop2.characteristics.stoneFruit,
                    this.state.hop2.characteristics.applePear,
                    this.state.hop2.characteristics.melon,
                    this.state.hop2.characteristics.berry,
                    this.state.hop2.characteristics.floral,
                    this.state.hop2.characteristics.spicyHerbal,
                    this.state.hop2.characteristics.pine,
                    this.state.hop2.characteristics.resinous,
                    this.state.hop2.characteristics.grassy,
                    this.state.hop2.characteristics.earthyWoody,
                    this.state.hop2.characteristics.onionGarlic,
                    this.state.hop2.characteristics.dankCatty,
                  ]}
              />

            </Tab>

            <Tab eventKey={2} title="Basics">
              <HopBasicInfo basics={this.state.hop1.basics}/>
            </Tab>
          </Tabs>
          </div>




        </div>
      </div>
    );
  }
}

export default App;

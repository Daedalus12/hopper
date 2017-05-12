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
        currentHop: hopData[0],
        activeTab: 1,
      };

    this.changeSelectedHop = this.changeSelectedHop.bind(this);
    this.handleTabSelect = this.handleTabSelect.bind(this);
  }
  changeSelectedHop(i)
  {
    this.setState({currentHop: this.state.hops[i]});
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
          <div className="col-md-2 col-md-offset-2 col-xs-12">
            <HopSelector hops={this.state.hops} changeSelection={this.changeSelectedHop} selectedHopId={this.state.currentHop.id}/>
          </div>

          <div className="col-md-6">
          <Tabs activeKey={this.state.activeTab} onSelect={this.handleTabSelect}>
            <Tab eventKey={1} title="Aroma">
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
            </Tab>

            <Tab eventKey={2} title="Basics">
              <HopBasicInfo basics={this.state.currentHop.basics}/>
            </Tab>
          </Tabs>
          </div>




        </div>
      </div>
    );
  }
}

export default App;

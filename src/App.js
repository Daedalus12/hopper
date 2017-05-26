import React, {Component} from "react";
import {HopSelector} from "./HopSelector";
import {hopData} from "./HopData";
import {RadarChart} from "./RadarChart";
import {HopBasicInfo} from "./HopBasicInfo";
import {Tab, Tabs} from "react-bootstrap";

class App extends Component {
  constructor(){
    super();
    this.state =
      {
        hops: hopData,
        hop1: hopData[0],
        hop2: null,
        activeTab: 1,
        width: 300,
        height: 300,
      };

    this.changeSelectedHop1 = this.changeSelectedHop1.bind(this);
    this.changeSelectedHop2 = this.changeSelectedHop2.bind(this);
    this.handleTabSelect = this.handleTabSelect.bind(this);
    this.packData = this.packData.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
  }
  changeSelectedHop1(i)
  {
    if (this.state.hop2 != null && this.state.hops[i].id === this.state.hop2.id) return;
    this.setState({hop1: this.state.hops[i]});
  }
  changeSelectedHop2(i)
  {
    if (this.state.hops[i].id === this.state.hop1.id) return;
    if (this.state.hop2 != null && this.state.hops[i].id === this.state.hop2.id) {
      this.setState({hop2: null});
    } else {
      this.setState({hop2: this.state.hops[i]});
    }
  }

  handleTabSelect(i)
  {
    this.setState({activeTab: i});
  }


  packData() {
    let results = [];
    results.push({
      name: "Citrus",
      values: [this.state.hop1.characteristics.citrus]
    });
    results.push({
      name: "Tropical Fruit",
      values: [this.state.hop1.characteristics.tropicalFruit]
    });
    results.push({
      name: "Stone Fruit",
      values: [this.state.hop1.characteristics.stoneFruit]
    });
    results.push({
      name: "Apple/Pear",
      values: [this.state.hop1.characteristics.applePear]
    });
    results.push({
      name: "Melon",
      values: [this.state.hop1.characteristics.melon]
    });
    results.push({
      name: "Berry",
      values: [this.state.hop1.characteristics.berry]
    });
    results.push({
      name: "Melon",
      values: [this.state.hop1.characteristics.floral]
    });
    results.push({
      name: "Spicy/Herbal",
      values: [this.state.hop1.characteristics.spicyHerbal]
    });
    results.push({
      name: "Pine",
      values: [this.state.hop1.characteristics.pine]
    });
    results.push({
      name: "Resinous",
      values: [this.state.hop1.characteristics.resinous]
    });
    results.push({
      name: "Grassy",
      values: [this.state.hop1.characteristics.grassy]
    });
    results.push({
      name: "Earthy/Woody",
      values: [this.state.hop1.characteristics.earthyWoody]
    });
    results.push({
      name: "Onion/Garlic",
      values: [this.state.hop1.characteristics.onionGarlic]
    });
    results.push({
      name: "Dank/Catty",
      values: [this.state.hop1.characteristics.dankCatty]
    });

    if (this.state.hop2 != null) {
      results[0].values.push(this.state.hop2.characteristics.citrus);
      results[1].values.push(this.state.hop2.characteristics.tropicalFruit);
      results[2].values.push(this.state.hop2.characteristics.stoneFruit);
      results[3].values.push(this.state.hop2.characteristics.applePear);
      results[4].values.push(this.state.hop2.characteristics.melon);
      results[5].values.push(this.state.hop2.characteristics.berry);
      results[6].values.push(this.state.hop2.characteristics.floral);
      results[7].values.push(this.state.hop2.characteristics.spicyHerbal);
      results[8].values.push(this.state.hop2.characteristics.pine);
      results[9].values.push(this.state.hop2.characteristics.resinous);
      results[10].values.push(this.state.hop2.characteristics.grassy);
      results[11].values.push(this.state.hop2.characteristics.earthyWoody);
      results[12].values.push(this.state.hop2.characteristics.onionGarlic);
      results[13].values.push(this.state.hop2.characteristics.dankCatty);
    } else {
      for (let i = 0; i < 14; i++) {
        results[i].values.push(0);
      }
    }

    return results;
  }

  updateDimensions(){
    this.setState({
      width: document.getElementById('display-area').clientWidth,
      height: document.getElementById('display-area').clientHeight,
    });
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }

  render() {
    let size = Math.max(300, Math.min(this.state.width, 600));
    return (
      <div className="App">
        <div className="page-header">
          <h1>THE HOP CHRONICLES</h1>
          <p>Visualize results from the wonderful <a href="http://brulosophy.com/other-projects/hop-chronicles/">Brulosophy</a></p>
        </div>
        <br/>

        <div className="container-fluid">
          <div className="col-md-2 col-xs-6">
            <HopSelector hops={this.state.hops} changeSelection={this.changeSelectedHop1}
                         selectedHop={this.state.hop1} disabledHop={this.state.hop2} cn="hop1"/>
          </div>
          <div className="col-md-2 col-xs-6">
            <HopSelector hops={this.state.hops} changeSelection={this.changeSelectedHop2}
                         selectedHop={this.state.hop2} disabledHop={this.state.hop1} cn="hop2"/>
          </div>

          <div className="col-md-8 col-xs-12">
            <Tabs activeKey={this.state.activeTab} onSelect={this.handleTabSelect} id="Visualization Selector">
              <Tab eventKey={1} title="Aroma">
                <div id="display-area">
                  <RadarChart size={size} data={this.packData()}/>
                </div>
              </Tab>

              <Tab eventKey={2} title="Basics">
                <div id="display-area">
                  <HopBasicInfo hop1={this.state.hop1} hop2={this.state.hop2} hops={this.state.hops} width={this.state.width}
                                height={26}/>
                </div>
              </Tab>
            </Tabs>
          </div>




        </div>
      </div>
    );
  }
}

export default App;

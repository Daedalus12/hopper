import React, {Component} from "react";
import {BarSlider} from "./BarSlider";

class HopBasicInfo extends Component {
  render() {
    return (
      <div>
        <BarSlider
          label="Alpha"
          field="alpha"
          gmin={0}
          gmax={18}
          hop1={this.props.hop1}
          hop2={this.props.hop2}
          width={this.props.width}
          height={this.props.height}
        />
        <BarSlider
          label="Beta"
          field="beta"
          gmin={0}
          gmax={18}
          hop1={this.props.hop1}
          hop2={this.props.hop2}
          width={this.props.width}
          height={this.props.height}
        />
        <BarSlider
          label="Cohumulone"
          field="cohumulone"
          gmin={0}
          gmax={18}
          hop1={this.props.hop1}
          hop2={this.props.hop2}
          width={this.props.width}
          height={this.props.height}
        />
        <BarSlider
          label="Total Oil"
          field="totalOil"
          gmin={0}
          gmax={18}
          hop1={this.props.hop1}
          hop2={this.props.hop2}
          width={this.props.width}
          height={this.props.height}
        />
      </div>
      // <p>
      //   Alpha: {this.props.basics.alpha[0]} – {this.props.basics.alpha[1]}% <br/>
      //   Beta: {this.props.basics.beta[0]} – {this.props.basics.beta[1]}% <br/>
      //   Cohumulone: {this.props.basics.cohumulone[0]} – {this.props.basics.cohumulone[1]}% of alpha acids<br/>
      //   Total Oil: {this.props.basics.totalOil[0]} – {this.props.basics.totalOil[1]} mL/100g<br/>
      //   Myrcene: {this.props.basics.myrcene[0]} – {this.props.basics.myrcene[1]}%<br/>
      //   Humulene: {this.props.basics.humulene[0]} – {this.props.basics.humulene[1]}%<br/>
      //   Caryophyllene: {this.props.basics.caryophyllene[0]} – {this.props.basics.caryophyllene[1]}%<br/>
      //   Farnesene: {this.props.basics.farnesene[0]} – {this.props.basics.farnesene[1]}%<br/>
      //   Linalool: {this.props.basics.linalool === null ? "N/A" : this.props.basics.linalool[0] + " – " + this.props.basics.linalool[1] +"%"}<br/>
      //   Geraniol: {this.props.basics.geraniol === null ? "N/A" : this.props.basics.geraniol[0] + " – " + this.props.basics.geraniol[1] +"%"}<br/>
      //   ß-Pinene: {this.props.basics.betaPinene === null ? "N/A" : this.props.basics.betaPinene[0] + " – " + this.props.basics.betaPinene[1] +"%"}<br/>
      //   Parentage: {this.props.basics.parentage === null ? "" : this.props.basics.parentage}<br/>
      // </p>
    )
  }
}

export {HopBasicInfo};
import React, {Component} from "react";
import {BarSlider} from "./BarSlider";

class HopBasicInfo extends Component {
  getMin(field){
    let min = 9999;
    for (let i = 0; i < this.props.hops.length; i++ ){
      if (this.props.hops[i].basics[field] !== null) {
        min = Math.min(this.props.hops[i].basics[field][0], min);
      }
    }
    return min;
  }

  getMax(field){
    let max = -9999;
    for (let i = 0; i < this.props.hops.length; i++ ){
      if (this.props.hops[i].basics[field] !== null) {
        max = Math.max(this.props.hops[i].basics[field][1], max);
      }
    }
    return max;
  }

  packageData(field) {
    let result = {
      gmin: this.getMin(field),
      gmax: this.getMax(field),
      bar1: this.props.hop1.basics[field],
      bar2: null,
    };

    if (this.props.hop2 != null) {
      result.bar2 = this.props.hop2.basics[field];
    }
    return result;
  }

  render() {
    return (
      <div>
        <BarSlider
          label="Alpha" data={this.packageData("alpha")}
          width={this.props.width} height={this.props.height}/>
        <br/>
        <BarSlider
            label="Beta" data={this.packageData("beta")}
            width={this.props.width} height={this.props.height}/>
        <br/>
        <BarSlider
            label="Cohumulone" data={this.packageData("cohumulone")}
            width={this.props.width} height={this.props.height}/>
        <br/>
        <BarSlider
            label="Total Oil" data={this.packageData("totalOil")}
            width={this.props.width} height={this.props.height}/>
        <br/>
        <BarSlider
            label="Myrcene" data={this.packageData("myrcene")}
            width={this.props.width} height={this.props.height}/>
        <br/>
        <BarSlider
            label="Humulene" data={this.packageData("humulene")}
            width={this.props.width} height={this.props.height}/>
        <br/>
        <BarSlider
            label="Caryophyllene" data={this.packageData("caryophyllene")}
            width={this.props.width} height={this.props.height}/>
        <br/>
        <BarSlider
            label="Farnesene" data={this.packageData("farnesene")}
            width={this.props.width} height={this.props.height}/>
        <br/>
        <BarSlider
            label="Linalool" data={this.packageData("linalool")}
            width={this.props.width} height={this.props.height}/>
        <br/>
        <BarSlider
            label="Geraniol" data={this.packageData("geraniol")}
            width={this.props.width} height={this.props.height}/>
        <br/>
        <BarSlider
            label="ß-Pinene" data={this.packageData("betaPinene")}
            width={this.props.width} height={this.props.height}/>
        {/*<br/>*/}
        {/*Parentage: {this.props.hop1.basics.parentage === null ? "" : this.props.hop1.basics.parentage}<br/>*/}
      </div>
    )
  }
}

export {HopBasicInfo};
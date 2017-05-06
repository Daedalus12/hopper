import React, { Component } from 'react';

class HopBasicInfo extends Component {
  render() {
    console.log(this.props.basics.linalool);
    console.log(this.props.basics.linalool === null);
    console.log(this.props.basics.linalool === null ? "N/A" : "Stuff");

    return (
      <p>
        Alpha: {this.props.basics.alpha[0]} – {this.props.basics.alpha[1]}% <br/>
        Beta: {this.props.basics.beta[0]} – {this.props.basics.beta[1]}% <br/>
        Cohumulone: {this.props.basics.cohumulone[0]} – {this.props.basics.cohumulone[1]}% of alpha acids<br/>
        Total Oil: {this.props.basics.totalOil[0]} – {this.props.basics.totalOil[1]} mL/100g<br/>
        Myrcene: {this.props.basics.myrcene[0]} – {this.props.basics.myrcene[1]}%<br/>
        Humulene: {this.props.basics.humulene[0]} – {this.props.basics.humulene[1]}%<br/>
        Caryophyllene: {this.props.basics.caryophyllene[0]} – {this.props.basics.caryophyllene[1]}%<br/>
        Farnesene: {this.props.basics.farnesene[0]} – {this.props.basics.farnesene[1]}%<br/>
        Linalool: {this.props.basics.linalool === null ? "N/A" : this.props.basics.linalool[0] + " – " + this.props.basics.linalool[1] +"%"}<br/>
        Geraniol: {this.props.basics.geraniol === null ? "N/A" : this.props.basics.geraniol[0] + " – " + this.props.basics.geraniol[1] +"%"}<br/>
        ß-Pinene: {this.props.basics.betaPinene === null ? "N/A" : this.props.basics.betaPinene[0] + " – " + this.props.basics.betaPinene[1] +"%"}<br/>
        Parentage: {this.props.basics.parentage === null ? "" : this.props.basics.parentage}<br/>
      </p>
    )
  }
}

export {HopBasicInfo};
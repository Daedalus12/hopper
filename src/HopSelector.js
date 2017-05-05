import React, { Component } from 'react';

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
        {this.props.hops.map(function(hop) {return <HopItem hop={hop} cb={cb} i={i}/>})}
      </ul>
    );
  }
}

export {HopItem, HopSelector};
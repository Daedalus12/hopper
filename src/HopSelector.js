import React, { Component } from 'react';

class HopItem extends Component {
  onListItemClick() {
    this.props.cb(this.props.hop.id);
  }

  render() {
    let selectionState = "list-group-item";
    if (this.props.i === this.props.hop.id) {
      selectionState += " active";
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
      <ul className="list-group">
        {this.props.hops.map(function(hop, index) {return <HopItem key={index} hop={hop} cb={cb} i={i}/>})}
      </ul>
    );
  }
}

export {HopItem, HopSelector};

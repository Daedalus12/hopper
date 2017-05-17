import React, {Component} from "react";

class HopItem extends Component {
  onListItemClick() {
    this.props.cb(this.props.hop.id);
  }

  render() {
    let selectionState = "list-group-item";
    if (this.props.j === this.props.hop.id) {
      selectionState += " disabled"


    }else if (this.props.i === this.props.hop.id) {
      selectionState += " active";
    }
    selectionState += " " + this.props.cn;

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
    let j = this.props.disabledHop;
    let cn = this.props.cn;
    return (
      <ul className="list-group">
        {this.props.hops.map(function (hop, index) {
          return <HopItem key={index} hop={hop} cb={cb} i={i} j={j} cn={cn}/>
        })}
      </ul>
    );
  }
}

export {HopItem, HopSelector};

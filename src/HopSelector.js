import React, {Component} from "react";

class HopItem extends Component {
  onListItemClick() {
    this.props.cb(this.props.hop.id);
  }

  render() {
    let selectionState = "list-group-item";

    if (this.props.disabledHop != null) {
      if (this.props.disabledHop.id === this.props.hop.id) {
        selectionState += " disabled";
      }
    }


    if (this.props.selectedHop != null) {
      if (this.props.selectedHop.id === this.props.hop.id) {
        selectionState += " active";
      }
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
    let selectedHop = this.props.selectedHop;
    let disabledHop = this.props.disabledHop;
    let cn = this.props.cn;
    return (
      <div>
        <ul className="list-group">
          {this.props.hops.map(function (hop, index) {
            return <HopItem key={index + 1} hop={hop} selectedHop={selectedHop} disabledHop={disabledHop} cn={cn}
                            cb={cb}/>
          })}
        </ul>
      </div>
    );
  }
}

export {HopItem, HopSelector};

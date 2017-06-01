import React, {Component} from "react";

let i = 0;
function getNextId() {
  i++;
  return "radar-chart-" + i.toString();
}

class SizeAware extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: getNextId(),
    };
    this.update = this.update.bind(this);
  }

  update(){
    let width = document.getElementById(this.state.id).clientWidth;
    let height = document.getElementById(this.state.id).clientHeight;
    this.props.callback(width, height);
  }

  componentDidMount() {
    window.addEventListener("resize", this.update);
    this.update();
  }

  render() {
    return (
      <div id={this.state.id}>
        {this.props.children}
      </div>
    );
  }
}

export {SizeAware};
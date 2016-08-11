import { IonContent, IonIcon } from 'reactionic';
import React, {Component, PropTypes} from 'react';




export default class DemoPopover extends Component{

  render() {
    return (
        <div className="content">
          <div className="list">
            {this.props.dropdown.map(day => <a key={day} className="item item-icon-right calenderpopoveritem" href={"#" + day} onClick={() => this.context.ionShowPopover(false)}>{day}<IonIcon icon="android-arrow-forward" /></a>)}
          </div>
        </div>
    );
  }
};

DemoPopover.propTypes = {
    dropdown: PropTypes.array
}

DemoPopover.contextTypes = {
  ionShowPopover: React.PropTypes.func
};

export { DemoPopover };

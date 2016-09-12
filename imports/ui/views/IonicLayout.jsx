import React from 'react';
import {Link} from 'react-router';
import _ from 'lodash';
import {IonTabs} from 'reactionic';
import {DemoPopover} from './popover';
import classnames from 'classnames';

var Layout = React.createClass({
  contextTypes: {
    ionSnapper: React.PropTypes.object,
    ionPlatform: React.PropTypes.object,
    router: React.PropTypes.object.isRequired,
    location: React.PropTypes.object
  },

  render() {
    var classes = classnames({
      'tabs-light tabs-striped tabs-icon-left': this.context.ionPlatform.isAndroid,
      'tabs-light tabs-icon-top': !this.context.ionPlatform.isAndroid
    });
    return (
      <div>
        {React.cloneElement(this.props.children, {pageList: this.props.pageList})}
        <IonTabs customClasses={classes}>
          <a href="/clubs" className="tab-item">
            <i className={'icon ion-android-home'}/>
            Clubs
          </a>
          <a href="/calendar" className="tab-item">
            <i className={'icon ion-android-bar'}/>
            Calendar
          </a>
          <a href="/concierge" className="tab-item">
            <i className={'icon ion-android-mail'}/>
            Concierge
          </a>
        </IonTabs>
      </div>
    );
  }
});

export default Layout;

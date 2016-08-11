import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import { IonNavView, IonView, IonContent, IonNavBar, IonNavBackButton, IonFooterBar, IonButton, IonIcon,
         IonSideMenuContainer, IonSideMenus, IonSideMenu, IonSideMenuContent, IonPopoverButton, IonTabs, IonTab} from 'reactionic';
import { DemoPopover } from './popover';
import classnames from 'classnames';

var Layout = React.createClass({
  contextTypes: {
    ionSnapper: React.PropTypes.object,
    ionPlatform: React.PropTypes.object,
    router: React.PropTypes.object.isRequired,
    location: React.PropTypes.object
  },

  render() {
    var classes = classnames(
         {'tabs-light tabs-striped tabs-icon-left': this.context.ionPlatform.isAndroid,
          'tabs-light tabs-icon-top': !this.context.ionPlatform.isAndroid}
       );
    return (
      <div>
        {React.cloneElement(this.props.children, { pageList: this.props.pageList })}
        <IonTabs  customClasses={classes}>
          <IonTab icon="android-home" to="/clubs" label="Clubs" />
          <IonTab icon="android-bar" to="/calendar" label="Calendar" />
          <IonTab icon="android-mail" to="/concierge" label="Concierge" />
        </IonTabs>
      </div>
    );
  }
});

export default Layout;

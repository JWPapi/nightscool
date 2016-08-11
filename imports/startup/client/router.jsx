import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import _ from 'lodash';
import ClubsOverview from '/imports/ui/views/ClubsOverview.jsx';
import Calendar from '/imports/ui/views/Calendar.jsx';
import Reservation from '/imports/ui/views/Reservation.jsx';
import Eventview from '/imports/ui/views/Eventview.jsx';
import Clubview from '/imports/ui/views/Clubview.jsx';
import Albumlist from '/imports/ui/views/Albumlist.jsx';
import Gallery from '/imports/ui/views/Gallery.jsx';
import IonicApp from '/imports/ui/views/IonicApp.jsx';
import IonicLayout from '/imports/ui/views/IonicLayout.jsx';
const token = '&access_token=233374643706343|70123ff84b31266934e8864cd06f784a';

var main = function () {

  var pageList = [
    { path:'/', component:Calendar, done:true},
    { path:'/calendar', component:Calendar, done:true},
    { path:'/calendar/:club', component:Calendar, done:true},
    { path:'/clubs', component:ClubsOverview, done:true},
    { path:'/concierge', component:Reservation, done:true},
    { path:'/clubs/:clubId', component:Clubview },
    { path:'/events/:eventId', component:Eventview },
    { path:'/gallery/:galleryId', component:Gallery },
    { path:'/albums/:clubId', component:Albumlist },
    { path:'/concierge/:location/:time', component:Reservation, done:true},
    { path:'/concierge/:location', component:Reservation, done:true}

  ];

  const pageRoutes = pageList.map(function(page) {
       return <Route path={page.path} component={page.component} key={page.path} />;
     });

  var PageList = pageList.map(function(page, idx, pageArray) {
   // strip the page components
   delete page.component;
   return page;
 });

 let mainRoute = (
   <Route component={IonicLayout}>
     <IndexRoute component={Calendar} />
     {pageRoutes}
   </Route>
 );


 var routes = (
   <Route path="/" component={IonicApp} pageList={PageList}>
     { mainRoute }
   </Route>
 );

ReactDOM.render(<Router history={browserHistory}>{routes}</Router>, document.getElementById('app')) ;


};

if (typeof Meteor !== 'undefined') {
  Meteor.startup(main);
} else {
  main();
}

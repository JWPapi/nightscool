import { Mongo } from 'meteor/mongo';

export const Events = new Mongo.Collection('events');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('events', function eventsPublication() {
    return Events.find();
  });
}
 

import { Mongo } from 'meteor/mongo';

export const Clubs = new Mongo.Collection('clubs');

if (Meteor.isServer) {
  Meteor.publish('clubs', function clubsPublication() {
    return Clubs.find();
  });
}

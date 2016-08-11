import { Mongo } from 'meteor/mongo';

export const Reservations = new Mongo.Collection('reservations');

import {Meteor} from 'meteor/meteor';

Meteor.methods({
    'reservation.insert' (reservation) {

        Reservations.insert(reservation);
    }
})

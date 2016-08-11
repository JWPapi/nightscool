import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import { check } from 'meteor/check';


Meteor.startup(() => {

  if (Meteor.isClient) {

  // log sent messages
  var _send = Meteor.connection._send;
  Meteor.connection._send = function (obj) {
    console.log("send", obj);
    _send.call(this, obj);
  };

  // log received messages
  Meteor.connection._stream.on('message', function (message) {
    console.log("receive", JSON.parse(message));
  });
}
  // Allow HTML Requests, needed to pull FB Data
  WebApp.rawConnectHandlers.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    return next();
  });
});
Meteor.methods({
  sendEmail: function (to, from, subject, text) {
    check([to, from, subject, text], [String]);
    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();
    Email.send({
      to: to,
      from: from,
      subject: subject,
      text: text
    });
  }
});

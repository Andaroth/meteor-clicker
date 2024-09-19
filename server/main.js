import { Meteor } from 'meteor/meteor';
import { ClicksCollection } from '/imports/api/clicks';

import { DDPRateLimiter } from "meteor/ddp-rate-limiter";

Meteor.methods({
  async 'clicked'() {
    await ClicksCollection.insertAsync({ date: new Date() });
  }
});

Meteor.startup(async () => {
  DDPRateLimiter.addRule({
    type: 'method',
    name: 'clicked'
  }, 1, 500)

  DDPRateLimiter.setErrorMessage("You have to wait a few moments");
  
  Meteor.publish("clicks", function () {
    return ClicksCollection.find();
  });
});

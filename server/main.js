import { Meteor } from 'meteor/meteor';
import { ClicksCollection } from '/imports/api/clicks';

import { DDPRateLimiter } from "meteor/ddp-rate-limiter";

Meteor.methods({
  async 'clicked'() {
    console.log('clicked')
    await ClicksCollection.insertAsync({ date: new Date() });
  }
});

Meteor.startup(async () => {
  const rateLimit = new Map();

  DDPRateLimiter.addRule({
    type: 'method',
    name: 'clicked'
  }, 1, 1000)

  DDPRateLimiter.setErrorMessage(
    "Vous devez attendre avant de cliquer à nouveau ^^"
  );
  
  Meteor.publish("clicks", function () {
    return ClicksCollection.find();
  });
});

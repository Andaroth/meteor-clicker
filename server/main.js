import { Meteor } from 'meteor/meteor';
import { ClicksCollection } from '/imports/api/clicks';

import { DDPRateLimiter } from "meteor/ddp-rate-limiter";

Meteor.startup(async () => {
  Meteor.publish("clicks", function () {
    return ClicksCollection.find();
  });

  DDPRateLimiter.addRule({
    type: 'method',
    name: 'clicks'
  }, 1, 1000)

  ClicksCollection.allow({
    "insertAsync": () => true,
  })
});

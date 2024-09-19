import { Meteor } from 'meteor/meteor';
import { ClicksCollection } from '/imports/api/clicks';

import { DDPRateLimiter } from "meteor/ddp-rate-limiter";

Meteor.methods({
  async 'clicked'() {
    const col = await ClicksCollection.find().fetch()
    await ClicksCollection.insertAsync({ index: col.length, date: new Date() });
  }
});

Meteor.startup(async () => {
  DDPRateLimiter.addRule({
    type: 'method',
    name: 'clicked'
  }, 11, 1000)

  DDPRateLimiter.setErrorMessage("You have to wait a few moments");
  
  Meteor.publish("clicks", async function () {
    const one = await ClicksCollection.find({}, { limit: 1, sort: { date: -1 } })
    return one;
  });
});

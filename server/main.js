import { Meteor } from 'meteor/meteor';
import { ClicksCollection } from '/imports/api/clicks';

import { DDPRateLimiter } from "meteor/ddp-rate-limiter";

let count = 0

Meteor.methods({
  async 'clicked'() {
    if (!count) {
      const col = await ClicksCollection.find().fetch()
      count = col.length
    }
    await ClicksCollection.insertAsync({ index: count, date: new Date() });
    count += 1
  }
});

Meteor.startup(async () => {
  const col = await ClicksCollection.find().fetch()
  count = col.length

  DDPRateLimiter.addRule({
    type: 'method',
    name: 'clicked'
  }, 11, 1000)

  DDPRateLimiter.setErrorMessage("You have to wait a few moments");
  
  Meteor.publish("clicks", async function () {
    const one = await ClicksCollection.find({}, { limit: 1, sort: { date: -1 } })
    return one;
  });

  Meteor.publish("allClicks", async function () {
    return await ClicksCollection.find({}, { limit: 20, sort: { date: -1 } })
  });
});

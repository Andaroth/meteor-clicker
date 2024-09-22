import { Meteor } from 'meteor/meteor';
import { ClicksCollection } from '/imports/api/clicks';
import { ChatCollection, isTextAllowed } from '../imports/api/chat';

import { DDPRateLimiter } from "meteor/ddp-rate-limiter";

let count = 0

Meteor.methods({
  async 'clicked'(username = "Anonymous") {
    if (!count) {
      const col = await ClicksCollection.find().fetch()
      count = col.length
    }
    await ClicksCollection.insertAsync({ username: username, index: count, date: new Date() });
    count += 1
  }
});

Meteor.methods({
  async 'sendMessage'(msg = "", name = "Anon", token = {}) {
    const message = msg.trim()
    const username = name.trim().length < 4 ? "Anon" : name
    if (message.length <= 3) return "Message too short"
    if (!isTextAllowed(message)) return "Message not allowed"
    const _ = fetch(
      "https://www.google.com/recaptcha/api/siteverify"
      + "?secret=" + Meteor.settings.private.RECAPTCHA_SECRET_KEY
      + "&response=" + token, 
      { method: "POST" }
    )
      .then(r => r.json())
      .then(async ({ success }) => {
        if (success) await ChatCollection.insertAsync({
          username: username,
          message: message,
          date: Number(new Date()
        )});
      })
  }
});

Meteor.startup(async () => {
  const col = await ClicksCollection.find().fetch()
  count = col.length

  DDPRateLimiter.addRule({ type: 'method', name: 'clicked' }, 11, 1000) // ~10click / second
  DDPRateLimiter.addRule({ type: 'method', name: 'sent' }, 1, 5000) // 1msg / 5s

  DDPRateLimiter.setErrorMessage("You have to wait a few moments");
  
  Meteor.publish("clicks", async function () {
    const one = await ClicksCollection.find({}, { limit: 20, sort: { date: -1 } })
    return one;
  });

  Meteor.publish("chat", async function () {
    const fetch = await ChatCollection.find({}, { limit: 50, sort: { date: -1 } })
    return fetch;
  });
});

import { Meteor } from 'meteor/meteor';
import { ClicksCollection } from '/imports/api/clicks';

Meteor.startup(async () => {
  Meteor.publish("clicks", function () {
    return ClicksCollection.find();
  });

  ClicksCollection.allow({
    "insertAsync": () => true,
  })
});

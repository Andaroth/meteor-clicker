import { Meteor } from 'meteor/meteor';
import { ClicksCollection } from '/imports/api/clicks';

async function addClick() {
  await ClicksCollection.insertAsync({ date: new Date() })
}

Meteor.startup(async () => {
  Meteor.publish("clicks", function () {
    return ClicksCollection.find();
  });

  ClicksCollection.allow({
    "insertAsync": () => {
      addClick()
      return true
    },
  })
});

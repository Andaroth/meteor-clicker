import { Mongo } from 'meteor/mongo';

export const ChatCollection = new Mongo.Collection('chat');

export const isTextAllowed = (msg = "") => {
  if (typeof msg !== "string") return false
  const words = Meteor.settings.public.FORBIDDEN_WORDS || []
  const forbidden = ["http", "www.", ".gg", "invite/", "rnhu", "4ch", ...words]
  for (let f of forbidden) { if (msg.replace(/(\r\n|\n|\r)/gm,"").includes(f)) return false }
  return true
}

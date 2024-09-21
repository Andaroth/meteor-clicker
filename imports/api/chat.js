import { Mongo } from 'meteor/mongo';

export const ChatCollection = new Mongo.Collection('chat');

export const isTextAllowed = (msg = "") => {
  if (typeof msg !== "string") return false
  const forbidden = JSON.parse(process.env.FORBIDDEN_WORDS || "[]")
  for (let f of forbidden) { if (msg.includes(f)) return false }
  return true
}

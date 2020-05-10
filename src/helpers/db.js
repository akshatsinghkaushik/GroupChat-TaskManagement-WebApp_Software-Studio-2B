import { db } from "../services/firebase";

export function readChats() {
  let abc = [];
  db.ref("chats").on("value", (snapshot) => {
    snapshot.forEach((snap) => {
      abc.push(snap.val());
    });
    return abc;
  });
}

export function writeChats(message) {
  return db.ref("chats").push({
    content: message.content,
    timestamp: message.timestamp,
    uid: message.uid,
  });
}

/**
 * Create a new column in the database.
 * The return value is void in all cases.
 * @param column - Information of the column
 * @param {string} column.name - The name of the column
 * @param {number} column.createdTimestamp - The timestamp when the column was created (can just do Date.now())
 */
export function createTaskColumn(column) {
  return db.ref("columns").push(column);
}

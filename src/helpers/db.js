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
 * @param {string} name - The name of the column
 */
// TODO: This will also need to push into groups.<group-id>.taskboards when that exists
export function createTaskColumn(name) {
  return db.ref("columns").push({
    name,
    createdTimestamp: Date.now(),
  });
}

export function deleteTaskColumn(id) {
  return db.ref(`columns/${id}`).update({
    deletedTimestamp: Date.now(),
  });
}

export function createTask(columnId, task) {
  return db.ref(`tasks/${columnId}`).push(task);
}

import mongoose from "mongoose";

import { getSecret } from "../secrets";

mongoose.set("debug", true);
mongoose.Promise = global.Promise;

mongoose.connect(getSecret("dbUrl"), {
  // keepAlive: true,
  useNewUrlParser: true,
  useCreateIndex: true, // DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead. https://github.com/Automattic/mongoose/issues/6890
  reconnectTries: Number.MAX_VALUE
});

const db = mongoose.connection;

/* eslint-disable */
db.on("error", (err) => console.log("Mongoose connection error: ", err));
db.on("connected", () => console.log("Mongoose connected"));
db.on("reconnected", () => console.log("Mongoose reconnected"));
db.on("disconnected", () => console.log("Mongoose disconnected"));

process.on("SIGINT", () => {
  db.close(() => {
    console.log("Mongoose default connection disconnected through app termination");
    process.exit(0);
  });
});
/* eslint-enable */

export default mongoose;

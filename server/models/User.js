import passportLocalMongoose from "passport-local-mongoose";
import mongoose from "../mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: {
      type: String
      // required: true // it's omitted, because the passport-local-mongoose works with username field, not email field directly, it turns out that we don't have an email field, it's generated inside the plugin passport-local-mongoose
    },
    password: {
      type: String
      // required: true // it's omitted, because the passport-local-mongoose works with username field, not email field directly, it turns out that we don't have an email field, it's generated inside the plugin passport-local-mongoose
    }
  },
  { timestamps: true } // https://mongoosejs.com/docs/guide#timestamps создаёт сразу оба поля createdAt и updatedAt
);

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", UserSchema);

export default User;

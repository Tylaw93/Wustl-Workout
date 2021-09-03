// Uses the db client from loader.js
import client from "./loader.js";

const userConnection = client.db("user_db").collection("users");

export default {
  async add(newUser) {
    const existingUser = await userConnection.findOne({ email: newUser.email });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const date = new Date();

    return userConnection.insertOne({
      ...newUser,
      userCreated: date,
      lastUpdated: date,
    });
  },
};

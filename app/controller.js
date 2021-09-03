// Uses the db client from loader.js
import client from "./loader.js";

const userConnection = client.db("user_db").collection("users");

export default {
  async add(newUser) {
    // TODO: Find if the ✉️ already exists

    /**
     * 2. If it exists, return an error.
     * 3. If it doesn't exist, create the user.
     */
    const existingUser = await userConnection.findOne({ email: newUser.email });
    return userConnection.insertOne(newUser);
  },
};

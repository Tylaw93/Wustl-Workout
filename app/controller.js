import { ObjectId } from "mongodb";
import client from "./loader.js";
import workoutModel from "./model.js";

const workoutController = client.db("workout_db").collection("workouts");

export default {
  index() {
    const workouts = workoutController
      .aggregate([
        {
          $addFields: {
            totalDuration: { $sum: "$exercises.duration" },
          },
        },
      ])
      .toArray();
    return workouts;
  },

  async update(id, newExercise) {
    const workoutById = await workoutController.findOne({ _id: ObjectId(id) });
    //
    const updatedWorkout = workoutModel.createExercise(
      workoutById,
      newExercise
    );

    return workoutController.replaceOne({ _id: ObjectId(id) }, updatedWorkout);
  },

  create() {
    const date = new Date();
    return workoutController.insertOne({ day: date, exercises: [] });
  },

  show() {
    const workouts = workoutController
      .aggregate([
        { $sort: { _id: -1 } },

        { $limit: 7 },
        {
          $addFields: {
            totalDuration: { $sum: "$exercises.duration" },
            totalWeight: { $sum: "$exercises.weight" },
          },
        },

        { $sort: { _id: 1 } },
      ])
      .toArray();
    return workouts;
  },
};

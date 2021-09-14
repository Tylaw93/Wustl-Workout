import Router from "express";
import workoutController from "./controller.js";

const router = new Router();

router.get("/workouts", async (_, res) => {
  try {
    const workout = await workoutController.index();
    res.json(workout);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/workouts/:id", async (req, res) => {
  try {
    const updatedWorkout = await workoutController.update(
      req.params.id,
      req.body
    );
    res.status(200).send(updatedWorkout);
  } catch (error) {
    res.status(404).json(error.message);
  }
});

router.post("/workouts", async (_, res) => {
  try {
    const newWorkout = await workoutController.create();
    res.status(201).json(newWorkout);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.get("/workouts/range", async (_, res) => {
  try {
    const workouts = await workoutController.show();
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/workouts/", async (req, res) => {
  try {
    await workoutController.deleteAll();
    res.status(204).send();
  } catch (error) {
    res.status(404).json(error.message);
  }
});

export default router;

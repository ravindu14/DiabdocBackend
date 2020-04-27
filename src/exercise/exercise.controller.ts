import * as express from "express";

import Controller from "../shared/interfaces/controller.interface";
import authMiddleware from "../shared/middleware/auth.middleware";
import exerciseModel from "./exercise.model";

export default class ExerciseController implements Controller {
  public router = express.Router();
  private exercise = exerciseModel;
  private path = "/exercises";

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/save`, authMiddleware, this.saveExercises);

    this.router.get(this.path, authMiddleware, this.getExercise);
  }

  private saveExercises = async (
    { body: { exercises }, user }: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const username = user.username;

    let exercise = null;

    if (await this.exercise.findOne().or([{ username }])) {
      exercise = await this.exercise.findOneAndUpdate(
        { username: username },
        { username, exercises }
      );
    } else {
      const exerciseData: {
        username: string;
        exercises: object;
      } = {
        username,
        exercises,
      };

      exercise = await this.exercise.create(exerciseData);
    }

    response.status(201).send({
      success: true,
      data: exercise,
    });
  };

  private getExercise = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const exercise = await this.exercise.findOne({
      username: request.user.username,
    });

    if (!exercise) {
      return response.status(200).json({ success: false, data: {} });
    }
    response.status(200).json({ success: true, data: exercise });
  };
}

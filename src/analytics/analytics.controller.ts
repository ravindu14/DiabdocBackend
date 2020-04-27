import * as express from "express";

import Controller from "../shared/interfaces/controller.interface";
import authMiddleware from "../shared/middleware/auth.middleware";
import analyticsModel from "./analytics.model";

export default class AnalyticsController implements Controller {
  public router = express.Router();
  private analytics = analyticsModel;
  private path = "/analytics";

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/save`, authMiddleware, this.saveAnalytics);

    this.router.get(this.path, authMiddleware, this.getAnalytics);
  }

  private saveAnalytics = async (
    { body: { analytics }, user }: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const username = user.username;

    let analytic = null;

    if (await this.analytics.findOne().or([{ username }])) {
      analytic = await this.analytics.findOneAndUpdate(
        { username: username },
        { username, analytics }
      );
    } else {
      const analyticsData: {
        username: string;
        analytics: Array<any>;
      } = {
        username,
        analytics,
      };

      analytic = await this.analytics.create(analyticsData);
    }

    response.status(201).send({
      success: true,
      data: analytic,
    });
  };

  private getAnalytics = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const analytic = await this.analytics.findOne({
      username: request.user.username,
    });

    if (!analytic) {
      return response.status(200).json({ success: false, data: [] });
    }
    response.status(200).json({ success: true, data: analytic });
  };
}

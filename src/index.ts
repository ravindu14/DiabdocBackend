import "reflect-metadata";

import Init from "./init";

// Load Controllers
import AuthenticationController from "./authentication/authentication.controller";
import ExerciseController from "./exercise/exercise.controller";
import AnalyticsController from "./analytics/analytics.controller";

const app = new Init([
  new AuthenticationController(),
  new ExerciseController(),
  new AnalyticsController(),
]);

app.listen();

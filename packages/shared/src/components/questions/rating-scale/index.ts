import { questionRegistry } from "../../../registry";
import { ratingScaleConfig } from "./ratingScale.config";

export { RatingScaleQuestion } from "./RatingScaleQuestion";
export { ratingScaleConfig } from "./ratingScale.config";

// Register the question type
questionRegistry.register(ratingScaleConfig);

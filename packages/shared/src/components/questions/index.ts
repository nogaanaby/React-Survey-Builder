// Import all question types to register them
import "./single-choice";
import "./multiple-choice";
import "./text-input";
import "./rating-scale";

// Re-export components
export { SingleChoiceQuestion, singleChoiceConfig } from "./single-choice";
export { MultipleChoiceQuestion, multipleChoiceConfig } from "./multiple-choice";
export { TextInputQuestion, textInputConfig } from "./text-input";
export { RatingScaleQuestion, ratingScaleConfig } from "./rating-scale";
export { BaseQuestion } from "./base";

import { questionRegistry } from "../../../registry";
import { multipleChoiceConfig } from "./multipleChoice.config";

export { MultipleChoiceQuestion } from "./MultipleChoiceQuestion";
export { multipleChoiceConfig } from "./multipleChoice.config";

// Register the question type
questionRegistry.register(multipleChoiceConfig);

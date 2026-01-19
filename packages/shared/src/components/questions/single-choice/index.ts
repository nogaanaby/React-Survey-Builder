import { questionRegistry } from "../../../registry";
import { singleChoiceConfig } from "./singleChoice.config";

export { SingleChoiceQuestion } from "./SingleChoiceQuestion";
export { singleChoiceConfig } from "./singleChoice.config";

// Register the question type
questionRegistry.register(singleChoiceConfig);

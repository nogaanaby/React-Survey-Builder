import { questionRegistry } from "../../../registry";
import { textInputConfig } from "./textInput.config";

export { TextInputQuestion } from "./TextInputQuestion";
export { textInputConfig } from "./textInput.config";

// Register the question type
questionRegistry.register(textInputConfig);

import { Image } from "lucide-react";
import type { AnswerTypeConfig } from "../../../types";
import { ImageChoiceQuestion } from "./ImageChoiceQuestion";

export const imageChoiceConfig: AnswerTypeConfig = {
  type: "image-choice",
  label: "Image Choice",
  description: "Select from image options",
  icon: Image,
  defaultConfig: {},
  formComponent: ImageChoiceQuestion as any,
};

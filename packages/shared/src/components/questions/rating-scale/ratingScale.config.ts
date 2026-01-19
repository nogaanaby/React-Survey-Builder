import { Star } from "lucide-react";
import type { QuestionTypeConfig } from "../../../types";
import { RatingScaleQuestion } from "./RatingScaleQuestion";
import { createRatingScaleResponseSchema } from "../../../validation";

export const ratingScaleConfig: QuestionTypeConfig = {
  type: "rating-scale",
  label: "Rating Scale",
  description: "Rate on a numeric scale",
  icon: Star,
  defaultAnswerType: "slider",
  supportedAnswerTypes: ["slider", "radio"],
  defaultConfig: {
    min: 1,
    max: 5,
    step: 1,
    minLabel: "Poor",
    maxLabel: "Excellent",
    showLabels: true,
  },
  formComponent: RatingScaleQuestion,
  validationSchema: createRatingScaleResponseSchema(1, 5),
};

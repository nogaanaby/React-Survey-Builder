import { z } from "zod";

export const createRatingScaleResponseSchema = (min: number, max: number) => {
  return z.number()
    .min(min, `Rating must be at least ${min}`)
    .max(max, `Rating must be at most ${max}`);
};

export const ratingScaleQuestionSchema = z.object({
  type: z.literal("rating-scale"),
  text: z.string().min(1, "Question text is required"),
  required: z.boolean(),
  answerType: z.enum(["slider", "radio"]),
  config: z.object({
    min: z.number(),
    max: z.number(),
    step: z.number().positive(),
    minLabel: z.string().optional(),
    maxLabel: z.string().optional(),
    showLabels: z.boolean(),
  }),
});

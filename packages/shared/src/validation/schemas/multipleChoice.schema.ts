import { z } from "zod";

export const createMultipleChoiceResponseSchema = (
  min?: number,
  max?: number
) => {
  let schema = z.array(z.string());
  
  if (min !== undefined) {
    schema = schema.min(min, `Please select at least ${min} option(s)`);
  }
  if (max !== undefined) {
    schema = schema.max(max, `Please select at most ${max} option(s)`);
  }
  
  return schema;
};

export const multipleChoiceQuestionSchema = z.object({
  type: z.literal("multiple-choice"),
  text: z.string().min(1, "Question text is required"),
  required: z.boolean(),
  answerType: z.literal("checkbox"),
  answers: z.array(
    z.object({
      id: z.string(),
      text: z.string().min(1, "Answer text is required"),
    })
  ).min(2, "At least 2 answers are required"),
  config: z.object({
    minSelections: z.number().optional(),
    maxSelections: z.number().optional(),
    allowOther: z.boolean(),
    randomizeOrder: z.boolean(),
  }),
});

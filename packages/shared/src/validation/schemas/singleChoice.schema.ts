import { z } from "zod";

export const singleChoiceResponseSchema = z.string().min(1, "Please select an option");

export const singleChoiceQuestionSchema = z.object({
  type: z.literal("single-choice"),
  text: z.string().min(1, "Question text is required"),
  required: z.boolean(),
  answerType: z.enum(["radio", "dropdown"]),
  answers: z.array(
    z.object({
      id: z.string(),
      text: z.string().min(1, "Answer text is required"),
    })
  ).min(2, "At least 2 answers are required"),
  config: z.object({
    allowOther: z.boolean(),
    randomizeOrder: z.boolean(),
  }),
});

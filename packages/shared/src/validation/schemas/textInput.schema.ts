import { z } from "zod";

export const createTextInputResponseSchema = (
  minLength?: number,
  maxLength?: number
) => {
  let schema = z.string();
  
  if (minLength !== undefined) {
    schema = schema.min(minLength, `Minimum ${minLength} characters required`);
  }
  if (maxLength !== undefined) {
    schema = schema.max(maxLength, `Maximum ${maxLength} characters allowed`);
  }
  
  return schema;
};

export const textInputQuestionSchema = z.object({
  type: z.literal("text-input"),
  text: z.string().min(1, "Question text is required"),
  required: z.boolean(),
  answerType: z.enum(["text-field", "textarea"]),
  config: z.object({
    placeholder: z.string().optional(),
    minLength: z.number().optional(),
    maxLength: z.number().optional(),
    multiline: z.boolean(),
    rows: z.number().optional(),
  }),
});

import { z } from "zod";

export const surveyMetadataSchema = z.object({
  title: z.string().min(1, "Survey title is required"),
  description: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  createdBy: z.string().optional(),
});

export const surveySettingsSchema = z.object({
  allowAnonymous: z.boolean(),
  showProgressBar: z.boolean(),
  shuffleQuestions: z.boolean(),
  oneQuestionPerPage: z.boolean(),
  submitButtonText: z.string(),
  thankYouMessage: z.string(),
});

export const answerSchema = z.object({
  id: z.string(),
  text: z.string().min(1, "Answer text is required"),
  imageUrl: z.string().optional(),
});

export const baseQuestionSchema = z.object({
  id: z.string(),
  text: z.string().min(1, "Question text is required"),
  description: z.string().optional(),
  required: z.boolean(),
});

export const surveySchema = z.object({
  id: z.string(),
  version: z.number(),
  metadata: surveyMetadataSchema,
  settings: surveySettingsSchema,
  questions: z.array(baseQuestionSchema),
});

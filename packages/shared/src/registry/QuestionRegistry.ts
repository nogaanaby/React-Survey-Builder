import type { ComponentType } from "react";
import type {
  QuestionType,
  QuestionTypeConfig,
  QuestionFormProps,
} from "../types";
import { FallbackQuestion } from "./FallbackComponents";

class QuestionRegistryClass {
  private questions = new Map<QuestionType, QuestionTypeConfig>();

  /**
   * Register a question type configuration
   */
  register<TConfig = Record<string, unknown>>(
    config: QuestionTypeConfig<TConfig>
  ): void {
    this.questions.set(config.type, config as QuestionTypeConfig);
  }

  /**
   * Get configuration for a question type
   */
  get(type: QuestionType): QuestionTypeConfig | undefined {
    return this.questions.get(type);
  }

  /**
   * Get all registered question types
   */
  getAll(): QuestionTypeConfig[] {
    return Array.from(this.questions.values());
  }

  /**
   * Get all question types as options for select
   */
  getOptions(): { value: QuestionType; label: string }[] {
    return this.getAll().map((config) => ({
      value: config.type,
      label: config.label,
    }));
  }

  /**
   * Get the form component for a question type
   */
  getFormComponent(type: QuestionType): ComponentType<QuestionFormProps> {
    const config = this.get(type);
    return config?.formComponent ?? FallbackQuestion;
  }

  /**
   * Get supported answer types for a question type
   */
  getSupportedAnswerTypes(type: QuestionType): string[] {
    const config = this.get(type);
    return config?.supportedAnswerTypes ?? [];
  }

  /**
   * Check if a question type is registered
   */
  has(type: QuestionType): boolean {
    return this.questions.has(type);
  }
}

// Singleton instance
export const questionRegistry = new QuestionRegistryClass();

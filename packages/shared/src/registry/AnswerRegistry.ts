import type { ComponentType } from "react";
import type { AnswerType, AnswerTypeConfig, AnswerFormProps } from "../types";
import { FallbackAnswer } from "./FallbackComponents";

class AnswerRegistryClass {
  private answers = new Map<AnswerType, AnswerTypeConfig>();

  /**
   * Register an answer type configuration
   */
  register<TConfig = Record<string, unknown>>(
    config: AnswerTypeConfig<TConfig>
  ): void {
    this.answers.set(config.type, config as AnswerTypeConfig);
  }

  /**
   * Get configuration for an answer type
   */
  get(type: AnswerType): AnswerTypeConfig | undefined {
    return this.answers.get(type);
  }

  /**
   * Get all registered answer types
   */
  getAll(): AnswerTypeConfig[] {
    return Array.from(this.answers.values());
  }

  /**
   * Get all answer types as options for select
   */
  getOptions(): { value: AnswerType; label: string }[] {
    return this.getAll().map((config) => ({
      value: config.type,
      label: config.label,
    }));
  }

  /**
   * Get the form component for an answer type
   */
  getFormComponent(type: AnswerType): ComponentType<AnswerFormProps> {
    const config = this.get(type);
    return config?.formComponent ?? FallbackAnswer;
  }

  /**
   * Check if an answer type is registered
   */
  has(type: AnswerType): boolean {
    return this.answers.has(type);
  }
}

// Singleton instance
export const answerRegistry = new AnswerRegistryClass();

import type{ Validator } from "../types/validator";

interface ConditionalRule<TValue = any> {
  when: string[];
  validate: (value: TValue) => string | undefined;
}

interface UseConditionalValidationParams<TValue = any> {
  dependsOn: string;
  rules: ConditionalRule<TValue>[];
}

export const useConditionalValidation = <TValue = any>({
  dependsOn,
  rules,
}: UseConditionalValidationParams<TValue>): Validator<TValue> => {
  return (value, allValues) => {
    const dependencyValue = allValues?.[dependsOn];

    for (const rule of rules) {
      if (
        rule.when.includes(dependencyValue) ||
        rule.when.includes("*")
      ) {
        return rule.validate(value);
      }
    }

    return undefined;
  };
};

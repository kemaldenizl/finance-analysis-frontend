import { z } from "zod";

export type ValidationSuccess<TData> = {
  success: true;
  data: TData;
};

export type ValidationError<TFieldValues extends Record<string, unknown>> = {
  success: false;
  errors: Partial<Record<keyof TFieldValues, string[]>>;
  formErrors: string[];
};

export type ValidationResult<
  TData,
  TFieldValues extends Record<string, unknown>,
> = ValidationSuccess<TData> | ValidationError<TFieldValues>;

type FormDataValue = FormDataEntryValue | FormDataEntryValue[];

type FormDataObject = Record<string, FormDataValue>;

type ValidateFormDataOptions = {
  /**
   * Checkbox gibi aynı name ile birden fazla value gelen alanları array olarak tutar.
   * Örn: interests=web&interests=mobile
   */
  preserveMultipleValues?: boolean;

  /**
   * Boş stringleri undefined'a çevirir.
   * Zod tarafında optional alanlarla daha temiz çalışır.
   */
  emptyStringToUndefined?: boolean;
};

function normalizeValue(
  value: FormDataEntryValue,
  emptyStringToUndefined: boolean,
): FormDataEntryValue | undefined {
  if (emptyStringToUndefined && value === "") {
    return undefined;
  }

  return value;
}

export function formDataToObject(
  formData: FormData,
  options: ValidateFormDataOptions = {},
): FormDataObject {
  const {
    preserveMultipleValues = true,
    emptyStringToUndefined = true,
  } = options;

  const object: FormDataObject = {};

  for (const [key, value] of formData.entries()) {
    const normalizedValue = normalizeValue(value, emptyStringToUndefined);

    if (normalizedValue === undefined) {
      continue;
    }

    if (!preserveMultipleValues) {
      object[key] = normalizedValue;
      continue;
    }

    const existingValue = object[key];

    if (existingValue === undefined) {
      object[key] = normalizedValue;
      continue;
    }

    if (Array.isArray(existingValue)) {
      existingValue.push(normalizedValue);
      continue;
    }

    object[key] = [existingValue, normalizedValue];
  }

  return object;
}

export function validateFormData<
  TSchema extends z.ZodType,
  TFieldValues extends Record<string, unknown> = z.input<TSchema> extends Record<
    string,
    unknown
  >
    ? z.input<TSchema>
    : Record<string, unknown>,
>(
  schema: TSchema,
  formData: FormData,
  options?: ValidateFormDataOptions,
): ValidationResult<z.output<TSchema>, TFieldValues> {
  const rawData = formDataToObject(formData, options);

  const result = schema.safeParse(rawData);

  if (!result.success) {
    const flattenedError = z.flattenError(result.error);

    return {
      success: false,
      errors: flattenedError.fieldErrors as Partial<
        Record<keyof TFieldValues, string[]>
      >,
      formErrors: flattenedError.formErrors,
    };
  }

  return {
    success: true,
    data: result.data,
  };
}
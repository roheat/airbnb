const minLength = min => value =>
  value && value.length < min ? `Must be atleast ${min} characters` : undefined;

export const minLength4 = minLength(4);

export const required = value => (value ? undefined : "This input is required");

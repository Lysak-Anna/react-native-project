const MAIL_REGEX =
  /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

export const validation = {
  username: {
    required: "Username is required",
    minLength: {
      value: 4,
      message: "Username must be at least 4 characters",
    },
    maxLength: {
      value: 24,
      message: "Username must be at most 24 characters",
    },
  },
  email: {
    required: "Email is required",
    pattern: { value: MAIL_REGEX, message: "Email is invalid" },
  },
  password: {
    required: "Password is required",
    minLength: {
      value: 8,
      message: "Username must be at least 8 characters",
    },
    maxLength: {
      value: 16,
      message: "Username must be at most 16 characters",
    },
  },
};

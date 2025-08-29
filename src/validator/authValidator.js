import Joi from "joi";

export const LoginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const RegisterSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("field_user", "admin", "super_admin").required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  phone: Joi.string().required(),
});

export const VerifyOTPSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  otp: Joi.string().length(6).required(),
});

export const ResendOTPSchema = Joi.object().keys({
  email: Joi.string().email().required(),
});

export const ForgotPasswordSchema = Joi.object().keys({
  email: Joi.string().email().required(),
});

export const ResetPasswordSchema = Joi.object().keys({
  token: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

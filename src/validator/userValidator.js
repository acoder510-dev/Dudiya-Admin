import Joi from "joi";

export const UserSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("field_user", "admin", "super_admin").required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  phone: Joi.string().required(),
  address: Joi.string().optional(),
  city: Joi.string().optional(),
  state: Joi.string().optional(),
  country: Joi.string().optional(),
  zipCode: Joi.string().optional(),
  isActive: Joi.boolean().default(true),
});

export const MemberSchema = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().email().optional(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  country: Joi.string().required(),
  zipCode: Joi.string().required(),
  farmDetails: Joi.object({
    farmName: Joi.string().required(),
    farmSize: Joi.number().required(),
    farmSizeUnit: Joi.string().valid("acres", "hectares").required(),
    location: Joi.string().required(),
    coordinates: Joi.object({
      latitude: Joi.number().optional(),
      longitude: Joi.number().optional(),
    }).optional(),
  }).required(),
  documents: Joi.array().items(Joi.object({
    documentType: Joi.string().required(),
    documentNumber: Joi.string().required(),
    documentFile: Joi.string().optional(),
    expiryDate: Joi.date().optional(),
  })).optional(),
  registeredBy: Joi.string().required(), // Field User ID
  isActive: Joi.boolean().default(true),
});

export const FarmSchema = Joi.object().keys({
  farmName: Joi.string().required(),
  farmSize: Joi.number().required(),
  farmSizeUnit: Joi.string().valid("acres", "hectares").required(),
  location: Joi.string().required(),
  coordinates: Joi.object({
    latitude: Joi.number().optional(),
    longitude: Joi.number().optional(),
  }).optional(),
  soilType: Joi.string().optional(),
  irrigationType: Joi.string().optional(),
  ownerId: Joi.string().required(), // Member ID
  registeredBy: Joi.string().required(), // Field User ID
  isActive: Joi.boolean().default(true),
});



export const LocationSchema = Joi.object().keys({
  name: Joi.string().required(),
  type: Joi.string().valid("city", "state", "country", "district").required(),
  parentId: Joi.string().optional(),
  coordinates: Joi.object({
    latitude: Joi.number().optional(),
    longitude: Joi.number().optional(),
  }).optional(),
  isActive: Joi.boolean().default(true),
});

export const UpdateUserSchema = Joi.object().keys({
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  phone: Joi.string().optional(),
  address: Joi.string().optional(),
  city: Joi.string().optional(),
  state: Joi.string().optional(),
  country: Joi.string().optional(),
  zipCode: Joi.string().optional(),
  isActive: Joi.boolean().optional(),
});

export const UpdateMemberSchema = Joi.object().keys({
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  phone: Joi.string().optional(),
  email: Joi.string().email().optional(),
  address: Joi.string().optional(),
  city: Joi.string().optional(),
  state: Joi.string().optional(),
  country: Joi.string().optional(),
  zipCode: Joi.string().optional(),
  farmDetails: Joi.object({
    farmName: Joi.string().optional(),
    farmSize: Joi.number().optional(),
    farmSizeUnit: Joi.string().valid("acres", "hectares").optional(),
    location: Joi.string().optional(),
    coordinates: Joi.object({
      latitude: Joi.number().optional(),
      longitude: Joi.number().optional(),
    }).optional(),
  }).optional(),
  isActive: Joi.boolean().optional(),
});

export const GetUserSchema = Joi.object().keys({
  page: Joi.number().min(1).default(1),
  limit: Joi.number().min(1).max(100).default(10),
  search: Joi.string().optional(),
  role: Joi.string().valid("field_user", "admin", "super_admin").optional(),
  isActive: Joi.boolean().optional(),
});

export const GetMemberSchema = Joi.object().keys({
  page: Joi.number().min(1).default(1),
  limit: Joi.number().min(1).max(100).default(10),
  search: Joi.string().optional(),
  city: Joi.string().optional(),
  state: Joi.string().optional(),
  isActive: Joi.boolean().optional(),
});

export const GetFarmSchema = Joi.object().keys({
  page: Joi.number().min(1).default(1),
  limit: Joi.number().min(1).max(100).default(10),
  search: Joi.string().optional(),
  location: Joi.string().optional(),
  isActive: Joi.boolean().optional(),
});

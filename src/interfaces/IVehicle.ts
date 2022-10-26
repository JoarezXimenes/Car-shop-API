import { z } from 'zod';

export const vehicleZodSchema = z.object({
  model: z.string({
    required_error: 'Model is required',
    invalid_type_error: 'Model must be a string',
  }).min(3, { message: 'Model must be a least 3 characters long' }),
  year: z.number({
    required_error: 'Year is required',
    invalid_type_error: 'Year must be a number',
  }).min(1900, { message: 'Year must be greater than or equal to 1900',
  }).max(2022, { message: 'Year must be smaller or equal to 2022' }),
  color: z.string({
    required_error: 'Color is required',
    invalid_type_error: 'Color must be a string',
  }).min(3, { message: 'Color must be a least 3 characters long' }),
  status: z.boolean({
    invalid_type_error: 'Status can only be true or false',
  }).optional(),
  buyValue: z.number({
    required_error: 'Value is required',
    invalid_type_error: 'Value must be a number',
  }).min(0, { message: 'Value must be greater than or equal to 0' }),
});

export type IVehicle = z.infer<typeof vehicleZodSchema>;
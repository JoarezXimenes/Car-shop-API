import { z } from 'zod';
import { vehicleZodSchema } from './IVehicle';

export const carZodSchema = vehicleZodSchema.extend({
  doorsQty: z.number({
    required_error: ' doorQty is required',
    invalid_type_error: 'doorQty must be a number',
  }).int().positive().min(2, { message: 'doorQty must be at least 2' })
    .max(4, { message: 'doorQty must be less than 4' }),
  seatsQty: z.number({
    required_error: ' seatsQty is required',
    invalid_type_error: 'seatsQty must be a number',
  }).int().positive().min(2, { message: 'seatsQty must be at least 2' })
    .max(4, { message: 'seatsQty must be less than 7' }),
});

export type ICar = z.infer<typeof carZodSchema>;
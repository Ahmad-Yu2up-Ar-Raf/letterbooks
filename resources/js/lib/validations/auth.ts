


import { UserOccupationValue } from "@/config/enums/Ocupassion";

import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(8),
  remember_token: z.boolean().optional()
});

export const registerCreateSchema = z.object({
  name: z.string().min(4, "Name is required"),
  email: z.string().min(3, "email is required"),
  password: z.string().min(8, "password min 8"),
  password_confirmation: z.string().min(8, "password min 8"),
  phone: z.string().min(2, "phone required"),
      country: z.string().min(2, "location required"),
      province: z.string().min(2, "location required"),
   occupasion: z.enum(UserOccupationValue).optional(),
 
});



export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerCreateSchema>;
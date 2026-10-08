import { z } from "zod"

export const leadSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "Masukkan nama depan Anda")
    .max(60, "Nama depan terlalu panjang"),
  lastName: z
    .string()
    .trim()
    .min(1, "Masukkan nama belakang Anda")
    .max(60, "Nama belakang terlalu panjang"),
  email: z
    .string()
    .trim()
    .min(1, "Masukkan email Anda")
    .pipe(z.email("Masukkan alamat email yang valid")),
  phone: z
    .string()
    .min(1, "Masukkan nomor telepon Anda")
    .regex(/^8\d{8,12}$/, "Masukkan nomor telepon yang valid"),
  province: z.string().min(1, "Silakan pilih provinsi."),
  city: z.string().min(1, "Silakan pilih kota"),
  dealer: z.string().min(1, "Silakan pilih dealer"),
  consent: z.boolean().refine((value) => value, {
    message: "Anda harus membaca dan menerima ketentuan.",
  }),
})

export type LeadFormValues = z.infer<typeof leadSchema>

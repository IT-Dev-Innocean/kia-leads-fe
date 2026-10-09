import { z } from "zod"

export const leadSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Masukkan nama lengkap Anda")
    .max(120, "Nama lengkap terlalu panjang"),
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
  crossBorderConsent: z.boolean().refine((value) => value, {
    message: "Wajib diisi",
  }),
  collectionPurposeConsent: z.boolean().refine((value) => value, {
    message: "Wajib diisi",
  }),
  thirdPartyConsent: z.boolean().refine((value) => value, {
    message: "Wajib diisi",
  }),
  marketingEmail: z.boolean(),
  marketingSms: z.boolean(),
  marketingPhone: z.boolean(),
})

export type LeadFormValues = z.infer<typeof leadSchema>

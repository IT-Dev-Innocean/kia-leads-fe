import { CheckCircle2 } from "lucide-react"
import type { LeadSubmission } from "@/components/LeadForm"

export function SuccessState({ submission }: { submission: LeadSubmission }) {
  return (
    <div className="mt-6 rounded-md border border-kia-line bg-white px-5 py-8 text-center">
      <CheckCircle2 className="mx-auto size-12 text-kia-navy" strokeWidth={1.5} />
      <h2 className="mt-4 text-xl font-semibold text-kia-black">Terima kasih</h2>
      <p className="mt-2 text-sm leading-6 text-kia-muted">
        Terima kasih, {submission.fullName}. Konsultan penjualan Kia akan segera
        menghubungi Anda.
      </p>
    </div>
  )
}

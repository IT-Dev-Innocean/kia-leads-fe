import { CheckCircle2, MapPin, Phone } from "lucide-react"
import type { LeadSubmission } from "@/components/LeadForm"

export function SuccessState({ submission }: { submission: LeadSubmission }) {
  return (
    <div className="mt-6 rounded-md border border-kia-line bg-white px-5 py-8 text-center">
      <CheckCircle2 className="mx-auto size-12 text-kia-navy" strokeWidth={1.5} />
      <h2 className="mt-4 text-xl font-semibold text-kia-black">Terima kasih</h2>
      <p className="mt-2 text-sm leading-6 text-kia-muted">
        Terima kasih, {submission.firstName}. Konsultan penjualan Kia akan segera
        menghubungi Anda.
      </p>
      <div className="mt-6 rounded-md bg-[#fafafa] px-4 py-4 text-left">
        <p className="text-xs font-semibold tracking-wide text-kia-muted">DEALER PILIHAN</p>
        <p className="mt-1 text-sm font-semibold text-kia-black">{submission.dealerName}</p>
        <p className="mt-2 flex gap-2 text-[13px] leading-5 text-kia-muted">
          <MapPin className="mt-0.5 size-4 shrink-0 text-kia-navy" />
          <span>{submission.address}</span>
        </p>
        {submission.phone ? (
          <p className="mt-2 flex gap-2 text-[13px] text-kia-muted">
            <Phone className="size-4 shrink-0 text-kia-navy" />
            <span>{submission.phone}</span>
          </p>
        ) : null}
      </div>
    </div>
  )
}

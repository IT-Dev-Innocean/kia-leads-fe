export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ")
}

export function normalizePhone(raw: string) {
  let digits = raw.replace(/\D/g, "")
  if (digits.startsWith("62")) digits = digits.slice(2)
  if (digits.startsWith("0")) digits = digits.slice(1)
  return digits.slice(0, 13)
}

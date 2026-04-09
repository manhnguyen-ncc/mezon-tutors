import dayjs from 'dayjs'

export function formatDateDMY(isoDateString: string): string {
  return dayjs(isoDateString).format('DD/MM/YYYY')
}

export function formatDate(isoDateString: string, format = 'DD/MM/YYYY'): string {
  return dayjs(isoDateString).format(format)
}

export function parseTimeParts(str: string): { hour: number; minute: number } {
  const parts = str.trim().split(':').map((p) => Number.parseInt(p, 10))
  return { hour: parts[0] ?? 0, minute: parts[1] ?? 0 }
}

export function timeToMinutes(str: string): number {
  const { hour, minute } = parseTimeParts(str)
  return hour * 60 + minute
}

export function minutesToTime(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60)
  const m = totalMinutes % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

export function utcDateToHHmm(input: Date): string {
  const h = String(input.getUTCHours()).padStart(2, '0')
  const m = String(input.getUTCMinutes()).padStart(2, '0')
  return `${h}:${m}`
}

export function utcDateToMinutes(input: Date): number {
  return input.getUTCHours() * 60 + input.getUTCMinutes()
}
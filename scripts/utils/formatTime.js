import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"

export function formatDate (dateAdded) {
  const today = dayjs()
  const postgresFormatted = dayjs(dateAdded)

  if (today.isSame(postgresFormatted, 'day')) {
    const hoursAgo = today.diff(postgresFormatted, 'hours')
    return `${hoursAgo}H AGO`
  }
  if (today.isSame(postgresFormatted, 'week')) {
    const daysAgo = today.diff(postgresFormatted, 'day')
    return `${daysAgo}D AGO`
  }
  if (today.isSame(postgresFormatted, 'year')) {
    return `${postgresFormatted.format('MMM, DD')}`
  }

  return `${postgresFormatted.format('DD/MM/YYYY')}`

}

export function formatDuration (seconds) {
  if (seconds < 60 ) {
    return `${seconds} s`
  }
  else if (seconds < 3600) {
    return `${Math.round(seconds/60)} m`
  }

  let hours = seconds / 3600
  let hoursDecimal = hours - Math.floor(hours)
  let minutes = Math.round(hoursDecimal * 60)
  return `${Math.floor(hours)}h ${minutes}m`
}


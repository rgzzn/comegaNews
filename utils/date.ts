/**
 * Returns a relative time string in Italian
 */
export const getRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Adesso';
  if (diffMins < 60) return `${diffMins} min fa`;
  if (diffHours < 24) return `${diffHours} ore fa`;
  if (diffDays === 1) return 'Ieri';
  return `${diffDays} gg fa`;
};

/**
 * Returns formatted time HH:mm
 */
export const formatClockTime = (date: Date): string => {
  return date.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
};

/**
 * Returns formatted date "Lun, 01 Gen"
 */
export const formatDateShort = (date: Date): string => {
  // Use generic stylistic formatting or Italian locale
  const d = date.toLocaleDateString('it-IT', { weekday: 'short', day: '2-digit', month: 'short' });
  // Capitalize first letter (e.g., "lun" -> "Lun")
  return d.charAt(0).toUpperCase() + d.slice(1);
};
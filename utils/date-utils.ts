/**
 * Date formatting utilities to prevent hydration mismatches
 * between server and client rendering
 */

/**
 * Format a date string consistently across server and client
 * Uses ISO format to avoid locale-specific formatting issues
 */
export function formatDate(dateString: string | Date): string {
  const date = new Date(dateString);

  // Check if date is valid
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  // Use a consistent format that won't change between server and client
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${month}/${day}/${year}`;
}

/**
 * Format a date for display with more readable format
 * Still consistent between server and client
 */
export function formatDateReadable(dateString: string | Date): string {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  const year = date.getFullYear();
  const month = date.toLocaleString("en-US", { month: "short" });
  const day = date.getDate();

  return `${month} ${day}, ${year}`;
}

/**
 * Format a date relative to now (e.g., "2 days ago")
 */
export function formatRelativeDate(dateString: string | Date): string {
  const date = new Date(dateString);
  const now = new Date();

  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return "Today";
  } else if (diffDays === 1) {
    return "Yesterday";
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else {
    const years = Math.floor(diffDays / 365);
    return `${years} year${years > 1 ? "s" : ""} ago`;
  }
}

/**
 * Check if a date is in the past
 */
export function isDatePast(dateString: string | Date): boolean {
  const date = new Date(dateString);
  const now = new Date();
  return date < now;
}

/**
 * Check if a date is today
 */
export function isDateToday(dateString: string | Date): boolean {
  const date = new Date(dateString);
  const now = new Date();

  return (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  );
}

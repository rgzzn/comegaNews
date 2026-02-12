/**
 * Attempts to extract an image URL from an HTML string (description/content).
 */
export const extractImageFromContent = (htmlContent: string): string | undefined => {
  if (!htmlContent) return undefined;

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, 'text/html');
  const img = doc.querySelector('img');
  
  return img?.src || undefined;
};
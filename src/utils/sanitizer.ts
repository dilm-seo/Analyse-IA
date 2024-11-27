import he from 'he';

export function sanitizeHtml(html: string): string {
  // Decode HTML entities
  const decoded = he.decode(html);
  
  // Remove CDATA tags
  const withoutCDATA = decoded.replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1');
  
  // Basic HTML sanitization
  const sanitized = withoutCDATA
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');
    
  return sanitized;
}
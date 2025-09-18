/**
 * Utility functions for generating and parsing SEO-friendly slugs for farmers
 */

export interface FarmerSlugData {
  id: string
  first_name: string
  last_name: string
  farmer_code?: string
}

/**
 * Converts a string to a URL-friendly slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    // Replace Spanish accents and special characters
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    // Replace spaces and special characters with hyphens
    .replace(/[^a-z0-9]+/g, '-')
    // Remove leading/trailing hyphens and consecutive hyphens
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-')
}

/**
 * Generates a SEO-friendly slug for a farmer
 * Format: first-name-last-name-id or farmer-code-id
 */
export function generateFarmerSlug(farmer: FarmerSlugData): string {
  const { id, first_name, last_name, farmer_code } = farmer

  // Option 1: Use full name + ID (primary choice for SEO)
  if (first_name && last_name) {
    const nameSlug = slugify(`${first_name} ${last_name}`)
    return `${nameSlug}-${id}`
  }

  // Option 2: Use farmer code + ID (fallback)
  if (farmer_code) {
    const codeSlug = slugify(farmer_code)
    return `${codeSlug}-${id}`
  }

  // Option 3: Just ID (ultimate fallback)
  return id
}

/**
 * Parses a farmer slug and extracts the farmer ID
 * Supports multiple formats:
 * - pablo-quezada-123 -> 123
 * - maria-garcia-456 -> 456
 * - pq-789 -> 789
 * - 123 -> 123 (legacy support)
 */
export function parseFarmerSlug(slug: string): string | null {
  if (!slug) return null

  // If it's just a number (legacy format), return it
  if (/^\d+$/.test(slug)) {
    return slug
  }

  // Extract ID from the end of the slug
  const parts = slug.split('-')
  const lastPart = parts[parts.length - 1]

  // Check if the last part is a valid ID (number)
  if (/^\d+$/.test(lastPart)) {
    return lastPart
  }

  return null
}

/**
 * Validates if a slug format is correct for a farmer
 */
export function isValidFarmerSlug(slug: string): boolean {
  return parseFarmerSlug(slug) !== null
}

/**
 * Generates alternative slug variations for a farmer (for redirect purposes)
 */
export function generateFarmerSlugVariations(farmer: FarmerSlugData): string[] {
  const variations: string[] = []
  const { id, first_name, last_name, farmer_code } = farmer

  // Main slug
  variations.push(generateFarmerSlug(farmer))

  // Additional variations for redirects
  if (first_name && last_name) {
    // First name only
    variations.push(`${slugify(first_name)}-${id}`)
    // Last name only
    variations.push(`${slugify(last_name)}-${id}`)
    // Initials
    variations.push(`${first_name[0].toLowerCase()}${last_name[0].toLowerCase()}-${id}`)
  }

  if (farmer_code) {
    variations.push(`${slugify(farmer_code)}-${id}`)
  }

  // Legacy ID
  variations.push(id)

  return [...new Set(variations)] // Remove duplicates
}

/**
 * Creates a farmer URL path with SEO-friendly slug
 */
export function createFarmerUrl(farmer: FarmerSlugData, basePath: string = '/agricultores'): string {
  const slug = generateFarmerSlug(farmer)
  return `${basePath}/${slug}`
}

/**
 * Creates a farmer video URL path with SEO-friendly slug
 */
export function createFarmerVideoUrl(
  farmer: FarmerSlugData,
  contentId: string,
  basePath: string = '/agricultores'
): string {
  const slug = generateFarmerSlug(farmer)
  return `${basePath}/${slug}/videos/${contentId}`
}

/**
 * Examples:
 *
 * const farmer = {
 *   id: '123',
 *   first_name: 'Pablo',
 *   last_name: 'Quezada',
 *   farmer_code: 'PQ'
 * }
 *
 * generateFarmerSlug(farmer) -> 'pablo-quezada-123'
 * parseFarmerSlug('pablo-quezada-123') -> '123'
 * createFarmerUrl(farmer) -> '/agricultores/pablo-quezada-123'
 * createFarmerVideoUrl(farmer, 'video-456') -> '/agricultores/pablo-quezada-123/videos/video-456'
 */
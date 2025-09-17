import { useState, useEffect, useRef } from 'react'

interface CacheEntry<T> {
  data: T
  timestamp: number
  ttl: number
}

class SimpleCache {
  private cache = new Map<string, CacheEntry<any>>()

  set<T>(key: string, data: T, ttlMinutes: number = 5): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttlMinutes * 60 * 1000 // Convert to milliseconds
    })
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key)
    if (!entry) return null

    // Check if expired
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key)
      return null
    }

    return entry.data as T
  }

  clear(): void {
    this.cache.clear()
  }

  delete(key: string): void {
    this.cache.delete(key)
  }
}

// Global cache instance
const globalCache = new SimpleCache()

export function useCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlMinutes: number = 5
) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const fetcherRef = useRef(fetcher)

  // Update fetcher ref when it changes
  useEffect(() => {
    fetcherRef.current = fetcher
  }, [fetcher])

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Try to get from cache first
        const cachedData = globalCache.get<T>(key)
        if (cachedData) {
          setData(cachedData)
          setLoading(false)
          return
        }

        // If not in cache, fetch fresh data
        const freshData = await fetcherRef.current()
        globalCache.set(key, freshData, ttlMinutes)
        setData(freshData)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'))
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [key, ttlMinutes])

  const refetch = async () => {
    // Clear cache for this key and refetch
    globalCache.delete(key)
    try {
      setLoading(true)
      setError(null)
      const freshData = await fetcherRef.current()
      globalCache.set(key, freshData, ttlMinutes)
      setData(freshData)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'))
    } finally {
      setLoading(false)
    }
  }

  const clearCache = () => {
    globalCache.clear()
  }

  return { data, loading, error, refetch, clearCache }
}
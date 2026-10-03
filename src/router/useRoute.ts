import { useSyncExternalStore } from 'react'
import { getLocation, subscribe, type Location } from './router'

/** Current location + matched route. Re-renders on every navigation. */
export function useRoute(): Location {
  return useSyncExternalStore(subscribe, getLocation)
}

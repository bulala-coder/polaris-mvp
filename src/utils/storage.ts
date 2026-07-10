export const storageKeys = {
  portfolioAssets: 'polaris.portfolioAssets',
  marketInput: 'polaris.marketInput',
  userPosition: 'polaris.userPosition',
}

function getLocalStorage() {
  if (typeof window === 'undefined' || !window.localStorage) {
    return null
  }

  return window.localStorage
}

export function readFromStorage<T>(key: string, fallback: T): T {
  const localStorage = getLocalStorage()

  if (!localStorage) {
    return fallback
  }

  try {
    const storedValue = localStorage.getItem(key)

    if (!storedValue) {
      return fallback
    }

    return JSON.parse(storedValue) as T
  } catch {
    return fallback
  }
}

export function writeToStorage<T>(key: string, value: T): void {
  const localStorage = getLocalStorage()

  if (!localStorage) {
    return
  }

  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    return
  }
}

export function removeFromStorage(key: string): void {
  const localStorage = getLocalStorage()

  if (!localStorage) {
    return
  }

  try {
    localStorage.removeItem(key)
  } catch {
    return
  }
}

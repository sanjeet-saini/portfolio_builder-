export function loadFromStorage(key, fallbackValue) {
  try {
    // Read saved JSON data. If nothing exists, use the fallback default value.
    const savedValue = localStorage.getItem(key);
    return savedValue ? JSON.parse(savedValue) : fallbackValue;
  } catch (error) {
    console.warn(`Could not load ${key} from localStorage`, error);
    return fallbackValue;
  }
}

export function saveToStorage(key, value) {
  try {
    // localStorage only stores strings, so objects/arrays are converted to JSON.
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Could not save ${key} to localStorage`, error);
  }
}

/**
 * User preferences utility module
 * Handles saving and loading user preferences from localStorage
 */

const PREFERENCES_KEY = 'atlt_user_preferences'

/**
 * Get default settings values
 * @returns {Object} Default settings object
 */
export function getDefaultSettings() {
  return {
    calcMethod: null, // Will be set to first available method in App.jsx
    savePreferencesCheckbox:  false
  }
}

/**
 * Load user preferences from localStorage
 * @returns {Object|null} User preferences object or null if not found
 */
export function loadPreferences() {
  try {
    const stored = localStorage.getItem(PREFERENCES_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error('Error loading preferences:', error)
  }
  return null
}

/**
 * Save user preferences to localStorage
 * @param {Object} preferences - Preferences object to save
 */
export function savePreferences(preferences) {
  try {
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences))
  } catch (error) {
    console.error('Error saving preferences:', error)
  }
}

/**
 * Clear user preferences from localStorage
 */
export function clearPreferences() {
  try {
    localStorage.removeItem(PREFERENCES_KEY)
  } catch (error) {
    console.error('Error clearing preferences:', error)
  }
}

/**
 * Merge user preferences with default settings
 * @param {Object} userPrefs - User preferences from storage
 * @param {Object} defaults - Default settings
 * @returns {Object} Merged settings object
 */
export function mergeWithDefaults(userPrefs, defaults) {
  if (!userPrefs) {
    return { ...defaults }
  }
  
  return {
    ...defaults,
    ...userPrefs
  }
}

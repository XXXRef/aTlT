/**
 * User preferences utility module
 * Handles saving and loading user preferences from localStorage
 */

const LSKEY_PREFERENCES = 'atlt_user_preferences'

/**
 * Get default settings values
 * @returns {Object} Default settings object
 */
export function getDefaultSettings() {
  return {
    calcMethod: null, // Will be set to first available method in App.jsx
    savePreferencesCheckbox:  true
  }
}

/**
 * Load user preferences from localStorage
 * @returns {Object|null} User preferences object or null if not found
 */
export function loadPreferences() {
  try {
    const stored = localStorage.getItem(LSKEY_PREFERENCES)
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
 * @param {Object} i_preferences - Preferences object to save
 */
export function savePreferences(i_preferences) {
  try {
    localStorage.setItem(LSKEY_PREFERENCES, JSON.stringify(i_preferences))
  } catch (error) {
    console.error('Error saving preferences:', error)
  }
}

/**
 * Clear user preferences from localStorage
 */
export function clearPreferences() {
  try {
    localStorage.removeItem(LSKEY_PREFERENCES)
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

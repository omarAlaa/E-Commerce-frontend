export const safeStorage = {
    get: (key) => {
        try {
            const item = localStorage.getItem(key)

            return item ? JSON.parse(item) : null
        } catch (error) {
            const e = new Error(`Failed to read ${key} from your local storage`)
            e.code = 'LOCAL_STORAGE_ERROR'
            throw e
        }
    },

    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value))
        } catch (error) {
            const e = new Error(`Failed to save ${key} to your local storage`)
            e.code = 'LOCAL_STORAGE_ERROR'
            throw e
        }
    },

    remove: (key) => {
        try {
            localStorage.removeItem(key)
        } catch (error) {
            throw new Error(`Failed to remove ${key} from your local storage`)
        }
    }
}
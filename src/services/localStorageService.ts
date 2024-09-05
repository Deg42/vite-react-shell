class LocalStorageService {
   
    setItem<T>(key: string, value: T): void {
        try {
            const serializedValue = JSON.stringify(value);
            localStorage.setItem(key, serializedValue);
        } catch (error) {
            console.error(`Error al guardar en localStorage la clave "${key}":`, error);
        }
    }

    getItem<T>(key: string): T | null {
        try {
            const serializedValue = localStorage.getItem(key);
            if (serializedValue === null) {
                return null;
            }
            return JSON.parse(serializedValue) as T;
        } catch (error) {
            console.error(`Error al obtener del localStorage la clave "${key}":`, error);
            return null;
        }
    }

    removeItem(key: string): void {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error(`Error al eliminar del localStorage la clave "${key}":`, error);
        }
    }

    clear(): void {
        try {
            localStorage.clear();
        } catch (error) {
            console.error("Error al limpiar el localStorage:", error);
        }
    }
}

export const localStorageService = new LocalStorageService();
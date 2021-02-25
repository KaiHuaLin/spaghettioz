export interface User { 
    uid: string,
    email: string,
    password: string,
    displayName?: string,
    favorite?: [string],
    pantry?: [string],
}
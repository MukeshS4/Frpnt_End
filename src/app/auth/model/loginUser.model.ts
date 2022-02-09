export interface LoginUser {
    userName : string;
    id: string;
    access_token: string;
    role: string;
    expires_in?: string;
    emailId: string;
}
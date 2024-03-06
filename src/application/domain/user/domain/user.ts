export class User {
    id: string;
    email: string;
    password: string;
    profile: string;

    constructor(id: string, email: string, password: string, profile: string) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.profile = profile;
    }
}
class UserModel {
    userID : number;
    username? : string;
    password? : string;
    email?: string;
    activated?: boolean;
    activationCode?: string

    constructor(
        userID : number,
        username? : string,
        password? : string,
        email?: string,
        activated?: boolean,
        activationCode?: string
    ){
        this.userID = userID;
        this.username = username;
        this.password = password;
        this.email = email;
        this.activated = activated;
        this.activationCode = activationCode
    }
}

export default UserModel
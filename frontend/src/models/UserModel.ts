class UserModel {
    userID : number;
    fullName?: string;
    password? : string;
    email?: string;
    activated?: boolean;
    activationCode?: string

    constructor(
        userID : number,
        fullName?: string,
        password? : string,
        email?: string,
        activated?: boolean,
        activationCode?: string
    ){
        this.userID = userID;
        this.fullName = fullName;
        this.password = password;
        this.email = email;
        this.activated = activated;
        this.activationCode = activationCode
    }
}

export default UserModel
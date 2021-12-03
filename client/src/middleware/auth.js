const storageName = 'userData';

class Auth {

    constructor() {
        this.data = {
            token: null,
            userId: null,

            update(token, userId) {
                this.token = token;
                this.userId = userId;
            }
        }; 
    }

    signIn(token, userId) {
        this.data.update(token, userId);

        localStorage.setItem(
            storageName,
            JSON.stringify({
                token, userId
            })
        );
    }

    signOut() {
        this.data.update(null, null);
        localStorage.removeItem(storageName);
    }

    refreshAccess() {
        const data = JSON.parse(localStorage.getItem(storageName));
        if (data && data.token) {
            this.signIn(data.token, data.userId);
        }
    }
}

export default Auth;

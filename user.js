class User{
    constructor(username, password){
        this.username = username;
        this.password = password;
        this.exp = 0;
        this.level = 1;
        this.coin = 0;
        // gender, birthday, place, interests, profile, questions
    }

    addExp(exp_increment){
        this.exp += exp_increment;
        //this.level        change the level
    }

    addCoin(coin_increment){
        this.coin += coin_increment;
    }
}



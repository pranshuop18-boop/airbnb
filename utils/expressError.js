class ExpressError extends Error{
    constructor(statusCode,message){
        super();
        this.statusCode =statuscodde;
        this.message = message;
    }
}

module.exports = ExpressError;
export default class ApiError extends Error{
    constructor(status, message, errors) {
        super()
        this.message = message
        this.status = status
    }
    static UnathorizedError(){
        return new ApiError(401, 'Пользователь не авторизован')
    }

    static BadRequest(message){
        return new ApiError(400, message)
    }

    static Internal(message){
        return new ApiError(500, message)
    }

    static Forbidden(message){
        return new ApiError(403, message)
    }
}
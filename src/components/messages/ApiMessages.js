import ApiManager from '../../modules/ApiManager'

const ApiMessages = {
    getAllMessages(){
        return ApiManager.getAll("messages", "_expand=user&_sort=timestamp&_ord=asc")
    }
}

export default ApiMessages
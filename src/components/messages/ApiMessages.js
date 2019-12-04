import ApiManager from '../../modules/ApiManager'

const ApiMessages = {
    getAllMessages(){
        return ApiManager.getAll("messages", "_expand=user&_sort=timestamp&_ord=asc")
    },
    deleteUserMessage(id){
        return ApiManager.delete("messages", id)
    },
    getSingleMessage(id){
        return ApiManager.get("messages", id)
    },
    saveEditedMessage(editedMessageObj){
        return ApiManager.update("messages", editedMessageObj)
    },
    postNewMessage(newMessageObj){
        return ApiManager.post("messages", newMessageObj)
    }
}

export default ApiMessages
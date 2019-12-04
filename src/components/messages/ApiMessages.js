import ApiManager from '../../modules/ApiManager'

// TODO: replace variable below with localStorage once registration/login implemented
// const loggedInUser = 1

const ApiMessages = {
    getAllMessages(){
        return ApiManager.getAll("messages", "_expand=user")
    }
}

export default ApiMessages
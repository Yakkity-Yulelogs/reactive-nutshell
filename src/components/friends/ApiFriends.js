import ApiManager from '../../modules/ApiManager'

// TODO: replace variable below with localStorage once registration/login implemented
const loggedInUser = 1

const ApiFriends = {
    getAllFriendsWithNames() {
        return ApiManager.getAll("friends", `loggedInUser=${loggedInUser}&_expand=user`)
    },
    removeFriend(id) {
        return ApiManager.delete("friends", id)
    },
    searchUsersByKeyWord(searchTerm){
        return ApiManager.getAll("users", `fullName_like=${searchTerm}`)
    },
    followNewFriend(connectionObj){
        return ApiManager.post("friends", connectionObj)
    }
}

export default ApiFriends
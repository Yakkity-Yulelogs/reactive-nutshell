import ApiManager from '../../modules/ApiManager'

// TODO: replace variable below with localStorage once registration/login implemented
function loggedInUserId() {return parseInt(localStorage.getItem("userId"))}

const ApiFriends = {
    getAllFriendsWithNames() {
        return ApiManager.getAll("friends", `loggedInUser=${loggedInUserId()}&_expand=user`)
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
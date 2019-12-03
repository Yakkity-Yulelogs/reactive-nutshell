import ApiManager from '../../modules/ApiManager'

const ApiFriends = {
    getAllFriendsWithNames() {
        return ApiManager.getAll("friends", "_expand=user")
    },
    removeFriend(id) {
        return ApiManager.delete("friends", id)
    }
}

export default ApiFriends
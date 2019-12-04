import ApiManager from '../../modules/ApiManager'

export default {
    getOwnEventsSorted(userId) {
        return ApiManager.getAll("events", `userId=${userId}&_sort=eventDate&_order=asc`)
    },

    getUserAndFriendEventsSorted(userId, friendString) {
        return ApiManager.getAll("events", `userId=${userId}${friendString}&_sort=eventDate&_order=asc`)
    },

    getAllFriends(user) {
        return ApiManager.getAll("friends", `loggedInUser=${user}`)
    },

    addNewEvent(eventObject) {
        return ApiManager.post("events", eventObject)
    }


}
/*
    Purpose: Customized functions to make fetch calls for events from ApiManager
    Author(s): Ryan Crowley
*/

import ApiManager from '../../modules/ApiManager'

export default {
    getUserAndFriendEventsSorted(userId, friendString) {
        return ApiManager.getAll("events", `userId=${userId}${friendString}&_sort=eventDate&_order=asc`)
    },

    getAllFriends(user) {
        return ApiManager.getAll("friends", `loggedInUser=${user}`)
    },

    addNewEvent(eventObject) {
        return ApiManager.post("events", eventObject)
    },

    deleteEvent(id) {
        return ApiManager.delete("events", id)
    }
}
import ApiManager from '../../modules/ApiManager'

export default {

    //Fetch call to get all friends

    getAllFriends(user) {
        return ApiManager.getAll("friends", `loggedInUser=${user}`)
    },

    //Fetch call to get all articles of user and friends, sorts the by timestamp descending, and expands on users

    getUserAndFriendsArticlesSorted(userId, friendString) {
        return ApiManager.getAll("articles", `userId=${userId}${friendString}&_sort=timestamp&_order=asc&_expand=user`)
    }
}
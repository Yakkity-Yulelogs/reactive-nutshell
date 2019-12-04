import ApiManager from '../../modules/ApiManager'

export default {
    getAllFriends(user) {
        return ApiManager.getAll("friends", `loggedInUser=${user}`)
    },

    getUserAndFriendsArticlesSorted(userId, friendString) {
        return ApiManager.getAll("articles", `userId=${userId}${friendString}&_sort=timestamp&_order=asc&_expand=user`)
    }
}
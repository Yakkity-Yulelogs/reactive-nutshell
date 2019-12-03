import ApiManager from '../../modules/ApiManager'

export default {
    getOwnEventsSorted(userId) {
        return ApiManager.getAll("events", `userId=${userId}&_sort=eventDate&_order=asc`)
    }

}
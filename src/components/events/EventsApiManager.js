import ApiManager from '../../modules/ApiManager'

export default {
    getOwnEventsSorted(id) {
        return ApiManager.getAll("events", `userId=${id}&_sort=eventDate&_order=asc`)
    }

}
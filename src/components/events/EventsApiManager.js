import ApiManager from '../../modules/ApiManager'

export default {
    getAllEvents () {
        return ApiManager.getAll("events")
    }

}
/*
    Purpose: Helper functions that can be exported for use by other modules and components.
    Author(s): Ryan Crowley
*/

// returns boolean of whether event takes place before today or not before today
export function isCurrentEvent (eventObject) {
    const now = new Date()
    const nowDay = (now.getDay()) + 1
    const nowYear = now.getFullYear()
    const nowMonth = (now.getMonth()) + 1

    const eventFullDate = eventObject.eventDate
    const eventDay = parseInt(eventFullDate.slice(8, 10))
    const eventMonth = parseInt(eventFullDate.slice(5, 7))
    const eventYear = parseInt(eventFullDate.slice(0, 5))

    if (eventYear >= nowYear) {
        if (eventMonth >= nowMonth || eventYear > nowYear) {
            if (eventDay >= nowDay || eventMonth > nowMonth || eventYear > nowYear) {
                return true
            }
        }
    } else {
        return false
    }
}
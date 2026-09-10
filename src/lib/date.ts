import {
    parseISO,
    format,
    eachDayOfInterval,
    formatISO,
    toDate,
    isValid,
    startOfWeek,
    endOfWeek,
} from "date-fns";


/**
 * Returns [
 *      {
 *          date: ....,
 *          str: ....,
 *      },
 *      ....
 * ]
 *
 */
export function toInterval(start, length) {

   // Calculate start/end of mealplan interval (week)
    let intervalStart = toDate(start || new Date())
    if (!isValid(intervalStart)) {
        intervalStart = toDate(new Date());
    }

    // TODO: handle more than week
    intervalStart = startOfWeek(intervalStart);
    const intervalEnd = endOfWeek(intervalStart);

    // Calculate timespan for all dates in interval
    return eachDayOfInterval({
            start: intervalStart,
            end:   intervalEnd
        }).map((date) => ({
            date:  date,
            iso:   formatISO(date, {representation: 'date'}),
            month: format(date, 'MMM'),
            day:   format(date, 'd'),
            weekday: format(date, 'E'),
            
        }))
}

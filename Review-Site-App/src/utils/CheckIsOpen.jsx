const daysOfWeekMap = new Map();

const daysOfWeekArray = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

// create map of days of week and corresponding values 0-6 for Sunday - Saturday
daysOfWeekArray.map((val, idx) => daysOfWeekMap.set(idx, val));

// MOVE THIS TO SEPARATE FOLDER?
const checkIsOpen = (hoursArray) => {
  // grab current day string from map
  const currentDate = new Date();
  const currentDay = daysOfWeekMap.get(currentDate.getDay());

  // find record for a businesses' hours for the current day
  const todaysHours = hoursArray?.find(
    (item) => item.day_of_week === currentDay
  );
  // if business has no hours for particular day, assume them to be closed
  if (!todaysHours)
    return <p className="text-sm text-rose-600 font-bold">Closed Today</p>;

  // convert today's hours to a date object for business
  const closingHour = new Date(todaysHours.close_time);

  const openingHour = new Date(todaysHours.open_time);

  // convert dates passed in and current date to total time in seconds (hours * seconds in an hour + minutes *... etc)
  const currTimeInSeconds =
    currentDate.getHours() * Math.pow(60, 2) +
    currentDate.getMinutes() * 60 +
    currentDate.getSeconds();

  const closingTimeInSeconds =
    closingHour.getHours() * Math.pow(60, 2) + closingHour.getMinutes() * 60;

  const openingTimeInSeconds =
    openingHour.getHours() * Math.pow(60, 2) + openingHour.getMinutes() * 60;

  if (
    closingTimeInSeconds > currTimeInSeconds &&
    openingTimeInSeconds < currTimeInSeconds
  ) {
    return (
      <p className="text-sm">
        <span className="font-bold text-emerald-600">Open</span> until{" "}
        {closingHour.toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        })}
      </p>
    );
  }
  // Return for else will reference opening hour of next day
  else {
    const tomorrow = daysOfWeekMap.get(currentDate.getDay() + 1);
    // find tomorrows hours for business
    // ADD HANDLING IF NO HOURS FOR TOMOROW
    const tomorrowHours = hoursArray?.find(
      (item) => item.day_of_week === tomorrow
    );

    const tomorrowOpeningHour = new Date(
      tomorrowHours.open_time
    ).toLocaleTimeString([], {
      // return hours and minutes
      hour: "numeric",
      minute: "2-digit",
    });

    return (
      <p className="text-sm">
        <span className="text-rose-600 font-bold">Closed </span>
        until {tomorrowOpeningHour} tomorrow
      </p>
    );
  }
};

export default checkIsOpen;

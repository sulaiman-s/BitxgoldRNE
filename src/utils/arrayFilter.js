export const filterArrayAndReturnTotal = (array, type) => {
  var amount = 0;
  array?.filter((item) => {
    if (item.type === type) {
      amount = amount + item.bxg;
    }
  });
  return amount;
};

import moment from "moment";

export const getType = (StartTime) => {
  const startTimeObject = moment(StartTime);
  let string1 = "";
  const currentTime = moment();
  const difference = currentTime.diff(startTimeObject, "days"); // get the difference in days
  if (difference > 30) {
    // check if the difference is more than 30 days
    string1 = "Claim";
  } else {
    string1 = "UnStake";
  }
  return string1;
};

export const timer = (StartTime) => {
  const startTimeObject = moment(StartTime); // create a Moment object from the start time
  const currentTime = moment(); // create a Moment object from the current time
  const difference = currentTime.diff(startTimeObject); // get the difference in milliseconds
  const months = Math.round(difference / (1000 * 60 * 60 * 24 * 30)); // get the months from the difference
  const days = Math.round(
    (difference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)
  ); // get the days from the difference
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  ); // get the hours from the difference
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)); // get the minutes from the difference
  const seconds = Math.floor((difference % (1000 * 60)) / 1000); // get the seconds from the difference

  const string1 = `${months}m ${days}d ${hours}h ${minutes}m ${seconds}s`; // format the output string

  return string1;
};

// export const timer = (StartTime) => {
//   const startTimeObject = new Date(StartTime);

//   let string1 = "";
//   const currentTime = new Date();
//   const difference = currentTime - startTimeObject;
//   const months = Math.floor(difference / (1000 * 60 * 60 * 24 * 30));
//   const days = Math.floor(
//     (difference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)
//   );
//   const hours = Math.floor(
//     (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//   );
//   const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
//   const seconds = Math.floor((difference % (1000 * 60)) / 1000);

//   string1 = `${months}m ${days}d ${hours}h ${minutes}m ${seconds}s `;

//   return string1;
// };

// export const getType = (StartTime) => {
//   const startTimeObject = new Date(StartTime);

//   let string1 = "";
//   const currentTime = new Date();
//   const difference = currentTime - startTimeObject;
//   const months = Math.floor(difference / (1000 * 60 * 60 * 24 * 30));
//   const days = Math.floor(
//     (difference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)
//   );

//   if (months >= 0 || days >= 0) {
//     string1 = "Claim";
//   } else {
//     string1 = "UnStake";
//   }
//   console.log(string1);
//   return string1;
// };

export const getDate = (date) => {
  //get formatted date by auto detecting timezone
  const formattedDate = new Date(date).toLocaleString();
  return formattedDate;
};

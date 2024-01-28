export const convertMillisecondsToTime = (milliseconds: number) => {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;

  return {
    hrs: hours < 10 ? `0${hours}` : hours,
    min: minutes < 10 ? `0${minutes}` : minutes,
    sec: seconds < 10 ? `0${seconds}` : seconds,
  };
};

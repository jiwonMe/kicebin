import { differenceInSeconds } from 'date-fns';

const differenceInAppropriateUnits = (date1: Date, date2: Date) => {
  let value = 0;
  let unit = '';

  const diff = differenceInSeconds(date1, date2);
  if (diff < 60) {
    value = diff;
    unit = '초';
  } else if (diff < 60 * 60) {
    value = Math.floor(diff / 60);
    unit = '분';
  } else if (diff < 60 * 60 * 24) {
    value = Math.floor(diff / (60 * 60));
    unit = '시간';
  } else if (diff < 60 * 60 * 24 * 7) {
    value = Math.floor(diff / (60 * 60 * 24));
    unit = '일';
  } else if (diff < 60 * 60 * 24 * 7 * 4) {
    value = Math.floor(diff / (60 * 60 * 24 * 7));
    unit = '주';
  } else if (diff < 60 * 60 * 24 * 7 * 4 * 12) {
    value = Math.floor(diff / (60 * 60 * 24 * 7 * 4));
    unit = '달';
  } else if (diff < 60 * 60 * 24 * 7 * 4 * 12 * 365) {
    value = Math.floor(diff / (60 * 60 * 24 * 7 * 4 * 12));
    unit = '년';
  }
  return `${value}${unit}`;
};

export default differenceInAppropriateUnits;

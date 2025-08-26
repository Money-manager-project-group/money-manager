function twoDigit(number) {
  if (number < 10) number = "0" + number;
  return number;
}

export function getFormattedDate(date) {
  if (!date) {
    return new Date().getDate();
  }
  return (
    date.getFullYear() +
    "-" +
    twoDigit(date.getMonth() + 1) +
    "-" +
    twoDigit(date.getDate())
  );
}

export function formatKoreanMonth(date) {
  if (!date) {
    return new Date().getDate();
  }
  return date.getFullYear() + "년 " + (date.getMonth() + 1) + "월";
}

export function formatKoreanDate(date) {
  if (!date) {
    return new Date().getDate();
  }
  return (
    date.getFullYear() +
    "년 " +
    (date.getMonth() + 1) +
    "월 " +
    date.getDate() +
    "일"
  );
}

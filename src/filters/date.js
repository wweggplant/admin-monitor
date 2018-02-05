let format = (val, fmt = 'YYYY-MM-DD HH:mm:ss') => {
  return moment(val).format(fmt);
};
let formatDate = (val) => {
  return format(val, 'YYYY-MM-DD');
}
let datetimeArrFormat = (datetimeArr) => {
  return datetimeArr.map(item => item.length ? [format(item[0]), format(item[1])] : item);
};
let datetimeFormat = (datetime) => {
  return datetime.length ? [format(datetime[0]), format(datetime[1])] : datetime;
};
export {
  format, formatDate, datetimeArrFormat, datetimeFormat
}

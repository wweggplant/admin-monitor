import numeral from 'numeral';

let numFormat = (num, fomart = '0.00') => {
  if (num === '--') {
    return '--'
  } else {
    return numeral(num).format(fomart)
  }
};
let percentageFormat = (num, fomart = '0.00%') => {
  if (num === '--') {
    return '--'
  } else {
    return numeral(num).format(fomart)
  }
};
export default{
  numFormat,
  percentageFormat
}

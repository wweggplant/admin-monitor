import number from '@/filters/number';
export default {
  title: {
    x: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter (params) {
      return `${number.numFormat(params.value)}:${number.percentageFormat(params.value)}`;
    }
  },
  legend: {
    orient: 'vertical',
    left: 'right',
    data: []
  },
  series: [
    {
      name: '',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
      label: {
        normal: {
          show: false
        }
      },
    }
  ]
};

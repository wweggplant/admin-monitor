export default {
  title: {},
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: []
  },
  grid: [
    {
      left: 50,
      right: 50,
      top: 50,
      bottom: 50,
    },
  ],
  dataZoom: [
    {
      type: 'slider',
      show: true,
      xAxisIndex: [0],
      start: 0,
      end: 100,
      height: 15,
      bottom: 15,
      fillerColor: '#c3c3c3'
    },
    {
      type: 'inside',
      xAxisIndex: [0],
      start: 0,
      end: 100
    }
  ],
  calculable: true,
  xAxis: [
    {
      type: 'category',
      data: []
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      type: 'bar',
      data: [],
    }
  ]
};

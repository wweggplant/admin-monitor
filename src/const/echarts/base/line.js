import numeral from 'numeral';
import {format} from '@/filters/date';
export default {
  title: {
    padding: 0,
    top: 0,
    text: '',
    textStyle: {
      fontSize: 14
    },
    x: 'center',
    align: 'right'
  },
  grid: [
    {
      left: 50,
      right: 50,
      top: 50,
      bottom: 50,
    },
  ],
  tooltip: {
    trigger: 'axis',
    formatter (params) {
      params = params[0];
      return `${numeral(params.value[1]).format('0.000')}`;
    },
    axisPointer: {
      type: 'cross'
    },
  },
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
  xAxis: [
    {
      type: 'time',
      splitNumber: 10,
      axisLabel: {
        formatter (value) {
          return format(new Date(value), 'MM-DD HH:mm');
        }
      },
      axisPointer: {
        label: {
          formatter (params) {
            // console.log(echarts.format.formatTime(params.value));
            return format(new Date(params.value), 'MM-DD HH:mm');
          }
        }
      }
    }
  ],
  yAxis: [
    {
      splitNumber: 5,
      max (value) {
        let d = Math.abs(value.max - value.min);
        let max = numeral(value.max + d * 0.2).format('0.00');
        if (max < value.max) {
          return numeral(value.max + 0.01).format('0.00');
        } else {
          return max;
        }
      },
      min (value) {
        let d = Math.abs(value.max - value.min);
        let min = numeral(value.min - d * 0.2).format('0.00');
        if (min > value.min) {
          return numeral(value.max - 0.01).format('0.00');
        } else {
          return min;
        }
      },
      type: 'value',
      show: true
    }
  ],
  legend: {
    show: true,
    top: 10,
    padding: 0,
    // left: 'center',
    data: [''],
    x: 'center'
  },
  series: [
    {
      type: 'line',
      smooth: true,
      markPoint: {
        label: {
          normal: {
            formatter (params) {
              return `${numeral(params.value).format('0.000')}`;
            }
          }
        },
        data: [
          {type: 'max', name: '最大值'},
          {type: 'min', name: '最小值'}
        ]
      },
      markLine: {
        lineStyle: {
          normal: {
            type: 'dashed',
            color: 'black'
          }
        },
        data: [
          {
            type: 'average',
            name: '平均值',
            label: {
              normal: {
                position: 'end',
                formatter: '平均值'
              }
            },
          },
          [{
            symbol: 'none',
            x: '90%',
            yAxis: 'max'
          }, {
            symbol: 'circle',
            label: {
              normal: {
                position: 'start',
                formatter: '最大值'
              }
            },
            type: 'max',
            name: '最高点'
          }],
          [
            {
              symbol: 'none',
              x: '90%',
              yAxis: 'min'
            },
            {
              symbol: 'circle',
              label: {
                normal: {
                  position: 'start',
                  formatter: '最小值'
                }
              },
              type: 'min',
              name: '最低'
            }
          ]
        ]
      },
      lineStyle: {
        normal: {
          color: '#31879d'
        }
      },
      itemStyle: {
        normal: {
          color: '#60ab9d'
        }
      },
      areaStyle: {
        normal: {
          color: '#d3eef4'
        }
      },
      data: []
    }
  ]
}

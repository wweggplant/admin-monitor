// 5%以下，5%-10%，10%-20%，20%-40%，40%以上
export default {
  abnor: {
    list: [
      {
        name: '5%以下',
        max: 0.05,
      },
      {
        name: '5%-10%',
        min: 0.05,
        max: 0.1
      },
      {
        name: '10%-20%',
        min: 0.1,
        max: 0.2
      },
      {
        name: '20%-40%',
        min: 0.2,
        max: 0.4,
      },
      {
        name: '40%以上',
        min: 0.4
      }
    ],
  },
  common: {
    'pre': {
      dailyAttr: 'avgValue',
      focusAttr: 'focusAvgValue',
      list: [
        {
          name: '0.15MPa以下',
          max: 0.15,
        },
        {
          name: '0.15-0.25Mpa',
          min: 0.15,
          max: 0.25
        },
        {
          name: '0.25-0.35Mpa',
          min: 0.25,
          max: 0.35
        },
        {
          name: '0.35MPa-0.45MPa',
          min: 0.35,
          max: 0.45,
        },
        {
          name: '0.45MPa以上',
          min: 0.45,
        },
      ]
    },
    'ins': {
      dailyAttr: 'avgValue',
      focusAttr: 'focusAvgValue',
      list: [
        {
          name: '0-5m³/h',
          max: 5,
        },
        {
          name: '5-10m³/h',
          min: 5,
          max: 10
        },
        {
          name: '10-25m³/h',
          min: 10,
          max: 25
        },
        {
          name: '25-50m³/h',
          min: 25,
          max: 50,
        },
        {
          name: '50m³/h以上',
          min: 50,
        },
      ]
    },
    'acc': {
      focusAttr: 'waterSupply',
      dailyAttr: 'dailySupport',
      list: [
        {
          name: '0-20m³',
          max: 20,
        },
        {
          name: '20-50m³',
          min: 20,
          max: 50
        },
        {
          name: '50-100m³',
          min: 50,
          max: 100
        },
        {
          name: '100-250m³',
          min: 100,
          max: 250,
        },
        {
          name: '250-500m³',
          min: 250,
          max: 500,
        },
        {
          name: '500m³以上',
          min: 500,
        },
      ]
    },
    'grp': {
      focusAttr: 'waterSupply',
      dailyAttr: 'dailySupport',
      list: [
        {
          name: '0-20m³',
          max: 20,
        },
        {
          name: '20-50m³',
          min: 20,
          max: 50
        },
        {
          name: '50-100m³',
          min: 50,
          max: 100
        },
        {
          name: '100-250m³',
          min: 100,
          max: 250,
        },
        {
          name: '250-500m³',
          min: 250,
          max: 500,
        },
        {
          name: '500m³以上',
          min: 500,
        },
      ]
    },
  },
  analysis: {
    list: [
      {
        name: '0-0.16MPa',
        max: 0.16,
      },
      {
        name: '0.16-0.25MPa',
        min: 0.16,
        max: 0.25
      },
      {
        name: '0.25-0.45MPa',
        min: 0.25,
        max: 0.45
      },
      {
        name: '0.45-0.6MPa',
        min: 0.45,
        max: 0.6,
      },
      {
        name: '0.6MPa以上',
        min: 0.6,
      },
    ],
    dynamic ({minFlow, boundaryFlow, commonFlow, overloadFlow}) {
      return [
        {
          name: `0-${minFlow}m³/h`,
          max: minFlow,
        },
        {
          name: `${minFlow}-${boundaryFlow}m³/h`,
          min: minFlow,
          max: boundaryFlow
        },
        {
          name: `${boundaryFlow}-${commonFlow}m³/h`,
          min: boundaryFlow,
          max: commonFlow
        },
        {
          name: `${commonFlow}-${overloadFlow}m³/h`,
          min: commonFlow,
          max: overloadFlow
        },
        {
          name: `${overloadFlow}m³/h以上`,
          min: overloadFlow,
        }]
    }
  },
}

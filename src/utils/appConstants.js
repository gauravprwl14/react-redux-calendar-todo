const sensorTypes = {
  acc: "acc",
  env3: "env3",
  vel: "vel",
  temp: "temp"
};

const appConstants = {
  sensorTypes,
  wheelCategory: {
    boogie1: {
      code: "boogie1"
    },
    boogie2: {
      code: "boogie2"
    },
    aircon: {
      code: "aircon"
    }
  },
  speedCategory: {
    acc: {
      code: "acc"
    },
    vel: {
      code: "vel"
    },
    env3: {
      code: "env3"
    }
  },

  boogieType: {
    boogieOne: {
      code: "boogie1"
    },
    boogieTwo: {
      code: "boogie2"
    }
  },
  sensorAlias: {
    dt: {
      wheelA1Acc: {
        code: sensorTypes.acc,
        name: "Wheel A1-Acc"
      },
      wheelA1Env3: {
        code: sensorTypes.env3,
        name: "Wheel A1-Env3"
      },
      wheelA1Vel: {
        code: sensorTypes.vel,
        name: "Wheel A1-Vel"
      },

      wheelA2Acc: {
        code: sensorTypes.acc,
        name: "Wheel A2-Acc"
      },
      wheelA2Env3: {
        code: sensorTypes.env3,
        name: "Wheel A2-Env3"
      },
      wheelA2Vel: {
        code: sensorTypes.vel,
        name: "Wheel A2-Vel"
      },

      wheelA3Acc: {
        code: sensorTypes.acc,
        name: "Wheel A3-Acc"
      },
      wheelA3Env3: {
        code: sensorTypes.env3,
        name: "Wheel A3-Env3"
      },
      wheelA3Vel: {
        code: sensorTypes.vel,
        name: "Wheel A3-Vel"
      },

      wheelA4Acc: {
        code: sensorTypes.acc,
        name: "Wheel A4-Acc"
      },
      wheelA4Env3: {
        code: sensorTypes.env3,
        name: "Wheel A4-Env3"
      },
      wheelA4Vel: {
        code: sensorTypes.vel,
        name: "Wheel A4-Vel"
      },

      wheelB1Acc: {
        code: sensorTypes.acc,
        name: "Wheel B1-Acc"
      },
      wheelB1Env3: {
        code: sensorTypes.env3,
        name: "Wheel B1-Env3"
      },
      wheelB1Vel: {
        code: sensorTypes.vel,
        name: "Wheel B1-Vel"
      },

      wheelB2Acc: {
        code: sensorTypes.acc,
        name: "Wheel B2-Acc"
      },
      wheelB2Env3: {
        code: sensorTypes.env3,
        name: "Wheel B2-Env3"
      },
      wheelB2Vel: {
        code: sensorTypes.vel,
        name: "Wheel B2-Vel"
      },

      wheelB3Acc: {
        code: sensorTypes.acc,
        name: "Wheel B3-Acc"
      },
      wheelB3Env3: {
        code: sensorTypes.env3,
        name: "Wheel B3-Env3"
      },
      wheelB3Vel: {
        code: sensorTypes.vel,
        name: "Wheel B3-Vel"
      },
      wheelB4Acc: {
        code: sensorTypes.acc,
        name: "Wheel B4-Acc"
      },
      wheelB4Env3: {
        code: sensorTypes.env3,
        name: "Wheel B4-Env3"
      },
      wheelB4Vel: {
        code: sensorTypes.vel,
        name: "Wheel B4-Vel"
      },

      motorA2Acc: {
        code: sensorTypes.acc,
        name: "Motor A2 Acc"
      },
      motorA2Env3: {
        code: sensorTypes.env3,
        name: "Motor A2 Env3"
      },
      motorA2Vel: {
        code: sensorTypes.vel,
        name: "Motor A2 Vel"
      },
      motorA2Temp: {
        code: sensorTypes.temp,
        name: "Motor A2 Temp"
      },
      motorB3Acc: {
        code: sensorTypes.acc,
        name: "Motor B3 Acc"
      },
      motorB3Env3: {
        code: sensorTypes.env3,
        name: "Motor B3 Env3"
      },
      motorB3Vel: {
        code: sensorTypes.vel,
        name: "Motor B3 Vel"
      },
      motorB3Temp: {
        code: sensorTypes.temp,
        name: "Motor B3 Temp"
      },

      airComAAcc: {
        code: sensorTypes.acc,
        name: "Air Comp A Acc"
      },
      airComAEnv3: {
        code: sensorTypes.env3,
        name: "Air Comp A Env3"
      },
      airComAVel: {
        code: sensorTypes.vel,
        name: "Air Comp A Vel"
      },
      airComATemp: {
        code: sensorTypes.temp,
        name: "Air Comp A Temp"
      },

      airComA1Acc: {
        code: sensorTypes.acc,
        name: "Aircon Comp A1 Acc"
      },
      airComA1Env3: {
        code: sensorTypes.env3,
        name: "Aircon Comp A1 Env3"
      },
      airComA1Vel: {
        code: sensorTypes.vel,
        name: "Aircon Comp A1 Vel"
      },
      airComA1Temp: {
        code: sensorTypes.temp,
        name: "Aircon Comp A1 Temp"
      },

      airComB2Acc: {
        code: sensorTypes.acc,
        name: "Aircon Comp B2 Acc"
      },
      airComB2Env3: {
        code: sensorTypes.env3,
        name: "Aircon Comp B2 Env3"
      },
      airComB2Vel: {
        code: sensorTypes.vel,
        name: "Aircon Comp B2 Vel"
      },
      airComB2Temp: {
        code: sensorTypes.temp,
        name: "Aircon Comp B2 Temp"
      },

      comfortA3Acc: {
        code: sensorTypes.acc,
        name: "Comfort A3 Acc"
      },
      comfortA3Vel: {
        code: sensorTypes.vel,
        name: "Comfort A3 Vel"
      },

      comfortB1Acc: {
        code: sensorTypes.acc,
        name: "Comfort B1 Acc"
      },
      comfortB1Vel: {
        code: sensorTypes.vel,
        name: "Comfort B1 Vel"
      },
      speed1: {
        code: sensorTypes.acc,
        name: "Speed_1"
      },
      speed2: {
        code: sensorTypes.env3,
        name: "Speed_2"
      }
    },

    mp: {
      wheelA1Acc: {
        code: sensorTypes.acc,
        name: "Wheel A1-Acc"
      },
      wheelA1Env3: {
        code: sensorTypes.env3,
        name: "Wheel A1-Env3"
      },
      wheelA1Vel: {
        code: sensorTypes.vel,
        name: "Wheel A1-Vel"
      },

      wheelA2Acc: {
        code: sensorTypes.acc,
        name: "Wheel A2-Acc"
      },
      wheelA2Env3: {
        code: sensorTypes.env3,
        name: "Wheel A2-Env3"
      },
      wheelA2Vel: {
        code: sensorTypes.vel,
        name: "Wheel A2-Vel"
      },

      wheelA3Acc: {
        code: sensorTypes.acc,
        name: "Wheel A3-Acc"
      },
      wheelA3Env3: {
        code: sensorTypes.env3,
        name: "Wheel A3-Env3"
      },
      wheelA3Vel: {
        code: sensorTypes.vel,
        name: "Wheel A3-Vel"
      },

      wheelA4Acc: {
        code: sensorTypes.acc,
        name: "Wheel A4-Acc"
      },
      wheelA4Env3: {
        code: sensorTypes.env3,
        name: "Wheel A4-Env3"
      },
      wheelA4Vel: {
        code: sensorTypes.vel,
        name: "Wheel A4-Vel"
      },

      wheelB1Acc: {
        code: sensorTypes.acc,
        name: "Wheel B1-Acc"
      },
      wheelB1Env3: {
        code: sensorTypes.env3,
        name: "Wheel B1-Env3"
      },
      wheelB1Vel: {
        code: sensorTypes.vel,
        name: "Wheel B1-Vel"
      },

      wheelB2Acc: {
        code: sensorTypes.acc,
        name: "Wheel B2-Acc"
      },
      wheelB2Env3: {
        code: sensorTypes.env3,
        name: "Wheel B2-Env3"
      },
      wheelB2Vel: {
        code: sensorTypes.vel,
        name: "Wheel B2-Vel"
      },

      wheelB3Acc: {
        code: sensorTypes.acc,
        name: "Wheel B3-Acc"
      },
      wheelB3Env3: {
        code: sensorTypes.env3,
        name: "Wheel B3-Env3"
      },
      wheelB3Vel: {
        code: sensorTypes.vel,
        name: "Wheel B3-Vel"
      },
      wheelB4Acc: {
        code: sensorTypes.acc,
        name: "Wheel B4-Acc"
      },
      wheelB4Env3: {
        code: sensorTypes.env3,
        name: "Wheel B4-Env3"
      },
      wheelB4Vel: {
        code: sensorTypes.vel,
        name: "Wheel B4-Vel"
      },

      motorA2Acc: {
        code: sensorTypes.acc,
        name: "Motor A2 Acc"
      },
      motorA2Env3: {
        code: sensorTypes.env3,
        name: "Motor A2 Env3"
      },
      motorA2Vel: {
        code: sensorTypes.vel,
        name: "Motor A2 Vel"
      },
      motorA2Temp: {
        code: sensorTypes.temp,
        name: "Motor A2 Temp"
      },
      motorB3Acc: {
        code: sensorTypes.acc,
        name: "Motor B3 Acc"
      },
      motorB3Env3: {
        code: sensorTypes.env3,
        name: "Motor B3 Env3"
      },
      motorB3Vel: {
        code: sensorTypes.vel,
        name: "Motor B3 Vel"
      },
      motorB3Temp: {
        code: sensorTypes.temp,
        name: "Motor B3 Temp"
      },

      gearBoxA2Acc: {
        code: sensorTypes.acc,
        name: "Gearbox A2 Acc"
      },
      gearBoxA2Env3: {
        code: sensorTypes.env3,
        name: "Gearbox A2 Env3"
      },
      gearBoxA2Vel: {
        code: sensorTypes.vel,
        name: "Gearbox A2 Vel"
      },
      gearBoxA2Temp: {
        code: sensorTypes.temp,
        name: "Gearbox A2 Temp"
      },

      gearBoxB3Acc: {
        code: sensorTypes.acc,
        name: "Gearbox B3 Acc"
      },
      gearBoxB3Env3: {
        code: sensorTypes.env3,
        name: "Gearbox B3 Env3"
      },
      gearBoxB3Vel: {
        code: sensorTypes.vel,
        name: "Gearbox B3 Vel"
      },
      gearBoxB3Temp: {
        code: sensorTypes.temp,
        name: "Gearbox B3 Temp"
      },

      airComAAcc: {
        code: sensorTypes.acc,
        name: "Air Comp A Acc"
      },
      airComAEnv3: {
        code: sensorTypes.env3,
        name: "Air Comp A Env3"
      },
      airComAVel: {
        code: sensorTypes.vel,
        name: "Air Comp A Vel"
      },
      airComATemp: {
        code: sensorTypes.temp,
        name: "Air Comp A Temp"
      },

      airComA1Acc: {
        code: sensorTypes.acc,
        name: "Aircon Comp A1 Acc"
      },
      airComA1Env3: {
        code: sensorTypes.env3,
        name: "Aircon Comp A1  Env3"
      },
      airComA1Vel: {
        code: sensorTypes.vel,
        name: "Aircon Comp A1 Vel"
      },
      airComA1Temp: {
        code: sensorTypes.temp,
        name: "Aircon Comp A1 Temp"
      },

      airComB2Acc: {
        code: sensorTypes.acc,
        name: "Aircon Comp B2 Acc"
      },
      airComB2Env3: {
        code: sensorTypes.env3,
        name: "Aircon Comp B2 Env3"
      },
      airComB2Vel: {
        code: sensorTypes.vel,
        name: "Aircon Comp B2 Vel"
      },
      airComB2Temp: {
        code: sensorTypes.temp,
        name: "Aircon Comp B2 Temp"
      },

      comfortA3Acc: {
        code: sensorTypes.acc,
        name: "Comfort A3 Acc"
      },
      comfortA3Env3: {
        code: sensorTypes.env3,
        name: "Comfort A3 Vel"
      },

      comfortB1Acc: {
        code: sensorTypes.acc,
        name: "Comfort B1 Acc"
      },
      comfortB1Env3: {
        code: sensorTypes.env3,
        name: "Comfort B1 Evn3"
      },
      speed1: {
        code: sensorTypes.acc,
        name: "Speed_1"
      },
      speed2: {
        code: sensorTypes.env3,
        name: "Speed_2"
      }
    }
  },

  alarmIndicator: {
    green: {
      code: "green",
      title: "green"
    },
    warning: {
      code: "amber",
      title: "Amber"
    },
    danger: {
      code: "red",
      title: "Red"
    }
  },
  bogieTableLayout: {
    statusBar: "status-bar",
    dottedStatus: "dotted-status"
  },
  dashboardCoachSequence: ["dt", "mp", "mi", "mi2", "mp2", "dt2"],

  alarmStatusColorMapping: {
    warning: [
      "High Warning",
      "Low Warning",
      "Diagnosis warning",
      "Diagnosis Warning",
      "Vector warning",
      "warning"
    ],
    danger: [
      "Diagnosis alarm",
      "Diagnosis Alarm",
      "alarm",
      "High Alarm",
      "Low Alarm"
    ]
  },

  ignorSensorPointForBogie: {
    dt: {
      boogieOne: ["airComA1", "comfortB1", "airComA"],
      boogieTwo: ["comfortA3", "airComB2"]
    },
    mp: {
      boogieOne: ["airComA1"],
      boogieTwo: ["airComB2"]
    }
  },
  // these api calls are being ignored since they always fail
  // ignoreSensorForApiCall: {
  //   dt: ["speed1", "airComB2Acc", "airComA1Acc", "airComAAcc"],
  //   mp: ["airComB2Acc", "airComA1Acc"],
  // only call trending apis which are needed for the application
  trendingApiCallsForSensor: {
    dt: [
      "comfortB1Vel",
      "comfortA3Vel",
      "wheelB1Vel",
      "wheelB1Env3",
      "wheelB2Vel",
      "wheelB2Env3",
      "wheelA2Vel",
      "wheelA2Env3",
      "wheelA1Env3",
      "wheelA1Vel",
      "speed1",
      "speed2",
      "wheelA3Vel",
      "wheelA3Env3",
      "wheelA4Vel",
      "wheelA4Env3",
      "wheelB3Env3",
      "wheelB3Vel",
      "wheelB4Env3",
      "wheelB4Vel",
      "airComAVel",
      "airComAEnv3",
      "airComATemp",
      "airComA1Vel",
      "airComA1Env3",
      "airComA1Temp",
      "airComB2Vel",
      "airComB2Env3",
      "airComB2Temp"
    ],
    mp: [
      "wheelB3Env3",
      "wheelB3Vel",
      "wheelA3Env3",
      "wheelA3Vel",
      "wheelB4Env3",
      "wheelB4Vel",
      "wheelA4Env3",
      "wheelA4Vel",
      "wheelB1Env3",
      "wheelB1Vel",
      "wheelB2Env3",
      "wheelB2Vel",
      "wheelA1Env3",
      "wheelA1Vel",
      "wheelA2Env3",
      "wheelA2Vel",
      "motorA2Vel",
      "motorA2Env3",
      "motorA2Temp",
      "gearBoxA2Env3",
      "gearBoxA2Vel",
      "motorB3Env3",
      "motorB3Vel",
      "motorB3Temp",
      "gearBoxB3Env3",
      "gearBoxB3Vel",
      "airComA1Env3",
      "airComA1Vel",
      "airComB2Env3",
      "airComB2Vel"
    ]
  },
  appTimeZone: "Asia/Singapore",
  appDataRefresh: 600000,
  speedDataRefresh: 10000,
  numberOfReadingsForSpeed: 1,
  priorityMin: 0,
  priorityMax: 1
};

export default appConstants;

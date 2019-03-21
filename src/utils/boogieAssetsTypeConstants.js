import appConstants from "./appConstants";

const boogieAssetTypes = {
  dt: {
    wheelA1: {
      id: 1,
      name: "Wheel A1",
      code: "wheelA1",
      className: "wheela1 arrow-up xs-up ",
      sensorNameArr: ["wheelA1Env3", "wheelA1Vel"],
      boogieType: appConstants.wheelCategory.boogie1.code
    },
    wheelA2: {
      id: 2,
      name: "Wheel A2",
      code: "wheelA2",
      className: "wheela2 arrow-up xs-up ",
      sensorNameArr: ["wheelA2Env3", "wheelA2Vel"],
      boogieType: appConstants.wheelCategory.boogie1.code
    },
    wheelB1: {
      id: 3,
      name: "Wheel B1",
      code: "wheelB1",
      className: "wheelb1 arow-down xs ",
      sensorNameArr: ["wheelB1Env3", "wheelB1Vel"],
      boogieType: appConstants.wheelCategory.boogie1.code
    },
    wheelB2: {
      id: 4,
      name: "Wheel B2",
      code: "wheelB2",
      className: "wheelb2 arow-down xs ",
      sensorNameArr: ["wheelB2Env3", "wheelB2Vel"],
      boogieType: appConstants.wheelCategory.boogie1.code
    },
    comfortB1: {
      id: 5,
      name: "Comfort B1",
      code: "comfortB1",
      className: "comfortb1 arrow-up xs-up right ",
      sensorNameArr: ["comfortB1Vel"],
      boogieType: appConstants.wheelCategory.boogie1.code
    },
    airComA1: {
      id: 6,
      name: "Aircon Comp A1",
      code: "airComA1",
      className: "aircona1 arrow-down lg  ",
      sensorNameArr: ["airComA1Env3", "airComA1Vel", "airComA1Temp"],
      boogieType: appConstants.wheelCategory.boogie1.code
    },
    airComA: {
      id: 6,
      name: "Air Comp A",
      code: "airComA",
      className: "dt aircona arrow-down lg  ",
      sensorNameArr: ["airComAEnv3", "airComAVel", "airComATemp"],
      boogieType: appConstants.wheelCategory.boogie1.code
    },
    // boogie 2 sensor
    wheelA3: {
      id: 1,
      name: "Wheel A3",
      code: "wheelA3",
      className: "wheela3 arrow-up xs-up ",
      sensorNameArr: ["wheelA3Env3", "wheelA3Vel"],
      boogieType: appConstants.wheelCategory.boogie2.code
    },
    wheelA4: {
      id: 1,
      name: "Wheel A4",
      code: "wheelA4",
      className: "wheela4 arrow-up sm-up left  sm-top",
      sensorNameArr: ["wheelA4Env3", "wheelA4Vel"],
      boogieType: appConstants.wheelCategory.boogie2.code
    },
    wheelB3: {
      id: 1,
      name: "Wheel B3",
      code: "wheelB3",
      className: "wheelb3 arrow-down xs  ",
      sensorNameArr: ["wheelB3Env3", "wheelB3Vel"],
      boogieType: appConstants.wheelCategory.boogie2.code
    },
    wheelB4: {
      id: 1,
      name: "Wheel B4",
      code: "wheelB4",
      className: "wheelb4 arrow-down xs  ",
      sensorNameArr: ["wheelB4Env3", "wheelB4Vel"],
      boogieType: appConstants.wheelCategory.boogie2.code
    },
    comfortA3: {
      id: 5,
      name: "Comfort A3",
      code: "comfortA3",
      className: "comforta3 arrow-up xs-up right ",
      sensorNameArr: ["comfortA3Vel"],
      boogieType: appConstants.wheelCategory.boogie2.code
    },
    airComB2: {
      id: 6,
      name: "Aircon Comp B2",
      code: "airComB2",
      className: "airconb2 arrow-down lg  ",
      sensorNameArr: ["airComB2Env3", "airComB2Vel", "airComB2Temp"],
      boogieType: appConstants.wheelCategory.boogie2.code
    }
  },
  mp: {
    wheelA1: {
      id: 1,
      name: "Wheel A1",
      code: "wheelA1",
      className: "wheela1 arrow-up xs-up ",
      sensorNameArr: ["wheelA1Env3", "wheelA1Vel"],
      boogieType: appConstants.wheelCategory.boogie1.code
    },
    wheelA2: {
      id: 2,
      name: "Wheel A2",
      code: "wheelA2",
      className: "wheela2 arrow-up xs-up ",
      sensorNameArr: ["wheelA2Env3", "wheelA2Vel"],
      boogieType: appConstants.wheelCategory.boogie1.code
    },
    wheelB1: {
      id: 3,
      name: "Wheel B1",
      code: "wheelB1",
      className: "wheelb1 arow-down xs ",
      sensorNameArr: ["wheelB1Env3", "wheelB1Vel"],
      boogieType: appConstants.wheelCategory.boogie1.code
    },
    wheelB2: {
      id: 4,
      name: "Wheel B2",
      code: "wheelB1",
      className: "wheelb2 arow-down xs ",
      sensorNameArr: ["wheelB2Env3", "wheelB2Vel"],
      boogieType: appConstants.wheelCategory.boogie1.code
    },
    motorA2: {
      id: 5,
      name: "Motor A2",
      code: "motorA2",
      className: "motora2 arrow-up xs-up right ",
      sensorNameArr: ["motorA2Env3", "motorA2Vel", "motorA2Temp"],
      boogieType: appConstants.wheelCategory.boogie1.code
    },
    gearBoxA2: {
      id: 5,
      name: "GearBox A2",
      code: "gearBoxA2",
      className: "gearBoxB2 arrow-up xs-up right ",
      sensorNameArr: ["gearBoxA2Env3", "gearBoxA2Vel", "gearBoxA2Temp"],
      boogieType: appConstants.wheelCategory.boogie1.code
    },
    airComA1: {
      id: 6,
      name: "Aircon Comp A1",
      code: "airComA1",
      className: "aircona1 arrow-down lg  ",
      sensorNameArr: ["airComA1Env3", "airComA1Vel", "airComA1Temp"],
      boogieType: appConstants.wheelCategory.boogie1.code
    },
    // boogie 2 sensor
    wheelA3: {
      id: 1,
      name: "Wheel A3",
      code: "wheelA3",
      className: "wheela3 arrow-up xs-up ",
      sensorNameArr: ["wheelA3Env3", "wheelA3Vel"],
      boogieType: appConstants.wheelCategory.boogie2.code
    },
    wheelA4: {
      id: 1,
      name: "Wheel A4",
      code: "wheelA4",
      className: "wheela4 arrow-up sm-up left  sm-top",
      sensorNameArr: ["wheelA4Env3", "wheelA4Vel"],
      boogieType: appConstants.wheelCategory.boogie2.code
    },
    wheelB3: {
      id: 1,
      name: "Wheel B3",
      code: "wheelB3",
      className: "wheelb3 arrow-down xs  ",
      sensorNameArr: ["wheelB3Env3", "wheelB3Vel"],
      boogieType: appConstants.wheelCategory.boogie2.code
    },
    wheelB4: {
      id: 1,
      name: "Wheel B4",
      code: "wheelB4",
      className: "wheelb4 arrow-down xs  ",
      sensorNameArr: ["wheelB4Env3", "wheelB4Vel"],
      boogieType: appConstants.wheelCategory.boogie2.code
    },
    motorB3: {
      id: 5,
      name: "Motor B3",
      code: "motorB3",
      className: "motorb3 arrow-up xs-up right ",
      sensorNameArr: ["motorB3Env3", "motorB3Vel", "motorB3Temp"],
      boogieType: appConstants.wheelCategory.boogie2.code
    },
    gearBoxB3: {
      id: 5,
      name: "GearBox B3",
      code: "gearBoxB3",
      className: "gearBoxB3 arrow-up xs-up right ",
      sensorNameArr: ["gearBoxB3Env3", "gearBoxB3Vel", "gearBoxB3Temp"],
      boogieType: appConstants.wheelCategory.boogie2.code
    },
    airComB2: {
      id: 6,
      name: "Aircon Comp B2",
      code: "airComB2",
      className: "airconb2 arrow-down lg  ",
      sensorNameArr: ["airComB2Env3", "airComB2Vel", "airComB2Temp"],
      boogieType: appConstants.wheelCategory.boogie2.code
    }
  }
};

export default boogieAssetTypes;

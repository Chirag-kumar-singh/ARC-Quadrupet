export const robots = {
  go2: {
    name: "Go2",
    layout: {
      viewerHeight: 500,
    },
    features: {
      battery: true,
      imu: true,
      motor: true,
      footPressure: true,
      viewer: true,
    },
  },

  g1: {
    name: "G1",
    layout: {
      viewerHeight: 550,
    },
    features: {
      battery: true,
      imu: true,
      motor: true,
      footPressure: false,
      viewer: true,
    },
  },

  gini: {
    name: "Gini",
    layout: {
      viewerHeight: 1000,
    },
    features: {
      battery: false,
      imu: false,
      motor: false,
      footPressure: false,
      viewer: true,
    },
  },

  cobot: {
    name: "Cobot",
    layout: {
      viewerHeight: 600,
    },
    features: {
      battery: false,
      imu: false,
      motor: false,
      footPressure: false,
      viewer: true,
    },
  },
};

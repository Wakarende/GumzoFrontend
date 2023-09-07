module.exports = {
  preset: 'react-native',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|webp|svg)$': 'identity-obj-proxy',
    '^react-native-vector-icons/MaterialCommunityIcons$':
      '<rootDir>/mocks/@expo-vector-icons-mocks.js',
  },
  // transformIgnorePatterns: [
  //   'node_modules/(?!(jest-)?react-native|@react-native|@react-native-community|@react-navigation|@react-native-firebase|react-native-reanimated|@react-native/js-polyfills|firebase|@firebase/firestore)',
  // ],
  // transformIgnorePatterns: [
  //   'node_modules/(?!(jest-)?react-native|@react-native|@react-native-community|@react-navigation|@react-native-firebase|react-native-reanimated|@react-native/js-polyfills|@firebase/firestore|@firebase/util)',
  // ],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-native-community|@react-navigation|@react-native-firebase|react-native-reanimated|@react-native/js-polyfills|@firebase/firestore|@firebase/util|firebase/app)',
  ],
  setupFiles: ['/Users/joyki/Documents/FinalProject/Gumzo_/jest.setup.js'],
};

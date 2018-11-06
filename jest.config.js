module.exports = {
   transform: {
      '^.+\\.ts$': 'ts-jest',
   },
   moduleFileExtensions: [
      'ts',
      'js'
   ],
   testRegex: '(/tests/.*|\\.(test|spec))\\.(ts|js)$',
}

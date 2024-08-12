module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  setupFilesAfterEnv: ['./tests/unit/setup.js'],
  transformIgnorePatterns: ['/node_modules/(?!axios)/']
}

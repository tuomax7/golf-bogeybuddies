module.exports = {
  client: {
    name: 'golf-bogeybuddies-server',
    includes: ['./test/**/*.{ts,tsx}'],
    service: {
      name: 'golf-bogeybuddies-server',
      url: 'http://localhost:9999/api',
    },
  },
};

'use strict';

const Wit = require('node-wit').Wit;
const interactive = require('node-wit').interactive;

const accessToken = (() => {
  if (process.argv.length !== 3) {
    process.exit(1);
  }

  return process.argv[2];
})();

const actions = {
  send(request, response) {
    console.log('response', response.text);
  },
  findPerson({ context, entities }) {
    const fullName = entities.fullName[0].value;

    if (fullName) {
      context.fullName = fullName
    } else {
      console.error('Nie zrozumiałem.');
    }

    return context;
  }
};

const client = new Wit({ accessToken, actions });
interactive(client);

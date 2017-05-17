'use strict';

const Wit = require('node-wit').Wit;
const interactive = require('node-wit').interactive;
const opn = require('opn');

const accessToken = (() => {
  if (process.argv.length !== 3) {
    process.exit(1);
  }

  return process.argv[2];
})();

const actions = {
  send(request, response) {
    console.log(response.text);
  },
  findPerson({ context, entities }) {
    const fullName = entities.fullName[0].value;
    const url = 'https://pl.wikipedia.org/wiki/' + fullName.replace(' ', '_');

    if (fullName) {
      context.fullName = fullName;
      opn(url, { wait: false });
    } else {
      console.error('Nie zrozumiałem.');
    }

    return context;
  }
};

const client = new Wit({ accessToken, actions });
interactive(client);

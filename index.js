import { group, sleep } from 'k6';
import getUser from "./scenarios/get-user.js";
import createUser from "./scenarios/create-user.js";
import getCards from './scenarios/get-cards.js'
import authenticateUser from "./scenarios/authenticate-user.js";
import updateUser from "./scenarios/update-user.js";
import addCard from "./scenarios/add-card.js";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/2.4.0/dist/bundle.js";
import getCollection from './scenarios/get-collection.js';

export default () => {

  let user
  let token

  group('Users Service', () => {
    user = createUser();
    token = authenticateUser(user)
    updateUser(token)
    getUser(token)
  });

  group('Collections Service', () => {
    getCards()
    addCard(token)
    getCollection(token)
  })

  sleep(1);
}

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
  };
}
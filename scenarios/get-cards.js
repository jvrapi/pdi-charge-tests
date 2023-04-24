import http from 'k6/http';
import { sleep } from 'k6';
import { Trend, Rate, Counter } from "k6/metrics";
import { check, fail } from "k6";


const GetCardsDuration = new Trend('microservice_collection_get_card_duration');
const GetCardsSuccessRate = new Rate('microservice_collection_get_card_success_rate');


const query = `
  query getCards($filters: GetCardsInput!){
    cards(data: $filters){
      id,
      name,
      imageUri
    }
  }
`

const getRandomNumber = (max) => Math.floor(Math.random() * max + 1)


export default function getCards () {

  const headers = {
    'content-type': 'application/json'
  };

  const variables = {
    filters: {
      take: getRandomNumber(150),
      skip: getRandomNumber(150),
    }
  }
  

  const url = 'http://localhost:4000/'
  const body = JSON.stringify({query, variables})

  const res = http.post(url, body, {headers})
  const response = JSON.parse(res.body)

  GetCardsDuration.add(res.timings.duration);
  GetCardsSuccessRate.add(!response.errors);

  sleep(1);

}
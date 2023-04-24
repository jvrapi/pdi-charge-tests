import http from 'k6/http';
import { sleep } from 'k6';
import { Trend, Rate, Counter } from "k6/metrics";
import { check, fail } from "k6";


const GetCollectionDuration = new Trend('microservice_collection_get_collection_duration');
const GetCollectionSuccessRate = new Rate('microservice_collection_get_collection_success_rate');


const query = `
  query getCollection($cardsFilters: UserCollectionInput!) {
    user {
      id
      name
      username
      email,
      cards(data: $cardsFilters) {
        id
      }
    }
  }
`

const getRandomNumber = (max) => Math.floor(Math.random() * max + 1)


export default function getCollection(token) {

  const headers = {
    'Authorization': `Bearer ${token}`,
    'content-type': 'application/json'
  };

  const variables = {
    cardsFilters: {
      take: getRandomNumber(100)
    }
  }
  

  const url = 'http://localhost:4000/'

  const body = JSON.stringify({query, variables})

  const res = http.post(url, body, {headers})
  const response = JSON.parse(res.body)

  GetCollectionDuration.add(res.timings.duration);
  GetCollectionSuccessRate.add(!response.errors);

  sleep(1);

}
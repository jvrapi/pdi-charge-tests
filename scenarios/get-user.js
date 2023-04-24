import http from 'k6/http';
import { sleep } from 'k6';
import { Trend, Rate, Counter } from "k6/metrics";


const GetUserDuration = new Trend('microservice_user_get_me_duration');
const GetUserSuccessRate = new Rate('microservice_user_get_me_success_rate');


export default function getUser (token) {
  const headers = {
    'Authorization': `Bearer ${token}`,
  };

  const url = 'http://localhost:3000/users/me'

  const res = http.get(url, {headers})

  GetUserDuration.add(res.timings.duration);
  GetUserSuccessRate.add(res.status === 200);

  sleep(1);

}
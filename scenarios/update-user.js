import http from 'k6/http';
import { sleep } from 'k6';
import { Trend, Rate } from "k6/metrics";
import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';


const UpdateUserDuration = new Trend('microservice_user_update_duration');
const UpdateUserSuccessRate = new Rate('microservice_user_update_success_rate');

const userData = () => {
  return {
    email: `${uuidv4()}@chargetest.com`,
    username: uuidv4(),
    password: uuidv4(),
    name: uuidv4()
  }
}

export default function updateUser (token) {
  const body = userData()
  
  const url = 'http://localhost:3000/users/'

  const headers = {
    'Authorization': `Bearer ${token}`
  };
  
  const res = http.put(url, body, {
    headers
  })
 
  UpdateUserDuration.add(res.timings.duration);
  UpdateUserSuccessRate.add(res.status === 200);


  sleep(1);
  return body
}
import http from 'k6/http';
import { sleep } from 'k6';
import { Trend, Rate } from "k6/metrics";
import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';

const CreateUserDuration = new Trend('microservice_user_create_duration');
const CreateUserSuccessRate = new Rate('microservice_user_create_success_rate');


const userData = () => {
  return {
    email: `${uuidv4()}@chargetest.com`,
    username: uuidv4(),
    password: uuidv4(),
    name: uuidv4()
  }
}

export default function createUser(){
  const body = userData()
  
  const url = 'http://localhost:3000/users/'
  
  const res = http.post(url, body)
 
  CreateUserDuration.add(res.timings.duration);
  CreateUserSuccessRate.add(res.status === 201);

  if(res.status !== 201){
    console.log(`Create User Error: ${res.json(res.body)}`)
  }

  sleep(1);
  return body
}





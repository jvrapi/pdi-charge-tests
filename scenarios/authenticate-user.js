import http from 'k6/http';
import { sleep } from 'k6';
import { Trend, Rate, Counter } from "k6/metrics";


const AuthenticateUserDuration = new Trend('microservice_user_authenticate_duration');
const AuthenticateUserSuccessRate = new Rate('microservice_user_authenticate_success_rate');

function getUsername() {
  const username = ['email', 'username']
  return username[Math.floor(Math.random() * username.length)]
}

export default function authenticateUser(user) {
  const username = getUsername()
  
  const body = {
    username: user[username],
    password: user.password
  }
  
  const url = 'http://localhost:3000/auth/'
  
  const res = http.post(url, body)
  
  const response = JSON.parse(res.body)
  
  AuthenticateUserDuration.add(res.timings.duration);
  
  AuthenticateUserSuccessRate.add(res.status === 200);

  sleep(1);

  return response.token
}






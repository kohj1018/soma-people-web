import axios from "axios";

const BASE_URL = 'https://somapeople.xyz/api/v1'

export const ec2 = axios.create({ baseURL: BASE_URL })
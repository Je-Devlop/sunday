import axios from "axios"

const baseURL = "http://localhost:8081/"
const timeout = 30000 // 30 seconds

const instance = axios.create({
    baseURL: baseURL,
	timeout: timeout,
	headers: {
		"Content-Type": "application/json",
	},
})

export { instance as httpClient }
import axios from "axios";

const apis = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8080/api/v2",
	headers: {
		"Content-Type": "application/json"
	}
});

export default apis;
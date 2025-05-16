import { Client } from "@stomp/stompjs";

export const client = new Client({
	brokerURL: "ws://localhost:8080/api/v2/ws",
});

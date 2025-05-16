"use client";

import { client } from "@/commons/utils/Stomp";
import { Col, Row } from "antd";
import { jwtDecode, JwtPayload } from "jwt-decode";
import React from "react";

export default function ChatComponent({ token }: { token: string }) {
	const { sub }: JwtPayload & { scope: string } = jwtDecode(token);
    const sendMessage = () => client.publish({
        destination: '/app/send-messages',
        body: JSON.stringify({
            content: "Hello",
            receiver: "abc"
        })
    });
	React.useEffect(() => {
		client.connectHeaders = { Authorization: `Bearer ${token}` };
        client.onConnect = () => {
            client.subscribe(`/user/${sub}/queue/receive-message`, (message) => {
                console.log(JSON.parse(message.body))
            });
        }
        client.activate();
	}, []);
	return (
		<>
			<Row>
                <Col md={8} xs={24}>
                    <div className="bg-blue-400"></div>
                </Col>
                <Col md={16} xs={24}>
                    <div className="bg-gray-500"></div>
                </Col>
            </Row>
		</>
	);
}

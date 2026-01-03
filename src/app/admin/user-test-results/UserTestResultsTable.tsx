"use client";
import React from "react";
import { Table } from "antd";

export default function UserTestResultsTable({ data }: { data: any[] }) {
  const columns = [
    { title: "User", dataIndex: ['user', 'email'], key: "userName" },
    { title: "Test", dataIndex: ['test', 'title'], key: "testTitle" },
    { title: "Score", dataIndex: "score", key: "score" },
    { title: "Started Date", dataIndex: "startedDate", key: "startedDate" },
  ];
  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      pagination={false}
      bordered
      onRow={(data) => {
        return {
          onClick: () => {
            window.open(`/test-result/${data.id}/result`, '_blank')
          }
        }
      }}
      className="cursor-pointer"
    />
  );
} 
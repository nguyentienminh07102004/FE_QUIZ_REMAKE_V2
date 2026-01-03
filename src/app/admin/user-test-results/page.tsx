import { cookies } from "next/headers";
import UserTestResultsTable from "./UserTestResultsTable";
import GetToken from "@/commons/utils/GetToken";
import PaginationCustomer from "@/components/Pagination";
import apis from "@/apis/base";

async function getUserTestResults(token: string, page: number, limit: number) {
  const res = (await apis.get(
    '/test-result',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
        limit
      }
    }
  )).data;
  console.log(res)
  return {
    data: res.data.content,
    total: res.data.page.totalElements,
    pageSize: res.data.page.size,
  };
}

export default async function UserTestResultsPage({ searchParams }: { searchParams?: { page?: string; limit?: string } }) {
  const token = await GetToken() || "";
  const page = Number(searchParams?.page) || 1;
  const pageSize = Number(searchParams?.limit) || 10;
  const { data, total, pageSize: realPageSize } = await getUserTestResults(token, page, pageSize);
    
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">User Test Results</h1>
      <UserTestResultsTable data={data} />
      <PaginationCustomer totalElements={total} limit={realPageSize} />
    </div>
  );
} 
export async function GET({ url }) {
  const page = url.searchParams.get("page") || "1";
  const pageSize = url.searchParams.get("pageSize") || "10";

  const response = await fetch(
    `${
      import.meta.env.STRAPI_API_URL
    }/api/articles?pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=*`
  );
  const data = await response.json();

  return new Response(
    JSON.stringify({
      articles: data.data,
      hasMore: data.meta.pagination.page < data.meta.pagination.pageCount,
      totalPages: data.meta.pagination.pageCount,
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}

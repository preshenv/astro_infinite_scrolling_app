export async function GET({ url }) {
  const page = parseInt(url.searchParams.get("page") || "1");
  const pageSize = parseInt(url.searchParams.get("pageSize") || "10");

  const strapiResponse = await fetch(
    `${
      import.meta.env.STRAPI_API_URL
    }/api/articles?pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=*`
  );

  const data = await strapiResponse.json();
  const { data: articles, meta } = data;
  const hasMore = meta.pagination.page < meta.pagination.pageCount;

  return new Response(JSON.stringify({ articles, hasMore }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

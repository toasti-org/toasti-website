export const getCMSData = async <T>(query: string): Promise<T> => {
  const res = await (
    await fetch("https://graphql.datocms.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`,
      },
      body: JSON.stringify({
        query: query,
      }),
      next: { revalidate: 216000 },
    })
  ).json();
  return res.data;
};

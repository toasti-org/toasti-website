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

export const allArticlesQuery = `{
  allArticles(orderBy: _firstPublishedAt_ASC) {
    id
    _firstPublishedAt
    title
    author
    tags
    image {
      id
      width
      height
      alt
      url
    }
    introduction {
      blocks
      links
      value
    }
    sections {
      sectionTitle
      sectionContent {
        blocks
        links
        value
      }
    }
  }
}`;

export const allEventsQuery = `{
  allEvents(orderBy: date_ASC) {
    title
    id
    description
    date
    image {
      url
      alt
      width
      height
      id
    }
  }
}`;

export const aboutUsQuery = `{
  aboutUsPage {
    aboutUsSections {
      id
      sectionTitle
      paragraphSection {
        blocks
        links
        value
      }
      imageSection {
        id
        url
        alt
        width
        height
      }
    }
  }
}`;

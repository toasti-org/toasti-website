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
      next: { revalidate: 1800 },
    })
  ).json();
  return res.data;
};

// Already sorted in the CMS
// Get 100 first latest released articles
export const allArticlesQuery = `{
  allArticles(orderBy:_firstPublishedAt_DESC, first: 100) {
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
      id
      title
      description {
        blocks
        links
        value
      }
    }
  }
}`;
// export const allArticlesRevalidateTags = ["article"];

// Already sorted in the CMS
// Get first 100 query from the latest astronomy event
export const allAstronomyCalendarsQuery = `{
  allAstronomyCalendars(orderBy:date_DESC, first: 100) {
    title
    id
    description {
      blocks
      links
      value
    }
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
// export const allAstronomyCalendarsRevalidateTags = ["astronomy-calendar"];

// Already sorted in the CMS
export const allStudyMaterialsQuery = `{
  allStudyMaterials {
    id
    title
    description {
      blocks
      links
      value
    }
    buttonText
    buttonUrl
  }
}`;
// export const allStudyMaterialsRevalidateTags = ["study-material"];

// Already sorted in the CMS
export const allAboutToastisQuery = `{
  allAboutToastis {
    id
    title
    description {
      blocks
      links
      value
    }
    image {
      id
      url
      alt
      width
      height
    }
  }
}`;
// export const allAboutToastisRevalidateTags = ["about-toasti"];

export const privacyPolicyQuery = `{
  privacyPolicy {
    title
    introduction {
      blocks
      links
      value
    }
    sections {
      id
      title
      description {
        blocks
        links
        value
      }
    }
  }
}`;
// export const privacyPolicyRevalidateTags = ["privacy-policy"];

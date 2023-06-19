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
export const allArticlesQuery = `{
  allArticles(orderBy:_firstPublishedAt_DESC) {
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
      paragraphs {
        id
        paragraph {
          value
          links
          blocks
        }
      }
    }
  }
}`;
// export const allArticlesRevalidateTags = ["article"];

// Already sorted in the CMS
export const allAstronomyCalendarsQuery = `{
  allAstronomyCalendars(orderBy:date_ASC) {
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
// export const allAstronomyCalendarsRevalidateTags = ["astronomy-calendar"];

// Already sorted in the CMS
export const allStudyMaterialsQuery = `{
  allStudyMaterials {
    id
    title
    paragraph {
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
    paragraph {
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
    paragraph {
      blocks
      links
      value
    }
    sections {
      id
      title
      paragraphs {
        id
        paragraph {
          value
          links
          blocks
        }
      }
    }
  }
}`;
// export const privacyPolicyRevalidateTags = ["privacy-policy"];

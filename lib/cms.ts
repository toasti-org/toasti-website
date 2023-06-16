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

// Already sorted in the CMS
export const allArticlesQuery = `{
  allArticles {
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

// Already sorted in the CMS
export const allEventsQuery = `{
  allEvents {
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

// Already sorted in the CMS
export const studyMaterialQuery = `{
  allStudyMaterialContents {
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

// Already sorted in the CMS
export const aboutUsQuery = `{
  allAboutUsContents {
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

export const privacyPolicyQuery = `{
  privacyPolicyContent {
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

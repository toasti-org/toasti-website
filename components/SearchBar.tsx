"use client";

import type { Article } from "@/types/component";
import Image from "next/image";
import { useState } from "react";
import { Dispatch, SetStateAction } from "react";

const SearchBar = ({
  allArticles,
  searchValue,
  setSearchValue,
  setFilteredArticles,
}: {
  allArticles: Array<Article>;
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  setFilteredArticles: Dispatch<SetStateAction<Array<Article>>>;
}) => {
  // Tags Recommendation (LOWER CASE)
  const [tagsResult, setTagsResult] = useState<Array<string>>([]);

  // Collect allTags from AllArticles and convert to lowercase
  const allTagsCombined: Array<string> = [];
  allArticles.forEach((article) => allTagsCombined.push(...article.tags));
  const allTagsUnique = allTagsCombined.filter((value, index, self) => {
    return self.indexOf(value) === index;
  });
  const allTagsUniqueLowerCase = allTagsUnique.map((tag) => {
    return tag.toLowerCase();
  });

  return (
    <div className="relative flex w-[300px] flex-row items-center gap-3 rounded-xl bg-custom-white p-3 sm:w-[615px] md:w-[720px] lg:w-[645px] xl:w-[810px]">
      {/* Search Icon */}
      <div className="relative h-[20px] w-[20px]">
        <Image src="/search.svg" alt="Search Icon" fill={true} />
      </div>

      {/* Search Input */}
      <input
        className="w-full bg-custom-white font-poppins-bold text-lg text-custom-blue focus:outline-none"
        type="text"
        placeholder="Cari Artikel"
        value={searchValue}
        onChange={(e) => {
          // Get new Value
          const newSearchValue = e.target.value;
          setSearchValue(newSearchValue);
          const newSearchValueLowerCase = newSearchValue.toLowerCase();

          // Update Tags Recommendation (case insensitive, must match from start)
          const newTagResults = allTagsUniqueLowerCase.filter((tag) => {
            return tag.startsWith(newSearchValueLowerCase);
          });
          setTagsResult(newTagResults);

          // Updated filtered result (case insensitive, must includes)
          // Accepts title, date, tags, author
          const newFilteredArticles = allArticles.filter((article) => {
            const isTitleIncludes = article.title
              .toLowerCase()
              .includes(newSearchValueLowerCase);
            const isDateIncludes = new Date(article._firstPublishedAt)
              .toLocaleString("id-ID", { dateStyle: "long" })
              .toLowerCase()
              .includes(newSearchValueLowerCase);
            const isAuthorIncludes = article.author
              .toLowerCase()
              .includes(newSearchValueLowerCase);
            const isTagsStartsMatch =
              article.tags.filter((tag) =>
                tag.toLowerCase().startsWith(newSearchValueLowerCase)
              ).length !== 0;

            return (
              isTitleIncludes ||
              isDateIncludes ||
              isAuthorIncludes ||
              isTagsStartsMatch
            );
          });
          setFilteredArticles(newFilteredArticles);
        }}
      />

      {/* Reset Icon */}
      <button
        className="relative h-[20px] w-[20px]"
        aria-label="Reset Button"
        onClick={() => {
          setSearchValue("");
          setTagsResult([]);
          setFilteredArticles(allArticles);
        }}
      >
        <Image src="/reset.svg" alt="Reset Icon" fill={true} />
      </button>

      {/* Tag Recommendation */}
      {/* Only show when search is not empty and tagsResult is not empty */}
      {searchValue && tagsResult.length !== 0 && (
        <div className="absolute left-8 top-16 h-fit w-fit rounded-2xl bg-custom-white px-4 py-2">
          {tagsResult.map((tag, index) => {
            return (
              <div
                key={index}
                className="py-1 font-poppins-bold text-lg text-custom-blue"
                onClick={() => {
                  // Update Search State
                  setSearchValue(tag);

                  // Update Recommendation Tag
                  setTagsResult([]);

                  // Update Filtered Article Result
                  // Accepts title, date, tags, author
                  const newFilteredArticles = allArticles.filter((article) => {
                    const isTitleIncludes = article.title
                      .toLowerCase()
                      .includes(tag);
                    const isDateIncludes = new Date(article._firstPublishedAt)
                      .toLocaleString("id-ID", { dateStyle: "long" })
                      .toLowerCase()
                      .includes(tag);
                    const isAuthorIncludes = article.author
                      .toLowerCase()
                      .includes(tag);
                    const isTagsStartsMatch =
                      article.tags.filter((articleTag) =>
                        articleTag.toLowerCase().startsWith(tag)
                      ).length !== 0;

                    return (
                      isTitleIncludes ||
                      isDateIncludes ||
                      isAuthorIncludes ||
                      isTagsStartsMatch
                    );
                  });
                  setFilteredArticles(newFilteredArticles);
                }}
              >
                {tag}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchBar;

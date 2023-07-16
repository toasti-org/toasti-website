"use client";

import type { Article } from "@/types/component";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Dispatch, SetStateAction } from "react";

const SearchBar = ({
  allArticles,
  searchValue,
  setSearchValue,
  setFilteredArticles,
  setCountDisplayArticle,
}: {
  allArticles: Array<Article>;
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  setFilteredArticles: Dispatch<SetStateAction<Array<Article>>>;
  setCountDisplayArticle: Dispatch<SetStateAction<number>>;
}) => {
  // Tags Recommendation (LOWER CASE)
  const [tagsResult, setTagsResult] = useState<Array<string>>([]);

  // Refs
  const searchBarRef = useRef<HTMLDivElement>(null); // Search Bar Component Ref (Search Bar + Search Recommendation)
  const inputRef = useRef<HTMLInputElement>(null); // Input element ref
  const resultsRef = useRef<HTMLUListElement>(null); // Recommendation list ref

  // Collect allTags from AllArticles and convert to lowercase
  const allTagsCombined: Array<string> = [];
  allArticles.forEach((article) => allTagsCombined.push(...article.tags));
  const allTagsUnique = allTagsCombined.filter((value, index, self) => {
    return self.indexOf(value) === index;
  });
  const allTagsUniqueLowerCase = allTagsUnique.map((tag) => {
    return tag.toLowerCase();
  });

  // Close Recommendation when click outside SearchBar / Recommendation component
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // If user click outside of search bar & search recommendation list
      if (
        tagsResult.length > 0 &&
        !searchBarRef.current?.contains(event.target as Node)
      ) {
        setTagsResult([]);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [tagsResult.length]);

  // Handle Arrow Up, Arrow Down Key, and Enter
  useEffect(() => {
    // Handle when tagsResult is not empty
    const handleTagsResult = (e: KeyboardEvent) => {
      const isUp = e.code === "ArrowUp";
      const isDown = e.code === "ArrowDown";
      const isEnter = e.code === "Enter";

      // Disable page scroll when tags recommendation is shown
      if (isUp || isDown) {
        e.preventDefault();
      }

      // Check if input element is currently focused
      const inputIsFocused = document.activeElement === inputRef.current;

      // Get all <li> element from recommendation list
      const resultsElement = Array.from(
        resultsRef.current?.children as HTMLCollection
      );

      // Get index of currently focused <li> element
      const activeResultIndex = resultsElement.findIndex((result) => {
        return result.querySelector("span") === document.activeElement;
      });

      // Arrow up key
      if (isUp) {
        if (inputIsFocused) {
          // If input element is currently focused, go to the last recommendation
          resultsElement[resultsElement.length - 1]
            .querySelector("span")
            ?.focus();
        } else if (activeResultIndex === 0) {
          // If first result is currently focused, go back to input element
          inputRef.current?.focus();
        } else {
          // Others, go to the previous recommendation
          resultsElement[activeResultIndex - 1].querySelector("span")?.focus();
        }
      }

      // Arrow down key
      if (isDown) {
        if (inputIsFocused) {
          // If input element is currently focused, go to the first recommendation
          resultsElement[0].querySelector("span")?.focus();
        } else if (activeResultIndex === resultsElement.length - 1) {
          // If last result is currently focused, go back to input element
          inputRef.current?.focus();
        } else {
          // Others, go to the next recommendation
          resultsElement[activeResultIndex + 1].querySelector("span")?.focus();
        }
      }

      // Enter key
      if (isEnter) {
        if (inputIsFocused) {
          // If input element is currently focused, reset tags recommendation
          inputRef.current?.blur();
          setTagsResult([]);
        } else {
          // If result is currently focused, click the result
          const activeResultElement = resultsElement[activeResultIndex];
          activeResultElement.querySelector("span")?.click();
        }
      }
    };

    // Handle when tagsResult is empty
    const handleEmptyTagsResult = (e: KeyboardEvent) => {
      // Check if key is Enter
      const isEnter = e.code === "Enter";

      // Check if input element is currently focused
      const inputIsFocused = document.activeElement === inputRef.current;

      // Enter key
      if (isEnter && inputIsFocused) {
        // If input element is currently focused, reset tags recommendation
        inputRef.current?.blur();
      }
    };

    // Event listner empty tags & non empty tags is sepearated because diferent behavior
    if (searchValue && tagsResult.length > 0) {
      // Handle when recommendation tag appears
      window.addEventListener("keydown", handleTagsResult);
      window.removeEventListener("keydown", handleEmptyTagsResult);
    } else {
      // Tags recommendation is empty
      window.removeEventListener("keydown", handleTagsResult);
      window.addEventListener("keydown", handleEmptyTagsResult);
    }

    // Clean up
    return () => {
      window.removeEventListener("keydown", handleTagsResult);
      window.removeEventListener("keydown", handleEmptyTagsResult);
    };
  }, [tagsResult.length, searchValue]);

  return (
    <div
      ref={searchBarRef}
      className="relative flex w-[300px] flex-row items-center gap-3 rounded-xl bg-custom-white p-3 sm:w-[600px] md:w-[728px] lg:w-[645px] xl:w-[810px]"
    >
      {/* Search Icon */}
      <div className="relative h-[20px] w-[20px]">
        <Image src="/search.svg" alt="Search Icon" fill={true} />
      </div>

      {/* Search Input */}
      <input
        ref={inputRef}
        className="w-full bg-custom-white font-poppins-bold text-lg text-custom-blue focus:outline-none"
        type="text"
        placeholder="Cari Artikel"
        value={searchValue}
        onFocus={(e) => {
          // On focus show all matching tags
          // Get current value
          const currentValue = e.target.value;
          const currentValueLowerCase = currentValue.toLowerCase();

          // Update Tags Recommendation (case insensitive, must match from start)
          const newTagResults = allTagsUniqueLowerCase.filter((tag) => {
            return tag.startsWith(currentValueLowerCase);
          });
          setTagsResult(newTagResults);
        }}
        onChange={(e) => {
          // On change update all datas
          // Get new Value
          const newSearchValue = e.target.value;
          setSearchValue(newSearchValue);
          const newSearchValueLowerCase = newSearchValue.toLowerCase();

          // Update Tags Recommendation (case insensitive, must match from start)
          // Already handle case when searchValue is empty
          const newTagResults = allTagsUniqueLowerCase.filter((tag) => {
            return tag.startsWith(newSearchValueLowerCase);
          });
          setTagsResult(newTagResults);

          // Update shown article
          // Depends on the search value
          if (newSearchValue) {
            setCountDisplayArticle(9);
          } else {
            setCountDisplayArticle(8);
          }

          // Updated filtered result (case insensitive, must includes)
          // Accepts title, date, tags, author
          // Already handle case when searchValue is empty
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
          setCountDisplayArticle(8);
        }}
      >
        <Image src="/reset.svg" alt="Reset Icon" fill={true} />
      </button>

      {/* Tag Recommendation */}
      {/* Only show when search is not empty and tagsResult is not empty */}
      {searchValue && tagsResult.length !== 0 && (
        <ul
          data-aos="fade-in"
          data-aos-duration="150"
          className="absolute left-8 top-16 h-fit w-fit rounded-2xl bg-custom-white px-4 py-2"
          ref={resultsRef}
        >
          {tagsResult.map((tag, index) => {
            return (
              <li
                key={index}
                className="cursor-pointer py-1 font-poppins-bold text-lg text-custom-blue xl:hover:text-custom-pink"
                onClick={() => {
                  // Update Search State
                  setSearchValue(tag);

                  // Update Recommendation Tag
                  setTagsResult([]);

                  // Reset shown article
                  setCountDisplayArticle(9);

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
                <span
                  className="focus:text-custom-pink focus:outline-none"
                  tabIndex={0}
                >
                  {tag}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;

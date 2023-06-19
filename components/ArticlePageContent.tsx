"use client";

import { AllArticlesCMS } from "@/types/cms";
import SearchBar from "./SearchBar";
import Cards from "./Cards";
import Button from "./Button";
import { useState } from "react";
import FramerOnScroll from "./FramerOnScroll";

const ArticlePageContent = ({ allArticles }: AllArticlesCMS) => {
  // Display Article State (Search is not active)
  const [countDisplayArticle, setCountDisplayArticle] = useState(8);
  const countRemainderArticle = allArticles.length - countDisplayArticle;

  // Search Bar State
  const [searchValue, setSearchValue] = useState("");

  // Filtered Article State (Search is active)
  const [filteredArticles, setFilteredArticles] = useState(allArticles);

  return (
    <main className="flex flex-auto flex-col items-center gap-8 bg-custom-blue px-5 py-12 lg:pb-16 xl:gap-12">
      {/* Grids */}
      <div className="grid auto-cols-min grid-cols-[300px] justify-items-center gap-4 sm:grid-cols-[292px_292px] md:grid-cols-[352px_352px] md:gap-6 lg:grid-cols-[306px_306px_306px] lg:gap-8 xl:grid-cols-[380px_380px_380px] xl:gap-12">
        {/* Search Div*/}
        <div
          className={`flex flex-col gap-8 sm:col-span-2 lg:gap-12 lg:pt-8 xl:gap-14 xl:pt-12 ${
            searchValue &&
            "items-center justify-self-start sm:items-start lg:col-span-3"
          }`}
        >
          {/* Search Bar */}
          <FramerOnScroll>
            <SearchBar
              allArticles={allArticles}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              setFilteredArticles={setFilteredArticles}
            />
          </FramerOnScroll>

          {!searchValue ? (
            // Headline Article
            <FramerOnScroll>
              <div className="sm:hidden">
                <Cards size="medium" article={allArticles[0]} />
              </div>
              <div className="hidden sm:block">
                <Cards size="large" article={allArticles[0]} />
              </div>
            </FramerOnScroll>
          ) : (
            // Search Result Text
            <FramerOnScroll key="result" duration={0.25}>
              <div className="flex max-w-[280px] flex-col items-center gap-3 break-all text-center font-poppins-bold sm:max-w-full sm:items-start lg:items-start xl:gap-6">
                <h1 className="border-b-4 border-solid border-custom-pink pb-3 text-3xl xl:pb-6 xl:text-5xl">
                  Hasil Pencarian {`"${searchValue}"`}
                </h1>
                <h2 className="text-xl xl:text-3xl">
                  {filteredArticles.length} Artikel
                </h2>
              </div>
            </FramerOnScroll>
          )}
        </div>

        {/* Displayed Articles */}
        {/* Use searchValue on filtered article key to reset animation */}
        {!searchValue
          ? allArticles.slice(1, countDisplayArticle).map((article) => {
              return (
                <FramerOnScroll key={article.id}>
                  <Cards size="medium" article={article} />
                </FramerOnScroll>
              );
            })
          : filteredArticles.map((article) => {
              return (
                <FramerOnScroll key={`${article.id}_${searchValue}`}>
                  <Cards size="medium" article={article} />
                </FramerOnScroll>
              );
            })}
      </div>

      {/* More Article Button */}
      {countRemainderArticle > 0 && !searchValue && (
        <FramerOnScroll>
          <Button
            color="pink"
            onClick={() => {
              if (countRemainderArticle < 6) {
                setCountDisplayArticle(
                  countDisplayArticle + countRemainderArticle
                );
              } else {
                setCountDisplayArticle(countDisplayArticle + 6);
              }
            }}
          >
            Lebih Banyak Artikel
          </Button>
        </FramerOnScroll>
      )}
    </main>
  );
};

export default ArticlePageContent;

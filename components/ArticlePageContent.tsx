"use client";

import { AllArticlesCMS } from "@/types/cms";
import SearchBar from "./SearchBar";
import Cards from "./Cards";
import Button from "./Button";
import { useState } from "react";

const ArticlePageContent = ({ allArticles }: AllArticlesCMS) => {
  // Search Bar State
  const [searchValue, setSearchValue] = useState("");

  // Filtered Articles (Defaults to allArticles, when no search value)
  const [filteredArticles, setFilteredArticles] = useState(allArticles);

  // Count the articles being displayed (Defaults to 8, when no search value and defaults to 9 when there's search value)
  const [countDisplayArticle, setCountDisplayArticle] = useState(8);
  const countRemainderArticle = filteredArticles.length - countDisplayArticle;

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
          <div className="z-10" data-aos="zoom-in">
            <SearchBar
              allArticles={allArticles}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              setFilteredArticles={setFilteredArticles}
              setCountDisplayArticle={setCountDisplayArticle}
            />
          </div>
          {!searchValue ? (
            // Headline Article
            <>
              <div data-aos="zoom-in" className="sm:hidden">
                <Cards size="medium" article={filteredArticles[0]} />
              </div>
              <div data-aos="zoom-in" className="hidden sm:block">
                <Cards size="large" article={filteredArticles[0]} />
              </div>
            </>
          ) : (
            // Search Result Text
            <div
              data-aos="fade-in"
              data-aos-duration="300"
              className="flex max-w-[280px] flex-col items-center gap-3 break-all text-center font-poppins-bold sm:max-w-full sm:items-start lg:items-start xl:gap-6"
            >
              <h1 className="border-b-4 border-solid border-custom-pink pb-3 text-3xl xl:pb-6 xl:text-5xl">
                Hasil Pencarian {`"${searchValue}"`}
              </h1>
              <h2 className="text-xl xl:text-3xl">
                {filteredArticles.length} Artikel
              </h2>
            </div>
          )}
        </div>

        {/* Displayed Articles */}
        {filteredArticles
          .slice(!searchValue ? 1 : 0, countDisplayArticle)
          .map((article, index) => {
            return (
              // Reset animation with key everytime filteredArticles or its sliced array changes.
              <div
                data-aos="zoom-in"
                key={`${article.id}_${index}_${filteredArticles.length}`}
              >
                <Cards size="medium" article={article} />
              </div>
            );
          })}
      </div>

      {/* More Article Button */}
      {countRemainderArticle > 0 && (
        // Reset button animation everytime countDisplay or filteredArticles is changed.
        <div
          data-aos="zoom-in"
          key={`${countDisplayArticle}_${filteredArticles.length}`}
        >
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
        </div>
      )}
    </main>
  );
};

export default ArticlePageContent;

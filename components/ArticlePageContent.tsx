"use client";

import { AllArticlesCMS } from "@/types/cms";
import SearchBar from "./SearchBar";
import NormalCards from "./NormalCards";
import HeadlineCards from "./HeadlineCards";
import Button from "./Button";
import { useState } from "react";

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
      <div className="grid auto-cols-min grid-cols-[300px] justify-items-center gap-4 sm:grid-cols-[300px_300px] md:grid-cols-[360px_360px] lg:grid-cols-[330px_330px_330px] lg:gap-8 xl:grid-cols-[400px_400px_400px]">
        {/* Search Div*/}
        <div
          className={`flex flex-col gap-8 sm:col-span-2 lg:gap-12 lg:pt-7 xl:gap-14 xl:pt-8 ${
            searchValue &&
            "items-center justify-self-start sm:items-start lg:col-span-3"
          }`}
        >
          {/* Search Bar */}
          <SearchBar
            allArticles={allArticles}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            setFilteredArticles={setFilteredArticles}
          />
          {!searchValue ? (
            // Headline Article
            <>
              <div className="sm:hidden">
                <NormalCards article={allArticles[0]} />
              </div>
              <div className="hidden sm:block">
                <HeadlineCards article={allArticles[0]} />
              </div>
            </>
          ) : (
            // Search Result Text
            <div className="flex max-w-[280px] flex-col items-center gap-3 break-all text-center font-poppins-bold sm:max-w-full sm:items-start lg:items-start xl:gap-6">
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
        {!searchValue
          ? allArticles.slice(1, countDisplayArticle).map((article) => {
              return <NormalCards key={article.id} article={article} />;
            })
          : filteredArticles.map((article) => {
              return <NormalCards key={article.id} article={article} />;
            })}
      </div>

      {/* More Article Button */}
      {countRemainderArticle > 0 && !searchValue && (
        <Button
          color="pink"
          paddingX="25px"
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
      )}
    </main>
  );
};

export default ArticlePageContent;

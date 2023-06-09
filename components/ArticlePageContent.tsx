"use client";

import { AllArticlesCMS } from "@/types/cms";
import SearchBar from "./SearchBar";
import NormalCards from "./NormalCards";
import HeadlineCards from "./HeadlineCards";
import Button from "./Button";
import { useState } from "react";

const ArticlePageContent = ({ allArticles }: AllArticlesCMS) => {
  const [countDisplayArticle, setCountDisplayArticle] = useState(8);
  const countRemainderArticle = allArticles.length - countDisplayArticle;
  return (
    <main className="flex flex-auto justify-center bg-custom-blue px-5 py-12 lg:pb-16">
      {/* Initial View */}
      <div className="flex flex-col items-center gap-8 xl:gap-12">
        {/* Grids */}
        <div className="grid auto-cols-min grid-cols-[300px] justify-items-center gap-4 sm:grid-cols-[300px_300px] md:grid-cols-[360px_360px] lg:grid-cols-[330px_330px_330px] lg:gap-8 xl:grid-cols-[400px_400px_400px]">
          {/* Headline Div*/}
          <div className="flex flex-col items-center justify-center gap-8 sm:col-span-2 lg:gap-12 xl:gap-16">
            <SearchBar />
            <div className="sm:hidden">
              <NormalCards article={allArticles[0]} />
            </div>
            <div className="hidden sm:block">
              <HeadlineCards article={allArticles[0]} />
            </div>
          </div>

          {/* Normal Div */}
          {allArticles.slice(1, countDisplayArticle).map((article) => {
            return (
              <div key={article.id}>
                <NormalCards article={article} />
              </div>
            );
          })}
        </div>

        {/* More Article Button */}
        {countRemainderArticle > 0 && (
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
      </div>

      {/* Result View */}
      <div></div>
    </main>
  );
};

export default ArticlePageContent;

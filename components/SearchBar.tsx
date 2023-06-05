"use client";

import Image from "next/image";
import { useState } from "react";

const SearchBar = () => {
  const tagsExample = [
    "alam semesta",
    "astaga",
    "aphelion",
    "astrobiologi",
    "astrofisika",
    "astronomi posisi",
  ];
  const [searchValue, setSearchValue] = useState(""); // String value in Search Bar
  const [tagsResult, setTagsResult] = useState<Array<string>>([]); // Tags Recommendation

  return (
    <div className="relative flex flex-row items-center gap-3 rounded-xl bg-custom-white p-3">
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
          const newValue = e.target.value;
          const newTagResults = tagsExample.filter((item) => {
            return item.toLowerCase().startsWith(newValue.toLowerCase());
          });
          setSearchValue(newValue);
          setTagsResult(newTagResults);
        }}
      />

      {/* Reset Icon */}
      <button
        className="relative h-[20px] w-[20px]"
        aria-label="Reset Button"
        onClick={() => {
          setSearchValue("");
          setTagsResult([]);
        }}
      >
        <Image src="/reset.svg" alt="Reset Icon" fill={true} />
      </button>

      {/* Tag Recommendation */}
      {/* Only show when search is not empty and tagsResult is not empty */}
      {searchValue && tagsResult.length !== 0 && (
        <div className="absolute left-8 top-16 h-fit w-fit rounded-2xl bg-custom-white px-4 py-2">
          {tagsResult.map((item, index) => {
            return (
              <div
                key={index}
                className="py-1 font-poppins-bold text-lg text-custom-blue"
                onClick={() => {
                  setSearchValue(item);
                  setTagsResult([]);
                }}
              >
                {item}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchBar;

import React from 'react';
import { chunk } from 'lodash'
import { Link } from "react-router-dom";
const { REACT_APP_BASE_DIR, REACT_APP_ROOT_URL } = process.env;


const rand = (min, max) => Math.floor(Math.random() * (max - min) + min)

function Home({ data, current }) {

  const thumbCount = 16;
  const colCount = 2;
  const thumbArray = [];

  // Go back and forth between wide and tall thumbs
  const isWide = (slug) => data.wideBookSlugs.filter(b => b === slug).length;
  const wideBooks = data.sketchbooks.filter(b => isWide(b.slug))
  const tallBooks = data.sketchbooks.filter(b => !isWide(b.slug));

  let lookForWide = false;

  while (thumbArray.length < thumbCount) {
    lookForWide = !lookForWide;
    const books = lookForWide ? wideBooks : tallBooks;
    const book = books[rand(0, books.length - 1)];
    const page = rand(1, +book.pages);
    thumbArray.push({
      name: book.name,
      src: `${REACT_APP_BASE_DIR}/sketchbooks/${book.slug}/${page}-home.jpg`,
      link: `/sketchbook/${book.slug}`
    })
  }

  const columns = chunk(thumbArray, (Math.ceil(thumbCount / colCount)));

  return (
    <main className="Home">
      <div className="Home__Wrapper">
        {columns.map((col, c) => (
          <div
            className="Home__Column"
            key={`${c}-HomeCol`}>
              {col.map((n, i) => {
                return (
                  <Link key={`HomeLink-${i}`} to={n.link}>
                    <img
                      src={n.src}
                    />
                  </Link>)
              })}
            </div>
        ))}
      </div>
    </main>
  )
}



export default Home;
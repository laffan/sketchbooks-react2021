import React, { useEffect } from 'react';
import { parseISO, format } from 'date-fns'

function Book({ data, current }) {

  // Scroll back to start so lozad works.
  useEffect(()=>{
    const book = document.querySelector(".Book");
    if ( book !== undefined ) {
      book.scrollTo(0, 0);
    }
  },[current]);

  const pageData = data.sketchbooks.filter(s => s.slug === current)[0];
  const pages = new Array(pageData.pages).fill();
  const fromISO = pageData.slug.split("--")[0].split('-')[0].split(".").join("-");
  const toISO = pageData.slug.split("--")[0].split('-')[1].split(".").join("-");
  const from = format(parseISO(fromISO), 'LLLL	d, yyyy');
  const to = format(parseISO(toISO), 'LLLL	d, yyyy');
  return (
    <main className="Book">
      <div className="Book__Center">
        <div className="Book__Content">
          <div className="Book__IntroductionWrapper">
            <div className="Book__Introduction">

              <h5>{pageData.name}</h5>
              <h5><strong>{from} - {to}</strong></h5>
              <p>{pageData.description}</p>
            </div>
          </div>
          <div className="Book__Pages">
            <span
              key={`${pageData.slug}-cover`}>
              <img
                data-use-lozad={true}
                data-src={`/sketchbooks/${pageData.slug}/cover-full.jpg`}
              />
            </span>
            {pages.map((n, i) => {
              return (<span
                key={`${pageData.slug}${i}`}
              >
                <img
                  data-use-lozad={true}
                  data-src={`/sketchbooks/${pageData.slug}/${i + 1}-full.jpg`}
                />
              </span>)
            })}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Book;
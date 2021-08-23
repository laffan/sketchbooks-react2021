import React, { useEffect, Component } from 'react';
import { parseISO, format } from 'date-fns'
import ScrollContainer from 'react-indiana-drag-scroll'

const { REACT_APP_BASE_DIR } = process.env;


function Book({ data, current }) {

  // Scroll back to start so lozad works.
  useEffect(() => {
    const book = document.querySelector(".Book");
    if (book !== undefined) {
      book.scrollTo(0, 0);
    }
  }, [current]);


  console.log(data);
  console.log(current);
  const pageData = data.sketchbooks.filter(s => s.slug === current)[0];
  console.log(pageData);
  const pages = new Array(pageData.pages).fill();

  console.log(pages);

  const fromISO = pageData.slug.split("--")[0].split('-')[0].split(".").join("-");
  const toISO = pageData.slug.split("--")[0].split('-')[1].split(".").join("-");
  const from = format(parseISO(fromISO), 'LLLL	d, yyyy');
  const to = format(parseISO(toISO), 'LLLL	d, yyyy');
  return (
    <main className="Book">
      <div className="Book__Center">
        < div className="Book__Content">


          <div className="Book__IntroductionWrapper">
            <div className="Book__Introduction">

              <h5>{pageData.name}</h5>
              <h5><strong>{from} - {to}</strong></h5>
              <p>{pageData.description}</p>
            </div>
          </div>
          <div className="Book__Pages"

          >
            <span
              key={`${pageData.slug}-cover`}>
              <img
                data-use-lozad={true}
                data-src={`${REACT_APP_BASE_DIR}/sketchbooks/${pageData.slug}/cover-full.jpg`}
                style={{
                  maxHeight: pageData.maxHeight + 50
                }}
              />
            </span>
            {pages.map((n, i) => {
              return (<span
                key={`${pageData.slug}${i}`}
              >
                <img
                  style={{
                    maxHeight: pageData.maxHeight
                  }} 
                  data-use-lozad={true}
                  data-src={`${REACT_APP_BASE_DIR}/sketchbooks/${pageData.slug}/${i + 1}-full.jpg`}
                />
              </span>)
            })}
          </div>


        </div>
      </div >
      <div className="Book__ScrollMessage">Scroll »</div>
    </main>
  )
}

export default Book;
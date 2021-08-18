import React, { useState, useEffect } from 'react';
import { NavLink, Link } from "react-router-dom";
import lozad from 'lozad'
import { chunk } from 'lodash'
import { parseISO, format } from 'date-fns'


const rand = (min, max) => Math.floor(Math.random() * (max - min) + min)

function SideNav({ sketchbooks }) {
  return (
    <div className="SideNav">
      <ul>
        <li >
          <NavLink
            strict
            exact
            to={`/`}
            className="SideNav__Logo"
          >
            <img
              data-use-lozad={true}
              data-src={`/logo.png`}
            />

          </NavLink>
        </li>
        {sketchbooks.map((sketchbook, i) => {
          return (
            <li key={`link${i}`} >
              <NavLink
                to={`/${sketchbook.slug}`}
                className="SideNav__Link"
                activeClassName="SideNav__Link--Selected"
              >
                <img
                  title={sketchbook.name}
                  data-use-lozad={true}
                  data-src={`/sketchbooks/${sketchbook.slug}/cover-thumb.jpg`}
                />
              </NavLink>
            </li>
          )
        })}
      </ul>
    </div>
  )
}


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
      src: `/sketchbooks/${book.slug}/${page}-home.jpg`,
      link: `/${book.slug}`
    })
  }

  const columns = chunk(thumbArray, (Math.ceil(thumbCount / colCount)));
  console.log( columns );
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

function Book({ data, current }) {

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

function App({ routeProps }) {

  const isHome = routeProps.match.url === "/" && routeProps.match.isExact;
  const [data, setData] = useState([]);

  const getData = () => {
    fetch('data.json'
      , {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setData(myJson)
      });
  }
  useEffect(() => {
    getData()
  }, []);


  /* 
    Lazy Load Images
  */
  const { observe } = lozad("[data-use-lozad]", {
    threshold: 0.1,
    loaded: (el) => {
      el.classList.add("is-Visible");
    },
  });

  useEffect(() => {
    observe();
  }, [observe]);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [routeProps]);


  return (
    <div className="Content">
      {
        Object.keys(data).length > 0 ? <>
          <SideNav sketchbooks={data.sketchbooks} />
          {isHome
            ? <Home data={data} />
            : <Book data={data} current={routeProps.match.params.page} />
          }
        </> : <p>Loading ...</p>
      }
    </div>
  );
}

export default App;
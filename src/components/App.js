import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";

function App({ routeProps }) {

  console.log(routeProps);

  const [data, setData] = useState([]);
  const [current, setCurrent] = useState([]);

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
        console.log(myJson);
        setData(myJson)
      });
  }
  useEffect(() => {
    getData()
  }, []);


  const SideNav = ({ sketchbooks }) => {
    console.log(sketchbooks)
    return (
      <div className="SideNav">
        <ul>
          <li >
            <NavLink
              strict
              exact
              to={`/`}
              className="SideNav__Link"
              activeClassName="SideNav__Link--Selected"
            >
              Home
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
                  {sketchbook.name}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  const Content = ({ data, current }) => {

    const sketchbookData = data.sketchbooks.filter(s => s.slug === current);

    const pageData = sketchbookData.length ? sketchbookData[0] : data.intro;


    return (
      <div className="Content">
        <h3>{pageData.name}</h3>
        <p>{pageData.description}</p>
      </div>
    )
  }

  return (
    <div className="App">
      {
        Object.keys(data).length > 0 ? <div>
          <SideNav sketchbooks={data.sketchbooks} />
          <Content data={data} current={routeProps.match.params.page} />
        </div> : <p>Loading ...</p>
      }
    </div>
  );
}

export default App;
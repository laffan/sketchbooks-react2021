import React from 'react';
import { NavLink } from "react-router-dom";

const { REACT_APP_BASE_DIR, REACT_APP_ROOT_URL } = process.env;


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
              data-src={`${REACT_APP_BASE_DIR}/logo.png`}
            />

          </NavLink>
        </li>
        {sketchbooks.map((sketchbook, i) => {
          return (
            <li key={`link${i}`} >
              <NavLink
                to={`/sketchbook/${sketchbook.slug}`}
                className="SideNav__Link"
                activeClassName="SideNav__Link--Selected"
              >
                <img
                  title={sketchbook.name}
                  data-use-lozad={true}
                  data-src={`${REACT_APP_BASE_DIR}/sketchbooks/${sketchbook.slug}/cover-thumb.jpg`}
                />
              </NavLink>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default SideNav;
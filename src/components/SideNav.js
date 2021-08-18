import React, { useState, useEffect,useRef } from 'react';
import { NavLink, Link } from "react-router-dom";

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

export default SideNav;
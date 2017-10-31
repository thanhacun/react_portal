import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { MenuItem } from 'react-bootstrap';
import { Route } from 'react-router';

import ThoEdit from '../components/tcct/ThoEdit';
import ThoDisplay from '../components/tcct/ThoDisplay';

const tcctLinks = [
  {
    "id": 0,
    "path": "/tcct/addtho",
    "des": "Thêm thơ mới",
    "component": ThoEdit,
    "menu": true
  },
  {
    "id": 1,
    "path": "/tcct/showtho",
    "des": "Xem thơ",
    "component": ThoDisplay,
    "menu": true
  }
];

const tcctMenuItems = tcctLinks.map((item, key) => {
  if (item.menu) {
    return (
      <LinkContainer to={item.path} key={`tcct_${item.id}`}>
        <MenuItem key={`key_${key}`} eventKey={`${key}.${item.id}`}>{item.des}</MenuItem>
      </LinkContainer>
    )
  } else {
    return null;
  }
});

const tcctRoutes = tcctLinks.map((app) => {
  return (
    <Route path={app.path} component={app.component} key={`tcct_${app.id}`} />
  );
});

export default tcctRoutes;
export { tcctMenuItems };

import React, { PropTypes } from 'react';
import weui from '../../components/Weui';

const { Container, CellsTitle, Cells, Cell, CellHeader, CellBody, CellFooter } = weui;
const StatByCatagory = ({ catagories, stat }) => (
  <Cells>
    {
      catagories.map(({ imageUrl, title, _id }) => (
        <Cell key={_id} >
          <CellHeader>
            <img src={imageUrl} alt={title} style={{ width: '20px', marginRight: '5px', display: 'block' }} />
          </CellHeader>
          <CellBody>{title}</CellBody>
          <CellFooter>{stat[_id] || 0} 个</CellFooter>
        </Cell>
        ))
    }
  </Cells>
  );

export default StatByCatagory;

import React, { PropTypes } from 'react';
import weui from '../../components/Weui';

const { Cells, Cell, CellBody, CellFooter } = weui;
const StatByLastUpdateDate = ({ stat }) => (
  <Cells>
    <Cell>
      <CellBody>一个月内</CellBody>
      <CellFooter>{stat.ltOneMonth || 0} 个</CellFooter>
    </Cell>
    <Cell>
      <CellBody>一至三个月</CellBody>
      <CellFooter>{stat.oneToThreeMonthes || 0} 个</CellFooter>
    </Cell>
    <Cell>
      <CellBody>三至六个月</CellBody>
      <CellFooter>{stat.threeToSixMonthes || 0} 个</CellFooter>
    </Cell>
    <Cell>
      <CellBody>六个月以上</CellBody>
      <CellFooter>{stat.gtSixMonthes || 0} 个</CellFooter>
    </Cell>
  </Cells>
  );

export default StatByLastUpdateDate;

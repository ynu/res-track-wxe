import React, { PropTypes } from 'react';
import weui from '../../components/Weui';
import { getStateColor } from '../common';

const { Cells, Cell, CellBody, CellFooter } = weui;
const StatByCurrentState = ({ stat }) => (
  <Cells>
    <Cell style={{ backgroundColor: getStateColor('success') }}>
      <CellBody>正常</CellBody>
      <CellFooter>{stat.success || 0} 个</CellFooter>
    </Cell>
    <Cell style={{ backgroundColor: getStateColor('warning') }}>
      <CellBody>告警</CellBody>
      <CellFooter>{stat.warning || 0} 个</CellFooter>
    </Cell>
    <Cell style={{ backgroundColor: getStateColor('error') }}>
      <CellBody>错误</CellBody>
      <CellFooter>{stat.error || 0} 个</CellFooter>
    </Cell>
  </Cells>
  );

export default StatByCurrentState;

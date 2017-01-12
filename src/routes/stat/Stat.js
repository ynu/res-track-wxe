import React, { PropTypes } from 'react';
import weui from '../../components/Weui';
import StatByCatagory from './StatByCatagory';
import StatByCurrentState from './StatByCurrentState';
import StatByLastUpdateDate from './StatByLastUpdateDate';
import Footer from '../common/Footer';

const { Container, CellsTitle, Cells, Cell, CellHeader, CellBody, CellFooter } = weui;
const Stat = ({ resCatagories, stat: {
  catagoriesCount, resourcesCount, statesCount,
  countByCatagory, countByCurrentState, countBeforeDate } }) => (
    <Container>
      <div className="page__bd">
        <CellsTitle>概览</CellsTitle>
        <Cells>
          <Cell>
            <CellBody>资源类别</CellBody>
            <CellFooter>{catagoriesCount} 个</CellFooter>
          </Cell>
          <Cell>
            <CellBody>资源总数</CellBody>
            <CellFooter>{resourcesCount} 个</CellFooter>
          </Cell>
          <Cell>
            <CellBody>状态总数</CellBody>
            <CellFooter>{statesCount} 个</CellFooter>
          </Cell>
        </Cells>

        <CellsTitle>资源总数（按资源类型）</CellsTitle>
        <StatByCatagory catagories={resCatagories} stat={countByCatagory} />

        <CellsTitle>资源总数（按当前状态）</CellsTitle>
        <StatByCurrentState stat={countByCurrentState} />
        <CellsTitle>按最近更新时间</CellsTitle>
        <StatByLastUpdateDate stat={countBeforeDate} />
      </div>
      <Footer />
    </Container>
  );

export default Stat;

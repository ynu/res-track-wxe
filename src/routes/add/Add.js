import React, { PropTypes } from 'react';
import weui from '../../components/Weui';

const Add = (props) => {
  const { Container, Button, ButtonArea, CellsTitle, Cells, CellHeader, CellBody, Cell,
    Toast, Label, TextArea } = weui;
  return (
    <Container>
      <div className="page__hd">
        <h1 className="page__title">添加资源</h1>
        <p className="page__desc">添加帐号、IP地址、域名以便进行状态跟踪</p>
      </div>
      <div className="page__bd">
        <CellsTitle>资源</CellsTitle>
        <Cells>
          <div className="weui-cell weui-cell_select weui-cell_select-after">
            <CellHeader>
              <Label>类别</Label>
            </CellHeader>
            <CellBody>
              <select className="weui-select">
                <option value="website">网站</option>
                <option value="ip">IP地址</option>
                <option value="ecard">一卡通</option>
              </select>
            </CellBody>
          </div>
          <Cell>
            <CellHeader>
              <label htmlFor="name" className="weui-label">名称</label>
            </CellHeader>
            <CellBody>
              <input className="weui-input" placeholder="域名/IP地址/卡号..." />
            </CellBody>
          </Cell>
        </Cells>
        <CellsTitle>初始状态</CellsTitle>
        <Cells>
          <div className="weui-cell weui-cell_select weui-cell_select-after">
            <CellHeader>
              <Label>状态</Label>
            </CellHeader>
            <CellBody>
              <select className="weui-select">
                <option value="success">正常</option>
                <option value="warning">告警</option>
                <option value="error">错误</option>
              </select>
            </CellBody>
          </div>
          <Cell>
            <CellBody>
              <TextArea placeholder="请输入状态描述" rows="5" showCounter maxlength={200} />
            </CellBody>
          </Cell>
        </Cells>
        <ButtonArea>
          <Button>确定</Button>
        </ButtonArea>
      </div>
      <Toast loading >加载中</Toast>
    </Container>
  );
};

export default Add;

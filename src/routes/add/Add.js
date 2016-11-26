import React, { PropTypes } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import weui from '../../components/Weui';
import NewState from './NewState';
import EnsureSingup from '../common/EnsureSignupWxe';

const Add = (props) => {
  const { Container, Button, ButtonArea, CellsTitle, Cells, CellHeader, CellBody, Cell,
    Toast, Label } = weui;
  const { handleSubmit, noteLength, submitRes, loading } = props;
  return (
    <Container>
      <EnsureSingup />
      <div className="weui-flex">
        <div className="weui-flex__item">
          <Button style={{ margin: '5px' }} type="default" size="small" plain href="/" >
              &lt; &lt; 资源列表
            </Button>
        </div>
        <div className="weui-flex__item" />
      </div>
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
              <Field component="select" name="catagory" className="weui-select" >
                <option value="website">网站</option>
                <option value="ip">IP地址</option>
                <option value="ecard">一卡通</option>
              </Field>
            </CellBody>
          </div>
          <Cell>
            <CellHeader>
              <label htmlFor="name" className="weui-label">名称</label>
            </CellHeader>
            <CellBody>
              <Field component="input" name="name" className="weui-input" placeholder="域名/IP地址/卡号..." />
            </CellBody>
          </Cell>
        </Cells>
        <CellsTitle>初始状态</CellsTitle>
        <NewState noteLength={noteLength} />
        <ButtonArea>
          <Button onClick={handleSubmit(submitRes)}>确定</Button>
        </ButtonArea>
      </div>
      <Toast loading show={loading} >加载中</Toast>
    </Container>
  );
};

const mapStateToProps = state => {
  const selector = formValueSelector('resource');
  const { note } = selector(state, 'state') || {};
  return {
    noteLength: note ? note.length : 0,
    loading: state.toast.loading,
  };
};
export default connect(mapStateToProps)(reduxForm({
  form: 'resource',
  initialValues: {
    catagory: 'website',
    state: { catagory: 'success' },
  },
})(Add));

import React, { PropTypes } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import weui from '../../components/Weui';
import EnsureSingup from '../common/EnsureSignupWxe';
import AddCatagory from './AddCatagory';
import Remove from './Remove';

class ResCatagory extends React.Component {
  render() {
    const { Container, CellsTitle, Cells, Toast, Button, Cell, CellHeader, CellBody } = weui;
    return (
      <Container>
        <EnsureSingup />
        <div className="page__hd">
          <h1 className="page__title">资源类别</h1>
          <p className="page__desc">添加/删除资源类别</p>
        </div>
        <div className="page__bd">
          <CellsTitle>添加类别</CellsTitle>
          <AddCatagory />

          <CellsTitle>删除类别</CellsTitle>
          <Remove />
        </div>
        <Toast loading />
      </Container>
    );
  }
}

export default reduxForm({
  form: 'add-res-catagory',
})(ResCatagory);

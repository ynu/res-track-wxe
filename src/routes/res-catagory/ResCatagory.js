import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import weui from '../../components/Weui';
import EnsureSingup from '../common/EnsureSignupWxe';
import AddCatagory from './AddCatagory';
import Remove from './Remove';
import * as actions from '../../actions/res-catagory';

class ResCatagory extends React.Component {
  componentDidMount() {
    this.props.listResCatagories();
  }
  render() {
    const { Container, CellsTitle, Toast } = weui;
    return (
      <Container>
        <EnsureSingup />
        <div className="page__hd">
          <h1 className="page__title">资源类别</h1>
          <p className="page__desc">添加/删除资源类别</p>
        </div>
        <div className="page__bd">
          <CellsTitle>类别列表</CellsTitle>
          <Remove catagories={this.props.catagories} remove={this.props.removeResCatagory} />
          <CellsTitle>添加类别</CellsTitle>
          <AddCatagory add={this.props.addResCatagory} />
        </div>
        <Toast loading show={this.props.loading} >加载中</Toast>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  catagories: state.resCatagories,
  loading: state.toast.loading,
});
export default connect(mapStateToProps, { ...actions })(ResCatagory);

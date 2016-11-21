import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { change, formValueSelector } from 'redux-form';
import weui from '../../components/Weui';
import Filter from './Filter';
import ResItem from './ResItem';
import * as actions from '../../actions/list';
import EnsureSingup from '../common/EnsureSignupWxe';

class List extends React.Component {
  render() {
    const { resources, loading, filter } = this.props;
    const { Container, SearchBar, CellsTitle, Cells, Toast, Button } = weui;
    const search = text => this.props.change('itemfilter', 'text', text);
    const filteredResources = resources.filter(res => filter ? res.name.includes(filter) : true);

    return (
      <Container>
        <EnsureSingup />
        <div className="weui-flex">
            <div className="weui-flex__item">
            </div>
            <div className="weui-flex__item" style={{ textAlign: 'right' }}>
              <Button style={{ margin: '5px' }} type="default" size="small" plain href="/add" >
                新增资源 &gt;&gt;
              </Button>
            </div>
        </div>
        <SearchBar onChange={search.bind(this)} />
        <CellsTitle>筛选</CellsTitle>
        <Filter />
        <CellsTitle>共{filteredResources.length}个资源</CellsTitle>
        <Cells>
          {
            filteredResources.length ? filteredResources.map(res => <ResItem key={res._id} {...res} />)
            : (
            <div className="weui-loadmore weui-loadmore_line">
              <span className="weui-loadmore__tips">暂无数据</span>
            </div>)
          }
        </Cells>
        <Toast loading show={loading} >处理中</Toast>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const selector = formValueSelector('itemfilter');
  const text = selector(state, 'text');
  return {
    resources: state.list.data,
    loading: state.toast.loading,
    filter: text,
  };
};

export default connect(mapStateToProps, { ...actions, change })(List);

import React, { PropTypes } from 'react';
import { reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import weui from '../../components/Weui';
import NewState from '../add/NewState';
import PageHeader from '../detail/PageHeader';
import EnsureSingup from '../common/EnsureSignupWxe';
import * as actions from '../../actions/detail';

class AddState extends React.Component {
  componentDidMount() {
    const { getResource, resId } = this.props;
    getResource(resId);
  }
  render() {
    const { Container, Button, ButtonArea, CellsTitle, Toast } = weui;
    const { handleSubmit, noteLength, addState, resource, loading } = this.props;
    return (
      <Container>
        <EnsureSingup />
        <div className="weui-flex">
          <div className="weui-flex__item">
            <Button style={{ margin: '5px' }} type="default" size="small" plain href="/" >
              &lt; &lt; 资源列表
            </Button>
          </div>
          <div className="weui-flex__item" style={{ textAlign: 'right' }}>
            <Button style={{ margin: '5px' }} type="default" size="small" plain href="/add" >
              新增资源 &gt;&gt;
            </Button>
          </div>
        </div>
        <PageHeader name={resource.name} {...resource.currentState} />
        <div className="page__bd">
          <CellsTitle>新状态</CellsTitle>
          <NewState noteLength={noteLength} />
          <ButtonArea>
            <Button onClick={handleSubmit(addState)}>确定</Button>
          </ButtonArea>
        </div>
        <Toast loading show={loading} >加载中</Toast>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const selector = formValueSelector('resource');
  const { note } = selector(state, 'state') || {};
  return {
    noteLength: note ? note.length : 0,
    loading: state.toast.loading,
    resource: state.detail,
  };
};
export default connect(mapStateToProps, { ...actions })(reduxForm({
  form: 'resource',
  initialValues: {
    state: { catagory: 'success' },
  },
})(AddState));

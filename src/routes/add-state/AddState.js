import React, { PropTypes } from 'react';
import TimeAgo from 'timeago-react';
import { reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import weui from '../../components/Weui';
import NewState from '../add/NewState';
import PageHeader from '../detail/PageHeader';
import EnsureSingup from '../common/EnsureSignupWxe';

let AddState = ({
  handleSubmit, noteLength, addState, name, loading, currentState, catagory
}) => {
  const { Container, Button, ButtonArea, CellsTitle, Toast } = weui;
  return (
    <Container>
      <EnsureSingup />
      <div className="weui-flex">
            <div className="weui-flex__item">
              <Button style={{ margin: '5px' }} type="default" size="small" plain href="/add" >
                &lt; &lt; 资源列表
              </Button>
            </div>
            <div className="weui-flex__item" style={{ textAlign: 'right' }}>
              <Button style={{ margin: '5px' }} type="default" size="small" plain href="/add" >
                新增资源 &gt;&gt;
              </Button>
            </div>
        </div>
      <PageHeader name={name} {...currentState} />
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
};

AddState = reduxForm({
  form: 'resource',
  initialValues: {
    state: { catagory: 'success' },
  },
})(AddState);

const mapStateToProps = state => {
  const selector = formValueSelector('resource');
  const { note } = selector(state, 'state') || {};
  return {
    noteLength: note ? note.length : 0,
    loading: state.toast.loading,
  };
};
export default connect(mapStateToProps)(AddState);

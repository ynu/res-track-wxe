import React, { PropTypes } from 'react';
import { reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import weui from '../../components/Weui';
import NewState from '../add/NewState';
import PageHeader from '../detail/PageHeader';
import EnsureSingup from '../common/EnsureSignupWxe';
import * as actions from '../../actions/detail';
import * as fileActions from '../../actions/files';
import * as wechatActions from '../../actions/wechat';
import Footer from '../common/Footer';
import WeChat from '../../components/WeChat';

class AddState extends React.Component {

  static propTypes = {
    selectEnterpriseContact: React.PropTypes.func,
    selectedEnterpriseContact: PropTypes.object,
  };

  async componentDidMount() {
    const { getResource, resId } = this.props;
    getResource(resId);
  }

  renderSelectedUser() {
    const { jssdk, selectedEnterpriseContact } = this.props;
    if (!jssdk.isReady) return '正在加载组件';
    const { userList } = selectedEnterpriseContact || {};
    if (!userList || !userList.length) return '请选择';
    return userList.map(user => (
      <img src={user.photo} alt={user.name} style={{ margin: '1px' }} key={user.id} />
    ));
  }

  render() {
    const removePhoto = file => {
      const removedFile = this.props.files.find(photo => photo.url === file.url);
      this.props.remove(removedFile.serverId);
    };
    const { Container, Button, ButtonArea, CellsTitle, Toast, Uploader, Cells, Cell, CellBody, CellFooter } = weui;
    const { handleSubmit, noteLength, addState, resource, loading, selectedEnterpriseContact, selectEnterpriseContact } = this.props;

    const add = values => addState({
      ...values,
      state: {
        ...values.state,
        files: this.props.files.map(file => file.serverId),
        // sendTo: ['na57'],
        sendTo: selectedEnterpriseContact.userList.map(user => (user.id)),
      },
    });
    return (
      <Container>
        <EnsureSingup />
        <WeChat.WxConfig jsApiList={['openEnterpriseContact']} />
        <WeChat.WxSelectUser
          bind={func => (document.querySelector('#btnTest').onclick = func)}
          selectedUserIds={selectedEnterpriseContact.userList.map(user => (user.id))}
          onFinish={result => {
            if (result.selectAll) {
              alert('系统暂不支持选择全部，请重新选择');
              return;
            }
            selectEnterpriseContact(result);
          }}
        />
        <PageHeader name={resource.name} {...resource.currentState} />
        <div className="page__bd">
          <CellsTitle>新状态</CellsTitle>
          <NewState noteLength={noteLength} />
          <Cells>
            <Cell>
              <CellBody>
                <Uploader
                  title="上传图片"
                  maxCount="9"
                  files={this.props.files}
                  onChange={this.props.upload}
                  onRemove={removePhoto}
                />
              </CellBody>
            </Cell>
          </Cells>
          <CellsTitle>通知他人</CellsTitle>
          <Cells>
            <Cell href="javascript:;" id="btnTest" access>
              <CellBody>
                { this.renderSelectedUser() }
              </CellBody>
              <CellFooter />
            </Cell>
          </Cells>
          <ButtonArea>
            <Button onClick={handleSubmit(add)}>确定</Button>
          </ButtonArea>
        </div>
        <Footer />
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
    files: state.uploader.files,
    ...state.wechat,
  };
};
export default connect(mapStateToProps, {
  ...actions,
  ...fileActions,
  ...wechatActions,
})(reduxForm({
  form: 'resource',
  initialValues: {
    state: { catagory: 'success' },
  },
})(AddState));

import React, { PropTypes } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import weui from '../../components/Weui';
import NewState from './NewState';
import EnsureSingup from '../common/EnsureSignupWxe';
import Footer from '../common/Footer';
import * as fileActions from '../../actions/files';
import * as wechatActions from '../../actions/wechat';
import WeChat from '../../components/WeChat';


const Add = (props) => {
  const { Container, Button, ButtonArea, CellsTitle, Cells, CellHeader, CellBody, Cell,
    Toast, Label, Uploader, CellFooter } = weui;
  const { handleSubmit, noteLength, submitRes, loading, resCatagories, selectedEnterpriseContact, selectEnterpriseContact } = props;
  const add = async values => await submitRes({
    ...values,
    state: {
      ...values.state,
      files: props.files.map(file => file.serverId),
    },
  });
  const removePhoto = file => {
    const removedFile = props.files.find(photo => photo.url === file.url);
    props.remove(removedFile.serverId);
  };

  const renderSelectedUser = () => {
    const { userList } = props.selectedEnterpriseContact || {};
    if (!userList || !userList.length) return '请选择';
    return userList.map(user => (
      <img src={user.photo} alt={user.name} style={{ margin: '1px' }} key={user.id} />
    ));
  };

  return (
    <Container>
      <EnsureSingup />
      <WeChat.WxConfig debug jsApiList={['openEnterpriseContact']} />
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
                <option value="" >全部</option>
                {
                  resCatagories.map(catagory => (
                    <option key={catagory._id} value={catagory._id} >{catagory.title}</option>
                  ))
                }
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
          <Cell href="javascript:;" id="btnTest" access>
            <CellHeader>管理员</CellHeader>
            <CellBody>
              { renderSelectedUser() }
            </CellBody>
            <CellFooter />
          </Cell>
        </Cells>
        <CellsTitle>初始状态</CellsTitle>
        <NewState noteLength={noteLength} />
        <Cells>
          <Cell>
            <CellBody>
              <Uploader
                title="上传图片"
                maxCount="9"
                files={props.files}
                onChange={props.upload}
                onRemove={removePhoto}
              />
            </CellBody>
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
};

const mapStateToProps = state => {
  const selector = formValueSelector('resource');
  const { note } = selector(state, 'state') || {};
  return {
    noteLength: note ? note.length : 0,
    loading: state.toast.loading,
    files: state.uploader.files,
    ...state.wechat,
  };
};
export default connect(mapStateToProps, {
  ...fileActions,
  ...wechatActions,
})(reduxForm({
  form: 'resource',
  initialValues: {
    catagory: 'website',
    state: { catagory: 'success' },
  },
})(Add));

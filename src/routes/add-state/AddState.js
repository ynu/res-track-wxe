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
import fetch from '../../core/fetch';

const evalWXjsApi = function (jsApiFun) {
  if (typeof WeixinJSBridge === 'object' && typeof WeixinJSBridge.invoke === 'function') {
    jsApiFun();
  } else {
    document.attachEvent && document.attachEvent('WeixinJSBridgeReady', jsApiFun);
    document.addEventListener && document.addEventListener('WeixinJSBridgeReady', jsApiFun);
  }
};

class AddState extends React.Component {

  static propTypes = {
    selectEnterpriseContact: React.PropTypes.func,
    selectedEnterpriseContact: PropTypes.object,
  };
  async componentDidMount() {
    const { getResource, resId } = this.props;
    getResource(resId);

    this.configWx();
  }

  /**
   * 配置微信企业号JSSDK
   */
  async configWx() {
    const jsApiList = ['openEnterpriseContact'];
    const url = encodeURIComponent(window.location.href.split('#')[0]);
    let res = await fetch(`/api/wxe-auth/jsconfig?jsApiList=${JSON.stringify(jsApiList)}&url=${url}&debug=true`);
    const result = await res.json();
    wx.config(result.data);
    wx.ready(async () => {
      res = await fetch(`/api/wxe-auth/groupConfig?url=${url}`);
      const result2 = await res.json();
      document.querySelector('#btnTest').onclick = () => {
        const { userList } = this.props.selectedEnterpriseContact;
        evalWXjsApi(() => {
          WeixinJSBridge.invoke('openEnterpriseContact', {
            ...result2.data,
            params: {
              departmentIds: [0],    // 非必填，可选部门ID列表（如果ID为0，表示可选管理组权限下所有部门）
                      // 'tagIds' : [1],    // 非必填，可选标签ID列表（如果ID为0，表示可选所有标签）
                      // 'userIds' : ['zhangsan','lisi'],    // 非必填，可选用户ID列表
              mode: 'multi',    // 必填，选择模式，single表示单选，multi表示多选
              type: ['user'],    // 必填，选择限制类型，指定department、tag、user中的一个或者多个
              // selectedDepartmentIds: departmentList.map(dept => dept.id),    // 非必填，已选部门ID列表
              // selectedTagIds: [],    // 非必填，已选标签ID列表
              selectedUserIds: userList.map(user => user.id),    // 非必填，已选用户ID列表
            },
          }, (res) => {
            if (!res) return;
            if (res.err_msg.indexOf('function_not_exist') > -1) {
              alert('版本过低请升级');
            } else if (res.err_msg.indexOf('openEnterpriseContact:fail') > -1) {
              alert(JSON.stringify(res));
              return;
            }
            const result = JSON.parse(res.result);    // 返回字符串，开发者需自行调用JSON.parse解析
            if (result.selectAll) {
              alert('系统暂不支持选择全部，请重新选择');
              return;
            }
            alert(res.result);
            this.props.selectEnterpriseContact(res.result);
          });
        });
      };
    });
  }

  // componentWillReceiveProps(nextProps) {
  //   if (alert) alert(JSON.stringify(this.props.selectedEnterpriseContact));
  // }

  renderSelectedUser() {
    alert(`####::${JSON.stringify(this.props.selectedEnterpriseContact)}`);
    const { userList } = this.props.selectedEnterpriseContact || {};
    if (!userList || !userList.length) return '请选择';

    return userList.map(user => (
      <img src={user.photo} alt={user.name} key={user.id} />
    ));
  }

  render() {
    const removePhoto = file => {
      const removedFile = this.props.files.find(photo => photo.url === file.url);
      this.props.remove(removedFile.serverId);
    };
    const { Container, Button, ButtonArea, CellsTitle, Toast, Uploader, Cells, Cell, CellBody, CellFooter } = weui;
    const { handleSubmit, noteLength, addState, resource, loading, selectedEnterpriseContact } = this.props;

    const add = values => addState({
      ...values,
      state: {
        ...values.state,
        files: this.props.files.map(file => file.serverId),
        sendTo: selectedEnterpriseContact.userList.map(user => (user.id)),
      },
    });
    return (
      <Container>
        <EnsureSingup />
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

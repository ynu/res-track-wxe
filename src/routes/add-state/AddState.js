import React, { PropTypes } from 'react';
import { reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import weui from '../../components/Weui';
import NewState from '../add/NewState';
import PageHeader from '../detail/PageHeader';
import EnsureSingup from '../common/EnsureSignupWxe';
import * as actions from '../../actions/detail';
import * as fileActions from '../../actions/files';
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

const selectUsers = () => null;

class AddState extends React.Component {
  async componentDidMount() {
    const { getResource, resId } = this.props;
    getResource(resId);

    const jsApiList = ['openEnterpriseContact'];
    const url = encodeURIComponent(window.location.href);
    let res = await fetch(`/api/wxe-auth/jsconfig?jsApiList=${JSON.stringify(jsApiList)}&url=${url}&debug=true`);
    const result = await res.json();
    wx.config(result.data);
    wx.ready(async () => {
      wx.checkJsApi({
        jsApiList: ['openEnterpriseContact'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
        success(res) {
          alert(JSON.stringify(res));
        },
      });
      res = await fetch(`/api/wxe-auth/groupConfig?url=${url}`);
      const result2 = await res.json();
      document.querySelector('#btnTest').onclick = function () {
        evalWXjsApi(() => {
          WeixinJSBridge.invoke('openEnterpriseContact', {
            ...result2.data,
            params: {
                      // 'departmentIds' : [0],    // 非必填，可选部门ID列表（如果ID为0，表示可选管理组权限下所有部门）
                      // 'tagIds' : [1],    // 非必填，可选标签ID列表（如果ID为0，表示可选所有标签）
                      // 'userIds' : ['zhangsan','lisi'],    // 非必填，可选用户ID列表
              mode: 'single',    // 必填，选择模式，single表示单选，multi表示多选
              type: ['department', 'tag', 'user'],    // 必填，选择限制类型，指定department、tag、user中的一个或者多个
                      // 'selectedDepartmentIds' : [],    // 非必填，已选部门ID列表
                      // 'selectedTagIds' : [],    // 非必填，已选标签ID列表
                      // 'selectedUserIds' : [],    // 非必填，已选用户ID列表
            },
          }, (res) => {
            alert(JSON.stringify(res));
            if (res.err_msg.indexOf('function_not_exist') > -1) {
              alert('版本过低请升级');
            } else if (res.err_msg.indexOf('openEnterpriseContact:fail') > -1) {
              return;
            }
            const result = JSON.parse(res.result);    // 返回字符串，开发者需自行调用JSON.parse解析
            console.log(result);
                  // var selectAll = result.selectAll;     // 是否全选（如果是，其余结果不再填充）
                  // if (!selectAll)
                  // {
                  //     var selectedDepartmentList = result.departmentList;    // 已选的部门列表
                  //     for (var i = 0; i < selectedDepartmentList.length; i++) {
                  //         var department = selectedDepartmentList[i];
                  //         var departmentId = department.id;    // 已选的单个部门ID
                  //         var departemntName = department.name;    // 已选的单个部门名称
                  //     }
                  //     var selectedTagList = result.tagList;    // 已选的标签列表
                  //     for (var i = 0; i < selectedTagList.length; i++) {
                  //         var tag = selectedTagList[i];
                  //         var tagId = tag.id;    // 已选的单个标签ID
                  //         var tagName = tag.name;    // 已选的单个标签名称
                  //     }
                  //     var selectedUserList = result.userList;    // 已选的成员列表
                  //     for (var i = 0; i < selectedUserList.length; i++) {
                  //         var user = selectedUserList[i];
                  //         var userId = user.id;    // 已选的单个成员ID
                  //         var userName = user.name;    // 已选的单个成员名称
                  //     }
                  // }
          });
        });
      };
    });
  }
  render() {
    const removePhoto = file => {
      const removedFile = this.props.files.find(photo => photo.url === file.url);
      this.props.remove(removedFile.serverId);
    };
    const { Container, Button, ButtonArea, CellsTitle, Toast, Uploader, Cells, Cell, CellBody } = weui;
    const { handleSubmit, noteLength, addState, resource, loading } = this.props;

    const add = values => addState({
      ...values,
      state: {
        ...values.state,
        files: this.props.files.map(file => file.serverId),
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
          <Button id="btnTest">测试</Button>
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
  };
};
export default connect(mapStateToProps, {
  ...actions,
  ...fileActions,
})(reduxForm({
  form: 'resource',
  initialValues: {
    state: { catagory: 'success' },
  },
})(AddState));

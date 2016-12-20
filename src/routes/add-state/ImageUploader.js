/*
eslint-disable new-cap
 */

/*
用于上传图片的组合组件，集成了微信jssdk的上传图片功能。
回调函数：
OnWxUpload(serverId, file): 当图片上传到微信服务器后调用。
OnClear(): 用户点击清空按钮，数据被清空后调用。
 */
import React, { PropTypes } from 'react';
import emptyFunction from 'fbjs/lib/emptyFunction';
import weui from '../../components/Weui';
import fetch from '../../core/fetch';

class ImageUploader extends React.Component {
  static propTypes = {
    title: React.PropTypes.string,
    maxCount: PropTypes.number,
    onChange: PropTypes.func,
    onUploaded: PropTypes.func,
    onRemoved: PropTypes.func,
  };
  static defaultProps = {
    title: '上传图片',
    maxCount: 9,
    onUploaded: emptyFunction,
    onRemoved: emptyFunction,
  };
  constructor(props) {
    super(props);
    this.state = {
      Photoes: [],
      PhotoIds: [],
    };
  }

  async componentDidMount() {
    const jsApiList = JSON.stringify(['uploadImage']);
    const url = encodeURIComponent(window.location.href);
    console.log(window.location.href);
    const res = await fetch(`/api/wxe-auth/jsconfig?jsApiList=${jsApiList}&url=${url}`);
    const result = await res.json();
    console.log(result);
  }

  render() {
    const { CellBody, Cell, Uploader } = weui;
    const { onUploaded,
      title, maxCount } = this.props;
    const changePhoto = async file => {
      const { Photoes } = this.state;

      // 更新当前显示的图片列表
      this.setState({
        Photoes: [
          ...Photoes,
          {
            url: file.data,
          }],
      });

      // 上传图片到服务器
      const data = new FormData();
      data.append('file', file.nativeFile);
      const res = await fetch('/api/files', {
        credentials: 'same-origin',
        method: 'PUT',
        body: data,
      });
      const result = await res.json();
      // 执行自定义代码
      onUploaded(result.data);
    };

    const removePhoto = (file, index) => {
      const photoes = this.state.Photoes.filter(photo => photo.url !== file.url);
      this.setState({ Photoes: photoes });
      onRemoved();
    };
    return (
      <div>
        <Cell>
          <CellBody>
            <Uploader
              title={title}
              maxCount={maxCount}
              files={this.state.Photoes}
              onChange={changePhoto}
              onRemove={removePhoto}
            />
          </CellBody>
        </Cell>
      </div>
    );
  }
}

export default ImageUploader;

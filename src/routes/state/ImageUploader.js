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

class ImageUploader extends React.Component {
  static propTypes = {
    title: React.PropTypes.string,
    maxCount: PropTypes.number,
    OnChange: PropTypes.func,
    OnWxUpload: PropTypes.func,
    OnClear: PropTypes.func,
    clearButtonText: PropTypes.string,
    tip: PropTypes.string,
  };
  static defaultProps = {
    title: '图片上传',
    maxCount: 9,
    clearButtonText: '清空',
    OnChange: emptyFunction,
    OnWxUpload: emptyFunction,
    OnClear: emptyFunction,
  };
  constructor(props) {
    super(props);
    this.state = {
      Photoes: [],
      PhotoIds: [],
    };
  }
  render() {
    const { Container, ButtonArea, Button, Toast, CellBody, Cell, Uploader } = weui;
    const { OnChange, OnWxUpload, OnClear,
      title, maxCount, clearButtonText, tip } = this.props;
    const changePhoto = file => {
      const { Photoes, PhotoIds } = this.state;
      this.setState({
        Photoes: [
          ...Photoes,
          {
            url: file.data,
          }],
      });
      if (wx && wx.ready && wx.uploadImage) {
        wx.ready(() =>
          wx.uploadImage({
            localId: file.data,
            success: res => {
              this.setState({
                PhotoIds: [
                  ...PhotoIds,
                  res.serverId,
                ] });
              OnWxUpload(res.serverId, file);
            },
          }));
      }
      OnChange(file);
    };
    const clearPhoto = () => {
      this.setState({
        Photoes: [],
        PhotoIds: [],
      });
      OnClear();
    };
    const removePhoto = (file, index) => {
      const photoes = this.state.Photoes.filter(photo => photo.url !== file.url);
      this.setState({ Photoes: photoes });
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

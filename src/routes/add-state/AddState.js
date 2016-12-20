import React, { PropTypes } from 'react';
import { reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import weui from '../../components/Weui';
import NewState from '../add/NewState';
import PageHeader from '../detail/PageHeader';
import EnsureSingup from '../common/EnsureSignupWxe';
import * as actions from '../../actions/detail';
import Footer from '../common/Footer';

class AddState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
    };
  }
  componentDidMount() {
    const { getResource, resId } = this.props;
    getResource(resId);
  }
  render() {
    const changePhoto = async file => {
      // 上传图片到服务器
      const data = new FormData();
      data.append('file', file.nativeFile);
      const res = await fetch('/api/files', {
        credentials: 'same-origin',
        method: 'PUT',
        body: data,
      });
      const result = await res.json();

      this.setState({
        files: [
          ...this.state.files,
          {
            url: file.data,
            serverId: result.data,
          },
        ],
      });
    };
    const removePhoto = file => {
      const files = this.state.files.filter(photo => photo.url !== file.url);
      this.setState({ files });
      const removedFile = this.state.files.find(photo => photo.url === file.url);
      if (removedFile) {
        console.log(removedFile.serverId);
        fetch(`/api/files/${removedFile.serverId}`, {
          credentials: 'same-origin',
          method: 'DELETE',
        });
      }
    };
    const { Container, Button, ButtonArea, CellsTitle, Toast, Uploader, Cells, Cell, CellBody } = weui;
    const { handleSubmit, noteLength, addState, resource, loading } = this.props;

    const add = values => addState({
      ...values,
      state: {
        ...values.state,
        files: this.state.files.map(file => file.serverId),
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
                  files={this.state.files.map(file => ({ url: file.url }))}
                  onChange={changePhoto}
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

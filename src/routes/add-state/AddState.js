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

class AddState extends React.Component {
  componentDidMount() {
    const { getResource, resId } = this.props;
    getResource(resId);
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

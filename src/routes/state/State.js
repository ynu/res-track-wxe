import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import TimeAgo from 'timeago-react';
import weui from '../../components/Weui';
import Footer from '../common/Footer';
import EnsureSingup from '../common/EnsureSignupWxe';
import * as actions from '../../actions/detail';
import ImageUploader from './ImageUploader';

class State extends React.Component {
  componentDidMount() {
    const { getResource, resId } = this.props;
    getResource(resId);
  }
  render() {
    const { Container, ButtonArea, Button, CellsTitle, Toast, CellBody, Cell, Uploader } = weui;
    const { resource: { states, name }, loading, stateId } = this.props;
    const state = states.find(s => (s._id === stateId));
    if (!state) return null;
    console.log(state);
    return (
      <Container>
        <EnsureSingup />
        <div className="page__hd">
          <h1 className="page__title">{name}</h1>
          <p className="page__desc">
            {state.note} | <TimeAgo datetime={state.date} locale="zh_CN" />
          </p>
        </div>
        <div className="page__bd">
          <ImageUploader />
        </div>
        <Footer />
        <Toast loading show={loading} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  resource: state.detail,
  loading: state.toast.loading,
});
export default connect(mapStateToProps, { ...actions })(State);

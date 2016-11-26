import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import weui from '../../components/Weui';
import PageHeader from './PageHeader';
import StatePanel from './StatePanel';
import EnsureSingup from '../common/EnsureSignupWxe';
import * as actions from '../../actions/detail';
import Footer from '../common/Footer';

class Detail extends React.Component {
  static propTypes = {
    resource: PropTypes.object.isRequired,
  };
  componentDidMount() {
    const { getResource, resId } = this.props;
    getResource(resId);
  }
  render() {
    const { Container, ButtonArea, Button, CellsTitle, Toast } = weui;
    const { resource: { _id, name, states, currentState }, loading } = this.props;
    return (
      <Container>
        <EnsureSingup />
        <PageHeader name={name} {...currentState} />
        <div className="page__bd">
          <div className="weui-loadmore weui-loadmore_line">
            <span className="weui-loadmore__tips" />
          </div>
          <StatePanel states={states.reverse()} resId={_id} />
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
export default connect(mapStateToProps, { ...actions })(Detail);

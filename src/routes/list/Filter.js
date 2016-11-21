import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, getFormValues } from 'redux-form';
import weui from '../../components/Weui';
import * as actions from '../../actions/list';

class Filter extends React.Component {
  componentDidMount() {
    const { findResources, params } = this.props;
    findResources(params);
  }
  componentWillReceiveProps(nextProps) {
    const { findResources, params } = this.props;
    const nextParams = nextProps.params;
    if (params.catagory !== nextParams.catagory
      || params.state !== nextParams.state
      || params.before !== nextParams.before
    ) {
      findResources(nextParams);
    }
  }
  render() {
    const { Cells, Cell, CellHeader, CellBody, Label } = weui;
    return (
      <Cells>
        <div className="weui-cell weui-cell_select weui-cell_select-after">
          <CellHeader>
            <Label>类别</Label>
          </CellHeader>
          <CellBody>
            <Field component="select" name="catagory" className="weui-select">
              <option value="" >全部</option>
              <option value="website">网站</option>
              <option value="ip">IP地址</option>
              <option value="ecard">一卡通</option>
            </Field>
          </CellBody>
        </div>
        <div className="weui-cell weui-cell_select weui-cell_select-after">
          <CellHeader>
            <Label>状态</Label>
          </CellHeader>
          <CellBody>
            <Field component="select" name="state" className="weui-select">
              <option value="" >全部</option>
              <option value="success">正常</option>
              <option value="warning">告警</option>
              <option value="error">错误</option>
            </Field>
          </CellBody>
        </div>
        <Cell>
          <CellHeader>
            <Label>日期前</Label>
          </CellHeader>
          <CellBody>
            <Field
              component="input" name="before"
              className="weui-input" type="date"
            />
          </CellBody>
        </Cell>
      </Cells>
    );
  }
}

const mapStateToProps = state => {
  return {
    initialValues: {
      ...getFormValues('listFilter')(state),
    },
    params: getFormValues('listFilter')(state) || {},
  };
};
export default connect(mapStateToProps, { ...actions })(reduxForm({
  form: 'listFilter',
})(Filter));

import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import weui from '../../components/Weui';

const NewState = ({ noteLength }) => {
  const { Cells, CellHeader, CellBody, Cell, Label } = weui;
  return (
    <Cells>
      <div className="weui-cell weui-cell_select weui-cell_select-after">
        <CellHeader>
          <Label>状态</Label>
        </CellHeader>
        <CellBody>
          <Field component="select" name="state.catagory" className="weui-select">
            <option value="success">正常</option>
            <option value="warning">告警</option>
            <option value="error">错误</option>
          </Field>
        </CellBody>
      </div>
      <Cell>
        <CellBody>
          <div>
            <Field
              component="textarea"
              className="weui-textarea"
              name="state.note"
              placeholder="请输入状态描述" rows="5"
            />
            <div className="weui-textarea-counter">
              {noteLength}/200
            </div>
          </div>
        </CellBody>
      </Cell>
    </Cells>
  );
};

export default reduxForm({
  form: 'resource',
  initialValues: {
    state: { catagory: 'success' },
  },
})(NewState);

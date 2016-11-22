import React, { PropTypes } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import weui from '../../components/Weui';

let Remove  = ({ catagories }) => {
  const { Container, CellsTitle, Cells, Toast, ButtonArea, Button, Cell, CellHeader, CellBody, CellFooter } = weui;
  return (
    <div>
      <Cells>
        <Cell>
          <CellBody>
            <Field component="select" name="_id" className="weui-input" placeholder="类别名称">
              <option>请选择</option>
              <option>e</option>
            </Field>
          </CellBody>
          <CellFooter>
            <Button type="default" size="small" plain >删除</Button>
          </CellFooter>
        </Cell>
      </Cells>
    </div>
  );
};

Remove = reduxForm({
  form: 'remove-res-catagory',
})(Remove);

export default Remove;

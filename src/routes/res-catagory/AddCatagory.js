import React, { PropTypes } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import weui from '../../components/Weui';

let AddCatagory = (props) => {
  const { Container, CellsTitle, Cells, Toast, ButtonArea, Button, Cell, CellHeader, CellBody } = weui;
  return (
    <div>
      <Cells>
        <Cell>
          <CellHeader>
            <label htmlFor="title" className="weui-label">名称</label>
          </CellHeader>
          <CellBody>
            <Field component="input" name="title" className="weui-input" placeholder="类别名称" />
          </CellBody>
        </Cell>
        <Cell>
          <CellHeader>
            <label htmlFor="_id" className="weui-label">ID</label>
          </CellHeader>
          <CellBody>
            <Field component="input" name="_id" className="weui-input" placeholder="ID" />
          </CellBody>
        </Cell>
        <Cell>
          <CellHeader>
            <label htmlFor="url" className="weui-label">图标Url</label>
          </CellHeader>
          <CellBody>
            <Field component="input" name="url" className="weui-input" placeholder="图标Url" />
          </CellBody>
        </Cell>
      </Cells>
      <ButtonArea>
        <Button>确定</Button>
      </ButtonArea>
    </div>
  );
};

AddCatagory = reduxForm({
  form: 'add-res-catagory',
})(AddCatagory);
export default AddCatagory;

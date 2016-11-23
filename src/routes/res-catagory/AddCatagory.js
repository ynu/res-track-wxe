import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import weui from '../../components/Weui';

const form = 'add-res-catagory';
let AddCatagory = ({ add, handleSubmit, reset }) => {
  const { Cells, ButtonArea, Button, Cell, CellHeader, CellBody } = weui;
  const submit = async values => {
    await add(values);
    reset(form);
  };
  return (
    <div>
      <Cells>
        <Cell>
          <CellHeader>
            <label htmlFor="title" className="weui-label">名称</label>
          </CellHeader>
          <CellBody>
            <Field component="input" name="title" className="weui-input" placeholder="类别名称，如网站" />
          </CellBody>
        </Cell>
        <Cell>
          <CellHeader>
            <label htmlFor="_id" className="weui-label">ID</label>
          </CellHeader>
          <CellBody>
            <Field component="input" name="_id" className="weui-input" placeholder="唯一ID，如website" />
          </CellBody>
        </Cell>
        <Cell>
          <CellHeader>
            <label htmlFor="imageUrl" className="weui-label">图标Url</label>
          </CellHeader>
          <CellBody>
            <Field component="input" name="imageUrl" className="weui-input" placeholder="图标Url，可以是URL或base64字符串" />
          </CellBody>
        </Cell>
      </Cells>
      <ButtonArea>
        <Button onClick={handleSubmit(submit)}>确定</Button>
      </ButtonArea>
    </div>
  );
};

const mapStateToProps = () => ({});
AddCatagory = connect(mapStateToProps, { reset })(AddCatagory);
AddCatagory = reduxForm({
  form,
})(AddCatagory);
export default AddCatagory;

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import weui from '../../components/Weui';
import * as actions from '../../actions/weui';

const Remove  = ({ catagories, remove, confirm, showConfirm, hideConfirm }) => {
  const { Cells, Button, Cell, CellHeader, CellBody, CellFooter, Confirm } = weui;

  return (
    <div>
      <Cells>
        {
          catagories.map(({ _id, title, imageUrl }) => {
            const confirmProps = {
              title: '注意',
              content: `删除资源类别将会使已使用此类别的资源无法显示。确定要删除【${title}】吗？`,
              buttons: [{
                label: '删除',
                type: 'primary',
                onClick: () => {
                  hideConfirm();
                  remove(_id);
                },
              }, {
                label: '取消',
                type: 'default',
                onClick: hideConfirm,
              }],
            };
            return (
              <Cell key={_id}>
                <CellHeader>
                  <img src={imageUrl} alt="" style={{ width: '20px', marginRight: '5px', display: 'block' }} />
                </CellHeader>
                <CellBody>{title}({_id})</CellBody>
                <CellFooter>
                  <Button type="default" size="small" plain onClick={showConfirm.bind(this, confirmProps)}>删除</Button>
                </CellFooter>
              </Cell>
            );
          })
        }
      </Cells>
      <Confirm {...confirm} >{confirm.content}</Confirm>
    </div>
  );
};

const mapStateToProps = state => ({
  confirm: state.confirm,
});
export default connect(mapStateToProps, { ...actions })(Remove);

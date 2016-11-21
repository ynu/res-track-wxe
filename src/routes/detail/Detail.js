import React, { PropTypes } from 'react';
import TimeAgo from 'timeago-react';
import weui from '../../components/Weui';
import PageHeader from './PageHeader';
import StatePanel from './StatePanel';
import EnsureSingup from '../common/EnsureSignupWxe';

const Detail = ({ resource: { _id, name, states, currentState } }) => {
  const { Container, ButtonArea, Button, CellsTitle } = weui;
  return (
    <Container>
    <EnsureSingup />
    <div className="weui-flex">
          <div className="weui-flex__item">
            <Button style={{ margin: '5px' }} type="default" size="small" plain href="/add" >
              &lt; &lt; 资源列表
            </Button>
          </div>
          <div className="weui-flex__item" style={{ textAlign: 'right' }}>
            <Button style={{ margin: '5px' }} type="default" size="small" plain href="/add" >
              新增资源 &gt;&gt;
            </Button>
          </div>
      </div>
      <PageHeader name={name} {...currentState} />
      <div className="page__bd">
        <ButtonArea>
          <Button href={`/add-state/${_id}`} plain type="default">更新状态</Button>
        </ButtonArea>
        <CellsTitle>历史状态</CellsTitle>
        {
          states.map((state, i) => <StatePanel {...state} key={i} />)
        }
      </div>
    </Container>
  );
};
Detail.propTypes = {
  resource: PropTypes.object.isRequired,
};
export default Detail;

import React, { PropTypes } from 'react';
import TimeAgo from 'timeago-react';
import weui from '../../components/Weui';
import PageHeader from './PageHeader';
import StatePanel from './StatePanel';

const Detail = ({ resource: { _id, name, states, currentState } }) => {
  const { Container, ButtonArea, Button, CellsTitle } = weui;
  return (
    <Container>
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

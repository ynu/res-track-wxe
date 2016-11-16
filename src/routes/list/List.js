import React, { PropTypes } from 'react';
import weui from '../../components/Weui';

const List = (props) => {
  const { Container, SearchBar, CellsTitle, Cells, Cell, CellHeader, CellBody, Label } = weui;
  return (
    <Container>
      <SearchBar />
      <CellsTitle>筛选</CellsTitle>
      <Cells>
        <div className="weui-cell weui-cell_select weui-cell_select-after">
          <CellHeader>
            <Label>类别</Label>
          </CellHeader>
          <CellBody>
            <select className="weui-select">
              <option value="" >全部</option>
              <option value="website">网站</option>
              <option value="ip">IP地址</option>
              <option value="ecard">一卡通</option>
            </select>
          </CellBody>
        </div>
        <div className="weui-cell weui-cell_select weui-cell_select-after">
          <CellHeader>
            <Label>状态</Label>
          </CellHeader>
          <CellBody>
            <select className="weui-select">
              <option value="" >全部</option>
              <option value="success">正常</option>
              <option value="warning">告警</option>
              <option value="error">错误</option>
            </select>
          </CellBody>
        </div>
        <Cell>
          <CellHeader>
            <label htmlFor="name" className="weui-label">日期前</label>
          </CellHeader>
          <CellBody>
            <input className="weui-input" type="date" placeholder="指定日期之前..." />
          </CellBody>
        </Cell>
      </Cells>
      <Cells>
        <CellsTitle>共xxx个资源</CellsTitle>
        <a className="weui-cell weui-cell_access" href="javascript:;" style={{ backgroundColor: '#dff0d8' }} >
          <div className="weui-cell__hd">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=" alt="" style={{ width: '20px', marginRight: '5px', display: 'block' }} />
          </div>
          <div className="weui-cell__bd weui-cell_primary">
            <p>文字标题</p>
          </div>
          <span className="weui-cell__ft"></span>
        </a>
        <a className="weui-cell weui-cell_access" href="javascript:;" style={{ backgroundColor: '#dff0d8' }} >
          <div className="weui-cell__hd">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=" alt="" style={{ width: '20px', marginRight: '5px', display: 'block' }} />
          </div>
          <div className="weui-cell__bd weui-cell_primary">
            <p>文字标题</p>
          </div>
          <span className="weui-cell__ft"></span>
        </a>
        <a className="weui-cell weui-cell_access" href="javascript:;" style={{ backgroundColor: '#f2dede' }} >
          <div className="weui-cell__hd">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=" alt="" style={{ width: '20px', marginRight: '5px', display: 'block' }} />
          </div>
          <div className="weui-cell__bd weui-cell_primary">
            <p>文字标题</p>
          </div>
          <span className="weui-cell__ft"></span>
        </a>
        <a className="weui-cell weui-cell_access" href="javascript:;" style={{ backgroundColor: '#faebcc' }}>
          <div className="weui-cell__hd">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=" alt="" style={{ width: '20px', marginRight: '5px', display: 'block' }} />
          </div>
          <div className="weui-cell__bd weui-cell_primary">
            <p>文字标题</p>
          </div>
          <span className="weui-cell__ft"></span>
        </a>
        <div className="weui-loadmore weui-loadmore_line">
          <span className="weui-loadmore__tips">暂无数据</span>
        </div>
      </Cells>
    </Container>
  );
};

export default List;

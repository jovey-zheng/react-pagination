import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import map from 'lodash/collection/map';
import range from 'lodash/utility/range';
import classNames from 'classnames';

import * as paginationActions from 'actions/paginationActions';

@connect(
  state => ({
    pagination: state.pagination,
  })
  ,{...paginationActions,}
)
export default class Pagination extends Component {

  static propTypes = {
    total: PropTypes.number,
    size: PropTypes.number,
    callback: PropTypes.func,
  }

  componentWillReceiveProps(nextProps) {
    const {pagination, callback} = this.props;
    if (nextProps.pagination.page !== pagination.page ) {
      callback(nextProps.pagination);
    }
  }

  renderPagination(current, totalPage) {
    current = current + 1;
    let pageArr = [];
    let pageCont = [];
    if (totalPage <= 7) {
      for (let p = 1; p <= totalPage; p++) {
        pageArr.push({
          page: p,
          currentPage : (p === current),
        });
      };
    } else {
      if (current < 4) {
        for (let p = 1; p <= 6; p++) {
          pageArr.push({
            page: p,
            currentPage : (p === current),
          });
        };
        pageArr.push({
          page: '...',
          dot : true,
          currentPage : false,
        });
      } else {
        if ((current - 3) <= 1) {
          pageArr.push({
            page : '...',
            dot : true,
            currentPage : false,
          });
          for (let p = 2; p <= current; p++) {
            pageArr.push({
              page: p,
              currentPage : (p === current),
            });
          };
        } else {
          pageArr.push({
            page : '...',
            dot : true,
            currentPage : false,
          });
          if ((totalPage - current) >= 3) {
            for (let i = (current - 2); i <= current; i++) {
              pageArr.push({
                page: i,
                currentPage : (i === current),
              });
            };
          } else {
            for (let j=(current-(5-(totalPage-current))); j <= current;j++) {
              pageArr.push({
                page: j,
                currentPage : (j === current),
              });
            }
          }
        }
        if ((current + 3) >= totalPage) {
          for (let m = (current + 1); m <= totalPage; m++) {
            pageArr.push({
              page : m,
              currentPage : false,
            });
          };
        } else {
          for (let n = (current + 1); n <= (current+2); n++) {
            pageArr.push({
              page : n,
              currentPage : false,
            });
          };
          pageArr.push({
            page : '...',
            dot : true,
            currentPage : false,
          });
        }
      }
    }

    pageCont = map(pageArr, (i) => {
      return (
        <span
          data-current={i.currentPage}
          className={classNames("button_div", i.currentPage ? "button_div_active" : "", i.dot ? "pagination_dot" : "")}
          onClick={
            () => {
              i.dot ? undefined : this.handlePage(i.page-1);
            }
          }
        >{i.page}</span>
      );
    });
    return pageCont;
  }

  handlePage(i) {
    const {pageIndex, pagination} = this.props;
    if (pagination.page !== i){
      pageIndex(i);
    }
  }

  render() {
    const {total, size, pagination} = this.props;
    const totalPage = Math.ceil(total/size);
    const list = range(1, totalPage+1);
    return (
      <div className="pagination_main">
        <span
          className={classNames("button_div", pagination.page === 0 ? "button_default" : "")}
          onClick={() => {
            this.handlePage(0);
          }}
        >
          <i className="fa fa-angle-double-left"></i>
        </span>
        {this.renderPagination(pagination.page, totalPage)}
        <span
          className={classNames("button_div", pagination.page === totalPage-1 ? "button_default" : "")}
          onClick={() => {
            this.handlePage(totalPage-1);
          }}
        >
          <i className="fa fa-angle-double-right"></i>
        </span>
      </div>
    )
  }
}

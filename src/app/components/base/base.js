import React, {Component} from 'react';

import Pagination from 'components/common/Pagination';

export default class Base extends Component {

  constructor(props) {
    super(props);
    this.state = {
      val: 1,
    }
  }

  handlePage(data) {
    this.setState({
      val: 1 + data.page,
    })
  }

  render() {
    const {val} = this.state;
    return (
      <div className="base">
        <div>Example as follows:</div>
        <Pagination total={100} size={10} callback={::this.handlePage} />
        <div>This is callback value ,it will show you a page change: {val}</div>
      </div>
    )
  }
}

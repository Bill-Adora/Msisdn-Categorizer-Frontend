import React from 'react';
import './App.css';
import {v4 as uuidv4} from 'uuid';
import ListItem from './ListItem';

class App extends React.Component {
  state = {
    country: '',
    msisdnState: '',
    pageSize: 10,
    numberOfPages: 0,
    page: 1,
    hasNextPage: false,
    hasPreviousPage: false,
    totalNumberOfElements: 0,
    isPaginationDropDownOpen: false,
    isMsisdnStateDropdownOpen: false,
    isCountryDropDownOpen: false,
    data: [],
    error: ''
  }

  componentDidMount = () => {
    this.getCategorizedPhoneNumbers();
  }

  getCategorizedPhoneNumbers = () => {
    let that = this;
    const { country, msisdnState, pageSize, page } = this.state;

    const url = new URL('http://127.0.0.1:8080/api/v1/getPhoneNumbers');
    const params = {country: country, state: msisdnState, page: page, pageSize: pageSize};
    url.search = new URLSearchParams(params).toString();

    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ZGV2ZWxvcGVyOiRKdW1pYUludGVydmlldzM=',
        'X-Correlation-ConversationID': uuidv4()
      }
    }).then(function(response){
      return response.json();
    }).then(function(responseData){
      if(responseData.header.responseCode === 401){
        that.setState({
          error: 'Authentication failed.'
        });
      } else if(responseData.header.responseCode === 200){
        that.setState({
            numberOfPages: responseData.body.numberOfPages,
            page: responseData.body.page,
            hasNextPage: responseData.body.hasNextPage,
            hasPreviousPage: responseData.body.hasPreviousPage,
            totalNumberOfElements: responseData.body.totalNumberOfElements,
            data: responseData.body.data
        });
      }
    }).catch(responseData => that.setState({ error: 'Application Error.'}));
  }

  displayPages = () => {
    const {page, hasNextPage, hasPreviousPage, numberOfPages} = this.state;
    const pageLinkArray = [];
    let j = 0;

    pageLinkArray.push(
      <li key={j++} className="page-item">
        {hasPreviousPage ? <a className="page-link"  href="#" onClick={() => this.handleOnPageClick(page - 1)}>Previous</a> : <span className="page-link">Previous</span>}
      </li>)

    if(!hasNextPage && numberOfPages >= 3) {
      pageLinkArray.push(<li key={j++} className="page-item"><a className="page-link" href="#" onClick={() => this.handleOnPageClick(page - 2)}>{page - 2}</a></li>);
    }

    if(hasPreviousPage) {
      pageLinkArray.push(<li key={j++} className="page-item"><a className="page-link" href="#" onClick={() => this.handleOnPageClick(page - 1)}>{page - 1}</a></li>);
    }
    
    pageLinkArray.push(<li key={j++} className="page-item active" aria-current="page"><a className="page-link" href="#" onClick={() => this.handleOnPageClick(page)}>{page}</a></li>);

    if(hasNextPage) {
      pageLinkArray.push(<li key={j++} className="page-item"><a className="page-link" href="#" onClick={() => this.handleOnPageClick(page + 1)}>{page + 1}</a></li>);
    }

    if(!hasPreviousPage && numberOfPages >= 3) {
      pageLinkArray.push(<li key={j++} className="page-item"><a className="page-link" href="#" onClick={() => this.handleOnPageClick(page + 2)}>{page + 2}</a></li>);
    }

    pageLinkArray.push(
      <li key={j++} className="page-item">
        {hasNextPage ? <a className="page-link" href="#" onClick={() => this.handleOnPageClick(page + 1)}>Next</a> : <span className="page-link">Next</span>}
      </li>)

    return pageLinkArray;
  }

  handleOnPageClick = async pageNumber => {
    await this.setState({ page: pageNumber });
    this.getCategorizedPhoneNumbers();
  }

  handleOnPaginationDropDownClick = async pageSize => {
    await this.setState({
      page: 1,
      pageSize: pageSize
    });
    this.getCategorizedPhoneNumbers();
  }

  handleOnMsisdnStateDropdownClick = async msisdnState => {
    await this.setState({
      page: 1,
      msisdnState: msisdnState
    });
    this.getCategorizedPhoneNumbers();
  }

  handleOnCountryDropdownClick = async country => {
    await this.setState({
      page: 1,
      country: country
    });
    this.getCategorizedPhoneNumbers();
  }

  handleRefreshPage = (event) => {
    event.preventDefault();
    window.location.reload();
}

  togglePaginationDropDownOpen = () => this.setState({ isPaginationDropDownOpen: !this.state.isPaginationDropDownOpen });
  toggleMsisdnDropDownOpen = () => this.setState({ isMsisdnStateDropdownOpen: !this.state.isMsisdnStateDropdownOpen });
  toggleCountryDropDownOpen = () => this.setState({ isCountryDropDownOpen: !this.state.isCountryDropDownOpen });

  displayNavBar = () => {
    return (
      <nav className="navbar navbar-expand-lg sticky-top navbar-light bg-light">
        <a className="navbar-brand mb-2 ml-lg-5 pl-lg-5" href="#" onClick={this.handleRefreshPage}>Jumia Phone Validator</a>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div onClick={this.togglePaginationDropDownOpen} className='dropdown-className'>
            <a className="nav-link dropdown-toggle" href="#" id="paginationDropdown" role="button" data-toggle="dropdown" aria-haspopup="true">
              {this.state.pageSize}
            </a> <p className='mt-2'> rows</p>
            <div className={`dropdown-menu${this.state.isPaginationDropDownOpen ? " show" : ""}`} aria-labelledby="paginationDropdown">
              <a className="dropdown-item" href="#" onClick={() => this.handleOnPaginationDropDownClick(10)}>10</a>
              <a className="dropdown-item" href="#" onClick={() => this.handleOnPaginationDropDownClick(20)}>20</a>
              <a className="dropdown-item" href="#" onClick={() => this.handleOnPaginationDropDownClick(30)}>30</a>
              <a className="dropdown-item" href="#" onClick={() => this.handleOnPaginationDropDownClick(40)}>40</a>
              <a className="dropdown-item" href="#" onClick={() => this.handleOnPaginationDropDownClick(50)}>50</a>
            </div>
          </div>
          <div onClick={this.toggleMsisdnDropDownOpen} className='dropdown-className'>
            <a className="nav-link dropdown-toggle" href="#" id="msisdnStateDropdown" role="button" data-toggle="dropdown" aria-haspopup="true">
              {this.state.msisdnState ? this.state.msisdnState : 'State'}
            </a>
            <div className={`dropdown-menu${this.state.isMsisdnStateDropdownOpen ? " show" : ""}`} aria-labelledby="msisdnStateDropdown">
              <a className="dropdown-item" href="#" onClick={() => this.handleOnMsisdnStateDropdownClick('Valid')}>Valid</a>
              <a className="dropdown-item" href="#" onClick={() => this.handleOnMsisdnStateDropdownClick('Invalid')}>Invalid</a>
              <a className="dropdown-item" href="#" onClick={() => this.handleOnMsisdnStateDropdownClick('')}>All</a>
            </div>
          </div>
          <div onClick={this.toggleCountryDropDownOpen} className='dropdown-className'>
            <a className="nav-link dropdown-toggle" href="#" id="countryDropdown" role="button" data-toggle="dropdown" aria-haspopup="true">
              {this.state.country ? this.state.country : 'Country'}
            </a>
            <div className={`dropdown-menu${this.state.isCountryDropDownOpen ? " show" : ""}`} aria-labelledby="countryDropdown">
              <a className="dropdown-item" href="#" onClick={() => this.handleOnCountryDropdownClick('Cameroon')}>Cameroon</a>
              <a className="dropdown-item" href="#" onClick={() => this.handleOnCountryDropdownClick('Ethiopia')}>Ethiopia</a>
              <a className="dropdown-item" href="#" onClick={() => this.handleOnCountryDropdownClick('Morocco')}>Morocco</a>
              <a className="dropdown-item" href="#" onClick={() => this.handleOnCountryDropdownClick('Mozambique')}>Mozambique</a>
              <a className="dropdown-item" href="#" onClick={() => this.handleOnCountryDropdownClick('Uganda')}>Uganda</a>
              <a className="dropdown-item" href="#" onClick={() => this.handleOnCountryDropdownClick('')}>All</a>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  render() {
    const {page, pageSize, data} = this.state;

    let headerText = {
      country: 'Country',
      state: 'State',
      countryCode: 'Country Code',
      phoneNumber: 'Phone Number'
    }

    let listNumberCounter = pageSize * (page - 1);
    let i = 0,
        items = data.map(item => {
          return <ListItem key={i++} listNumber={++listNumberCounter} list_item_content={item}/>
        });

    return (
      <div className='container'>
        {this.displayNavBar()}
        <div className='mb-2 headerText'><ListItem list_item_content={headerText} /></div>
        {items}
        <nav className='pagination-container mt-5' aria-label="Page navigation">
            <ul className="pagination">
                {this.displayPages()}
            </ul>
        </nav>
      </div>
    );
  }
}

export default App;

import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleSearchClick() {
    this.props.handleSearch(this.state.inputText);
    this.setState({inputText: ''});
  }

  handleInputChange(event) {
    this.setState({inputText: event.target.value});
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.handleSearchClick();
    }
  }

  render() {
    return (<div>
              <input 
                className="search-field"
                value={this.state.inputText}
                placeholder="Search username"
                onChange={this.handleInputChange}
                onKeyPress={this.handleKeyPress}
              >
              </input>
              <input 
                type="button" 
                value="submit"
                className="submit-button"
                onClick={this.handleSearchClick} 
              />
            </div>);
  }
}

module.exports = Search;
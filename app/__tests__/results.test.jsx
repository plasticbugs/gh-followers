import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

var mockuserinfo = require('../__mockData__/userinfo.js').user
var mockfollowerInfo = require ('../__mockData__/followers.js').followerInfo

const Results = require('../components/Results');

configure({ adapter: new Adapter() });

describe('Results Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Results />, div);
  });
  it('renders the username to the page on successful search', () => {
    const component = mount(<Results
        user={mockuserinfo}
        followers={mockfollowerInfo}
        moreFollowers={true}
        loading={false}
      />);
    
    expect(component.find('.username')).toHaveLength(1);
    expect(component.find('.username').text()).toEqual('plasticbugs');
  });
  it('renders an error message to the page if the search is unsuccessful', () => {
    const component = mount(<Results
      user={"invalid"}
      followers={mockfollowerInfo}
      moreFollowers={true}
      loading={false}
    />);
    expect(component.find('.not-found')).toHaveLength(1);
    expect(component.find('.username').text()).toEqual('User not found. Please try another search.');
  });
  it('renders the first batch of followers if the search is successful', () => {
    const component = mount(<Results
      user={mockuserinfo}
      followers={mockfollowerInfo}
      moreFollowers={true}
      loading={false}
    />);
    expect(component.find('.follower')).toHaveLength(30);
  });
});
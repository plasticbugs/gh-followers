import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MockAdapter from 'axios-mock-adapter';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import axios from 'axios';
import moxios from 'moxios';

const App = require('../components/App.jsx');
var mockuserinfo = require('../__mockData__/userinfo.js').user
var mockfollowerInfo = require ('../__mockData__/followers.js').followerInfo

configure({ adapter: new Adapter() });

describe('App', () => {
  beforeEach(function () {
    moxios.install()
  })
  afterEach(function () {
    moxios.uninstall()
  })
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });
  it('sets user to an object and gets and array of followers if a search is successful', done => {
    const component = shallow(<App />);
    let mock = new MockAdapter(axios);
    let data = {
      user: mockuserinfo,
      followers: mockfollowerInfo
    }
    mock.onGet('/api/user').reply(200, data)
    mock.onGet('/api/followers').reply(200, mockfollowerInfo)
    component.instance().handleSearch('holman', (userinfo, followers) => {
      expect(component.state().user.login).toEqual('plasticbugs');
      expect(component.state().followers.length).toEqual(30);
      done();
    });
  });
  it('sets the user state to "invalid" if search is unsuccessful', done => {
    const component = mount(<App />);
    let mock = new MockAdapter(axios);
    let data = {};
    mock.onGet('/api/user').reply(200, data);
    component.instance().handleSearch('bad lookup', (userinfo, followers) => { 
      expect(component.state().user).toEqual("invalid");
      expect(component.state().user.login).toBeUndefined();
      expect(component.state().followers).toBeNull();
      done();
    });
  });
  it('eager loads the next page of followers after a successful search', done => {
    const component = shallow(<App />);
    let mock = new MockAdapter(axios);
    let data = {
      user: mockuserinfo,
      followers: mockfollowerInfo
    }
    mock.onGet('/api/user').reply(200, data)
    mock.onGet('/api/followers').reply(200, mockfollowerInfo)
    component.instance().handleSearch('bad lookup', (userinfo, followers) => {
      expect(component.state().nextPage).toHaveLength(30);
      done();
    })
  });
});
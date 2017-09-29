import React from 'react';
import ReactDOM from 'react-dom';
const App = require('../components/App.jsx');
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import github from '../api/githubHelper.js';
var mockuserinfo = require('../__mockData__/userinfo.js').user
var mockfollowerInfo = require ('../__mockData__/followers.js').followerInfo

const realSetTimeout = setTimeout;
jest.useFakeTimers();

jest.mock('../api/githubHelper.js', ()=>({
  getUserInfo: (name, cb) => {
    if(name === "bad lookup" || name === null  || name === "") {
      cb("invalid", null);
    } else {
      cb(mockuserinfo, [])
    }
  },
  getNextPageOfFollowers: (pageNum, followerURL, cb) => {
    cb(mockfollowerInfo);
  }
}))

configure({ adapter: new Adapter() });

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });
  it('sets user to an object and gets and array of followers if a search is successful', done => {
    const component = shallow(<App />);
    component.instance().handleSearch('holman');
    github.getUserInfo('plasticbugs', (user, followers) => {
      expect(typeof user).toEqual('object');
      expect(Array.isArray(followers)).toBeTruthy();
      done();
    })
  });
  it('sets user to "invalid" if a search string has a username that does not exist', done => {
    github.getUserInfo('bad lookup', (user, followers) => {
      expect(user).toEqual('invalid');
      done();
    })
  });
  it('sets user to "invalid" if a search string is empty', () => {
    github.getUserInfo('', (user, followers) => {
      expect(user).toEqual('invalid');
    })
  });
  it('Gets first an array of followers when getNextPage is called', () => {
    github.getNextPageOfFollowers(2, 'followerurl', (followers) => {
      expect(followers).toHaveLength(30);
    })
  });
  it('loads more followers when load more button is pressed', () => {
    const component = mount(<App />);
    component.instance().handleSearch('holman');
    setTimeout(2000, () => {
      component.find(".submit-button").simulate("click");
      setTimeout(2000, () => {
        expect(component.state().followers.length).toEqual(60);
      })
    })
  })
});
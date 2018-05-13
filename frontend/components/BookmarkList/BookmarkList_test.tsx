import * as React from 'react';
import * as assert from 'assert';
import {shallow} from 'enzyme';
import {BookmarkList} from './BookmarkList';

describe('<BookmarkList>', () => {
  it('accepts bookmarks', () => {
    const wrapper = shallow(<BookmarkList bookmarks={[]} />);
    assert(wrapper.find('ul').length > 0, 'check <ul> exists');
  });
});

import * as React from 'react';
import {shallow} from 'enzyme';
import {BookmarkList} from './BookmarkList';

describe('<BookmarkList>', () => {
  it('accepts empty bookmarks', () => {
    const wrapper = shallow(<BookmarkList bookmarks={[]} />);
    expect(wrapper).toMatchSnapshot();
  });
});

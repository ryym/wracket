import * as React from 'react';
import {shallow} from 'enzyme';
import {BookmarkList} from './BookmarkList';

describe('<BookmarkList>', () => {
  it('accepts bookmarks', () => {
    shallow(<BookmarkList bookmarks={[]} />);
  });
});

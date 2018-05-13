import {withStyles} from '../with-styles';
import {BookmarkList as Comp} from './BookmarkList';

const styles = require('./bookmark-list.scss');
export const BookmarkList = withStyles(styles)(Comp);

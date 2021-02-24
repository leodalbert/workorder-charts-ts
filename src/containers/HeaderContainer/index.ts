import { connect } from 'react-redux';
import Header from './components/Header';
import { selectName, selectLogo } from 'selectors/siteGroup';
import { RootState } from 'reducers';

const mapStateToProps = (state: RootState) => ({
  name: selectName(state),
  logo: selectLogo(state),
});

const mapDispatchToProps = {};

const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header);

export default HeaderContainer;

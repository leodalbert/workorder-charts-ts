import { connect } from 'react-redux';
import Header from './components/Header';
// import { selectName, selectLogo } from 'selectors/siteGroup';
// import { getWorkordersBySite } from 'actions/workorders';
// import { getSiteGroupInfo } from 'actions/siteGroup';

const mapStateToProps = () => ({
  name: 'test',
  logo: 'https://www.onuma.com/transfer/SanMateo.jpg',
});

const mapDispatchToProps = {};

const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header);

export default HeaderContainer;

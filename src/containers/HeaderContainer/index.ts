import { connect } from 'react-redux';
import Header from './components/Header';
import {
  selectName,
  selectLogo,
  makeSortedSelectBuildings,
} from 'selectors/siteGroup';
import { RootState } from 'reducers';
import { getWorkordersBySite } from 'actions/workorder';
import { getSiteGroupInfo } from 'actions/siteGroup';
import { setBuildingFilter } from 'actions/filter';

const mapStateToProps = (state: RootState) => ({
  name: selectName(state),
  logo: selectLogo(state),
  buildings: makeSortedSelectBuildings(state),
});

const mapDispatchToProps = {
  getWorkordersBySite,
  getSiteGroupInfo,
  setBuildingFilter,
};

const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header);

export default HeaderContainer;

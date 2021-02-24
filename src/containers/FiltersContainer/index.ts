import { connect } from 'react-redux';
import Filters from './components/Filters';
import { makeSortedSelectBuildings } from 'selectors/siteGroup';
import { RootState } from 'reducers';
import { getWorkordersBySite } from 'actions/workorder';
import { getSiteGroupInfo } from 'actions/siteGroup';
import { setBuildingFilter } from 'actions/filter';

const mapStateToProps = (state: RootState) => ({
  buildings: makeSortedSelectBuildings(state),
});

const mapDispatchToProps = {
  getWorkordersBySite,
  getSiteGroupInfo,
  setBuildingFilter,
};

const FiltersContainer = connect(mapStateToProps, mapDispatchToProps)(Filters);

export default FiltersContainer;

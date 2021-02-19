import { connect } from 'react-redux';
import { RootState } from 'reducers';
import Dashboard from './components/Dashboard';

const mapStateToProps = (state: RootState) => ({
  loading: state.workorders.loading,
});

const mapDispatchToProps = {};

const DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

export default DashboardContainer;

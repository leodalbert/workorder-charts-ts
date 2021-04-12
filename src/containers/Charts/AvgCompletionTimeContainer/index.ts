import { connect } from 'react-redux';
import AvgCompletionTime from './components/AvgCompletionTime';
import { makeAverageTimeByTrade } from 'selectors/workorders';
import { RootState } from 'reducers';
import { buildingFilter } from 'selectors/filter';

const mapStateToProps = (state: RootState) => ({
  assignedDepartmentData: makeAverageTimeByTrade(state),
});

const mapDispatchToProps = {};

const AvgCompletionTimeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AvgCompletionTime);

export default AvgCompletionTimeContainer;

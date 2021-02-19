import { connect } from 'react-redux';
import WeeklyLine from './components/WeeklyLine';
import { makeWorkordersWeeklyData } from 'selectors/workorders';
import { RootState } from 'reducers';

const mapStateToProps = (state: RootState) => ({
  weeklyData: makeWorkordersWeeklyData(state),
});

const mapDispatchToProps = {};

const WeeklyLineContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(WeeklyLine);

export default WeeklyLineContainer;

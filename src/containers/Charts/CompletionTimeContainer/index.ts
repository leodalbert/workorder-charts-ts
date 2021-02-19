import { connect } from 'react-redux';
import CompletionTime from './components/CompletionTime';
import {
  makeWorkorderCompletionTimeData1,
  makeWorkorderCompletionTimeData2,
  makeSelectAllRequestTypes,
} from 'selectors/workorders';
import { selectDoughnut1Filter, selectDoughnut2Filter } from 'selectors/filter';
import { setDoughnutFilter } from 'actions/filter';
import { RootState } from 'reducers';

const mapStateToProps = (state: RootState) => ({
  outerData: makeWorkorderCompletionTimeData1(state),
  innerData: makeWorkorderCompletionTimeData2(state),
  requestTypes: makeSelectAllRequestTypes(state),
  outerFilter: selectDoughnut1Filter(state),
  innerFilter: selectDoughnut2Filter(state),
});

const mapDispatchToProps = { setDoughnutFilter };

const CompletionTimeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CompletionTime);

export default CompletionTimeContainer;

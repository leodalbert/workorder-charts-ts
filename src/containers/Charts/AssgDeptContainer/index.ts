import { connect } from 'react-redux';
import AssgDept from './components/AssgDept';
import { makeAssignedDepartmentData } from 'selectors/workorders';
import { RootState } from 'reducers';

const mapStateToProps = (state: RootState) => ({
  assignedDepartmentData: makeAssignedDepartmentData(state),
});

const mapDispatchToProps = {};

const AssgDeptContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AssgDept);

export default AssgDeptContainer;

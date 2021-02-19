import { connect } from 'react-redux';
import TradeType from './components/TradeType';
import { makeTradeTypeData } from 'selectors/workorders';
import { RootState } from 'reducers';

const mapStateToProps = (state: RootState) => ({
  tradeTypeData: makeTradeTypeData(state),
});

const mapDispatchToProps = {};

const TradeTypeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TradeType);

export default TradeTypeContainer;

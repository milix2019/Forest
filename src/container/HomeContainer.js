import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import Home from '../component/Home';
import { fetch_getpopular_data } from '../action/index';
import { selectors_home } from '../selector/index';

const mapStateToProps = (state) => {
  const { getpopular } = selectors_home(state);
  return { getpopular };
};
const actions = {
  fetch_getpopular_data: fetch_getpopular_data,
};

// Get actions and pass them as props
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));

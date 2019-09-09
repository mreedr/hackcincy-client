import { connect } from 'react-redux'
import { createEvent } from '../modules/createEvent'

import CreateEvent from '../components/CreateEvent'

const mapDispatchToProps = {
  createEvent
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent)

import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'events',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Events = require('./containers/EventsContainer').default
      const reducer = require('./modules/events').default

      /*  Add the reducer to the store on key 'login'  */
      injectReducer(store, { key: 'events', reducer })

      /*  Return getComponent   */
      cb(null, Events)

    /* Webpack named bundle   */
  }, 'events')
  }
})

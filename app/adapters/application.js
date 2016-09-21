import DS from 'ember-data';
import config from 'listening-crowd/config/environment';

export default DS.JSONAPIAdapter.extend({
  namespace: 'v1',
  host: config.pinnaHost
});

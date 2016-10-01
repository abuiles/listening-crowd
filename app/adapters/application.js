import DS from 'ember-data';
import config from 'listening-crowd/config/environment';
import HasManyQuery from 'ember-data-has-many-query';

export default DS.JSONAPIAdapter.extend(HasManyQuery.RESTAdapterMixin, {
  namespace: 'v1',
  host: config.pinnaHost
});

import ApplicationAdapter from './application';
import Ember from 'ember';

export default ApplicationAdapter.extend({
  session: Ember.inject.service('session'),
  headers: Ember.computed('session.data.authenticated.jwt', function() {
    // TODO: Make sure this is the best way to handle this scenario
    return {
      'Authorization': `Bearer ${this.get('session.data.authenticated.jwt')}`
    };
  })
});

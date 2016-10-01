import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  licSession: Ember.inject.service(),
  model() {
    return this.get('licSession.user');
  }
});

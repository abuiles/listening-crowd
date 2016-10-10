import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  session: Ember.inject.service(),
  beforeModel() {
    let lockOptions = {authParams:{scope: 'openid'}};
    return this.get('session').authenticate('simple-auth-authenticator:lock', lockOptions);
  }
});

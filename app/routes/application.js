import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import googlePageview from 'listening-crowd/mixins/google-pageview';

export default Ember.Route.extend(ApplicationRouteMixin, googlePageview, {
  licSession: Ember.inject.service(),
  actions: {
    login () {
      var lockOptions = {authParams:{scope: 'openid'}};
      this.get('session').authenticate('simple-auth-authenticator:lock', lockOptions).then(() => {
        this.get('licSession.user');
      });
    },

    logout () {
      this.get('session').invalidate();
    }
  },
  beforeModel() {
    if (this.get('session.isAuthenticated')) {
      this.get('licSession.user');
    }
  }
});

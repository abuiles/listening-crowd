import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: 'at',
  at: -1,
  session: Ember.inject.service(),
  requireUser() {
    if (!this.get('session.isAuthenticated')) {
      var lockOptions = {authParams:{scope: 'openid'}};
      this.get('session').authenticate('simple-auth-authenticator:lock', lockOptions).then(() => {
        let episode = this.get('model');
        let podcast = episode.get('podcast');
        this.transitionToRoute("podcasts.show.episode", podcast, episode);
      });
    }
  }
});

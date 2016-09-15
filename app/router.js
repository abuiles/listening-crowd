import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('podcasts', function() {
    this.route('show', {
      path: ':podcastPermalink'
    }, function() {
      this.route('episode', {
        path: ':episodePermalink'
      });
    });
  });
  this.route('profile');
  this.route('login');
  this.route('protected');
});

export default Router;

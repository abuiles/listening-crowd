import Ember from 'ember';
import config from './config/environment';
import TrackPage from 'listening-crowd/mixins/track-page';

const Router = Ember.Router.extend(TrackPage, {
  location: config.locationType
});

Router.map(function() {
  this.route('podcasts', function() {
    this.route('show', {
      path: ':podcastPermalink'
    }, function() {
      this.route('episode', {
        path: ':episodePermalink'
      }, function() {
        this.route('annotate', {
          path: 'annotate/:slug'
        });
        this.route('annotation', {
          path: ':slug'
        });
      });
    });
  });
  this.route('profile');
  this.route('login');
  this.route('directory');
  this.route('about');
  this.route('listener', {
    path: 'listener/:slug'
  });
  this.route('annotation-card', {
    path: 'annotation-card/:annotationId'
  });
  this.route('shared-annotation', {
    path: 'a/:slug'
  });
});

export default Router;

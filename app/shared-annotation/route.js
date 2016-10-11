import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.query('annotation', {
      filter: {
        slug: params.slug
      },
      include: 'episode,episode.podcast'
    }).then((result) => {
      let annotation = result.get('firstObject');
      let episode = annotation.get('episode');
      let podcast = episode.get('podcast');
      return this.transitionTo('podcasts.show.episode.annotation', podcast, episode, annotation);
    });
  },
  serialize(model) {
    return { slug: model.get('slug') };
  }
});

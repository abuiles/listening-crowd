import Ember from 'ember';
import TextRenderer from 'ember-mobiledoc-text-renderer';

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord('annotation', params.annotationId, {
      include: 'episode,episode.podcast'
    });
  },
  headData: Ember.inject.service(),
  afterModel(model) {
    var renderer = new TextRenderer({cards: []});
    var rendered = renderer.render(model.get('deltas'));

    let meta = {
      card: 'summary_large_image',
      title: model.get('episode.title'),
      description: rendered.result,
      site: '@listeningcrowd',
      creator: '@listeningcrowd',
      image: model.get('episode.podcast.itunesImage')
    };

    for (var m in meta) {
      this.get('headData').set(m, meta[m]);
      // this.set('sharable.current.' + m, meta[m]);
    }
  }
});

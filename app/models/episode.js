import DS from 'ember-data';
import Ember from 'ember';
import HasManyQuery from 'ember-data-has-many-query';

export default DS.Model.extend(HasManyQuery.ModelMixin, {
  slug: DS.attr('string'),
  title: DS.attr('string'),
  pubDate: DS.attr('string'),
  description: DS.attr('string'),
  summary: DS.attr('string'),
  itunesSubtitle: DS.attr('string'),
  itunesKeywords: DS.attr('string'),
  enclosure: DS.attr(),
  itunesDuration: DS.attr(),
  itunesExplicit: DS.attr('string'),
  guid: DS.attr(),
  podcast: DS.belongsTo('podcast'),
  annotations: DS.hasMany('annotations'),
  annotationsCount: DS.attr('number'),
  permalink: Ember.computed('id', 'slug', {
    get() {
      return `${this.get('id')}-${this.get('slug')}`;
    }
  }).readOnly(),
  podzyUrl: Ember.computed('enclosure.url', {
    get() {
      let url = this.get('enclosure.url');
      return `https://podzy.herokuapp.com/${url}`;
    }
  }).readOnly(),
  waveformDataUrl: Ember.computed('slug', 'podcast.slug', {
    get() {
      let podcastSlug = this.get('podcast.slug');
      let slug = this.get('slug');
      return `https://cdn.listeningcrowd.com/waveforms/${podcastSlug}/${slug}/waveform`;
    }
  }).readOnly(),
  prettyDuration: Ember.computed('itunesDuration.content', {
    get() {
      let duration = this.get('itunesDuration.content');
      if (typeof duration === 'string') {
        if (duration.indexOf(':') < 0) {
          duration = window.juration.stringify(duration, {
            format: 'chrono'
          });
        }
      }

      return duration;
    }
  }).readOnly()
});

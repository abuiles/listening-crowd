import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  kind: DS.attr('string'),
  url: DS.attr('string'),
  timestamp: DS.attr('number'),
  timestampPretty: Ember.computed('timestamp', {
    get() {
      return window.juration.stringify(
        this.get('timestamp'),
        {
          format: 'chrono'
        }
      );
    }
  }).readOnly(),
  summary : DS.attr('string'),
  episode: DS.belongsTo('episode'),
  wikiLink: Ember.computed('url', {
    get() {
      let url = this.get('url');
      return url && /wikipedia\.org/.test(url);
    }
  }).readOnly(),
  youtubeVideo: Ember.computed('url', {
    get() {
      let url = this.get('url');
      let id;

      if (/youtu\.be/.test(url)) {
        id = url.split('/').slice(-1)[0];
      } else if (/youtube/.test(url) && !/embed/.test(url)) {
        url.split('?')[1].split('&').find((param) => {
          let parts = param.split('=');
          let result;

          if (parts[0] === 'v') {
            id = parts[1];
          }

          return result;
        });
      }

      return id;
    }
  }).readOnly()
});

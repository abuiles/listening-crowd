import Ember from 'ember';

export default Ember.Component.extend({
  src: Ember.computed('payload.href', {
    get() {
      return this.fixUrl(this.get('payload.href'));
    }
  }).readOnly(),
  fixUrl(url)  {
    let fixed = url;
    let id;

    if (/youtu\.be/.test(url)) {
      id = url.split('/').slice(-1)[0];
      fixed = `https://www.youtube.com/embed/${id}`;
    } else if (/youtube/.test(url) && !/embed/.test(url)) {
      url.split('?')[1].split('&').find((param) => {
        let parts = param.split('=');
        let result;

        if (parts[0] === 'v') {
          id = parts[1];
        }

        return result;
      });

      if (id) {
        fixed = `https://www.youtube.com/embed/${id}`;
      }
    } else if (/vimeo/.test(url) && !/player/.test(url)) {
      id = url.split('/').slice(-1)[0];
      fixed = `https://player.vimeo.com/video/${id}`;
    }

    return fixed;
  }
});

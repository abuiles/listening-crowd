import Collection from 'ember-cli-mirage/orm/collection';

export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.2.x/shorthands/
   */

  this.logging = true;

  this.passthrough(
    'https://podzy.herokuapp.com/**',
    'http://ia902606.us.archive.org/**',
    '/waveforms.json',
    'https://llc-dev.auth0.com/**'
  );

  $.getJSON('/waveforms.json').then((data) => {
    data.forEach((waveform) => {
      this.db.waveforms.update(waveform.id, waveform);
    });
  });

  this.loadFixtures();

  this.db.episodes.forEach((episode) => {
    let item = window.localStorage.getItem(episode.id);
    let annotations;

    if (item) {
      annotations = JSON.parse(item);
    } else {
      annotations = [];
    }

    annotations.forEach((ref) => {
      this.create('reference', ref);
    });
  });

  this.get('/podcasts');
  this.get('/podcasts/:id');
  this.get('/episodes/:id');
  this.get('/episodes', function(schema) {
    let collection = new Collection('episode');

    collection.models = schema.episodes.all().models.sort(function(a, b) {
      return new Date(a.pubDate) < new Date(b.pubDate);
    });

    return collection;
  });

  this.get('/waveforms');
  this.get('/waveforms/:id');

  this.get('/annotations');
  this.get('/annotations/:id');
  this.post('/annotations');
  this.patch('/annotations/:id');
}

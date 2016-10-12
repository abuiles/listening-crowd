import Ember from 'ember';

export default Ember.Route.extend({
  currentPlayer: Ember.inject.service(),
  fastboot: Ember.inject.service(),
  headData: Ember.inject.service(),
  model(params) {
    return this.store.query('annotation', {
      filter: {
        slug: params.slug
      },
      include: 'episode,episode.podcast'
    }).then(function(result) {
      return result.get('firstObject');
    });
  },
  afterModel(model) {
    if (!model) {
      return this.transitionToRoute('index');
    }

    let episode = model.get('episode');
    let meta = {
      card: 'summary_large_image',
      title: episode.get('title'),
      description: episode.get('itunesSubtitle'),
      site: '@listeningcrowd',
      creator: '@listeningcrowd',
      image: episode.get('podcast.itunesImage')
    };

    for (var m in meta) {
      this.get('headData').set(m, meta[m]);
    }
  },
  setupController(controller, model) {
    this._super(...arguments);
    this.addSegment(model);

    if (!this.get('fastboot.isFastBoot')) {
      Ember.run.scheduleOnce('afterRender', this, this.addSegment, model);
    }
  },
  addSegment(model) {
    if (this.get('currentPlayer.player') &&  this.get('currentPlayer.player').waveform.segments) {
      let payload = {
        startTime: model.get('start'),
        endTime: model.get('end'),
        editable: false,
        id: model.get('id'),
        labelText: ''
      };
      let service = this.get('currentPlayer');
      let player = service.get('player');
      player.segments.getSegments();
      player.segments.removeAll();
      player.segments.add([payload]);
      service.play(payload.startTime);
      model.set('isPlaying', true);
    } else {
      Ember.run.later(this, this.addSegment, model, 500);
    }
  },
  deactivate() {
    let model = this.controller.get('model');
    model.set('isPlaying', false);
    if (!this.get('fastboot.isFastBoot')) {
      this.get('currentPlayer.player').segments.removeById(model.get('id'));
    }
  },
  serialize(model) {
    return { slug: model.get('slug') };
  }
});

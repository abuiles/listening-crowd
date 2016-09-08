import Ember from 'ember';

import Wavesurfer from 'wavesurfer';

export default Ember.Component.extend({
  init() {
    this._super(...arguments);

    if (Ember.testing) {
      this._loading = false;
      Ember.Test.registerWaiter(() => this._loading === false);
    }
  },

  loadWavesurferPromise() {
    const src = this.get('src');

    let promise = new Ember.RSVP.Promise((resolve, reject) => {
      const wavesurfer = Wavesurfer.create({
        backend: 'MediaElement',
        barWidth: 2,
        container: '#waveform',
        fillParent: true,
        hideScrollbar: false,
        normalize: true,
        progressColor: 'purple',
        waveColor: 'red'
      });

      wavesurfer.load(src, this.get('waveformData'));

      wavesurfer.on('ready', () => {
        Ember.run(() => {
          // Enable creating regions by dragging
          wavesurfer.enableDragSelection({
            slop: 0,
            loop: true
          });

          resolve();
        });
      });

      wavesurfer.on('play', () => {
        this.set('playing', true);
      });

      wavesurfer.on('pause', () => {
        this.set('playing', false);
      });

      wavesurfer.on('error', error => {
        Ember.run(() => {
          reject(error);
        });
      });

      document.querySelector('wave').addEventListener('dblclick', function (e) {
        wavesurfer.regions.clear();
      });


      wavesurfer.on('region-created', () => {
        wavesurfer.regions.clear();
      });

      this.set('wavesurfer', wavesurfer);
    });

    if (Ember.testing) {
      this._loading = true;
      return promise.finally(() => this._loading = false);
    }

    return promise;
  },

  loadWavesurfer() {
    this.loadWavesurferPromise()
      .then(() => {
        Ember.Logger.log('waveform loaded');
      })
      .catch( error => {
        Ember.Logger.log('waveform error : ', error);
      });
  },

  didInsertElement() {
    Ember.run.scheduleOnce('afterRender', this, this.loadWavesurfer);

    var slider = this.$('#slider')[0];

    slider.oninput =  () => {
      var zoomLevel = Number(slider.value);
      this.zoom(zoomLevel);
    };
  },

  play() {
    if (this.get('wavesurfer')) {
      this.get('wavesurfer').playPause();
    }
  },
  zoom(zoomLevel) {
    if (this.get('wavesurfer')) {
      Ember.Logger.log('zoom : ', zoomLevel);
      this.get('wavesurfer').zoom(zoomLevel);
    }
  }
});

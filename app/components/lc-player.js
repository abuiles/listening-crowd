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
        container: '#waveform',
        waveColor: 'red',
        progressColor: 'purple',
        normalize: true,
        fillParent: true,
        barWidth: 2,
        backend: 'MediaElement'
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

      wavesurfer.on('error', error => {
        Ember.run(() => {
          reject(error);
        });
      });

      wavesurfer.on('region-mouseenter', () => {
        this.set('outRegion', true);
      });

      wavesurfer.on('region-mouseleave', () => {
        this.set('outRegion', false);
      });

      wavesurfer.on('click', () => {
        Ember.Logger.log('region click');
      });

      wavesurfer.on('region-created', () => {
        wavesurfer.regions.clear();
        Ember.Logger.log('region created');
      });

      wavesurfer.on('region-updated', () => {
        Ember.Logger.log('region updated');
      });

      wavesurfer.on('region-removed', () => {
        Ember.Logger.log('region removed');
      });

      wavesurfer.on('region-update-end', () => {
        Ember.Logger.log('region update end');
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

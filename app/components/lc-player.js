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
  currentTime: 0,

  loadWavesurferPromise() {
    const src = this.get('src');

    let promise = new Ember.RSVP.Promise((resolve, reject) => {
      const wavesurfer = Wavesurfer.create({
        backend: 'MediaElement',
        barWidth: 1,
        container: '#waveform',
        fillParent: true,
        hideScrollbar: false,
        normalize: true,
        progressColor: '#fff',
        waveColor: '#fff',
        cursorColor: '#fff'
      });

      wavesurfer.load(src, this.get('waveformData'));

      wavesurfer.on('ready', () => {
        Ember.run(() => {
          let startAt = parseInt(this.get('startAt'));

          if (startAt >0) {
            wavesurfer.skip(startAt);
          }

          if (this.registerPlayer) {
            this.registerPlayer(wavesurfer);
          }
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

      wavesurfer.on('audioprocess', () => {
        let time = window.juration.stringify(
          wavesurfer.getCurrentTime(),
          {
            format: 'chrono'
          }
        );
        this.set('currentTime', time);
      });

      wavesurfer.on('seek', () => {
        let time = window.juration.stringify(
          wavesurfer.getCurrentTime(),
          {
            format: 'chrono'
          }
        );
        this.set('currentTime', time);
      });


      document.querySelector('wave').addEventListener('dblclick',  (e) => {
        if (this.deleteRegion) {
          this.deleteRegion();
        }
      });


      wavesurfer.on('region-created', (region) => {
        wavesurfer.regions.clear();
        if (this.regionCreated) {
          this.regionCreated(region);
        }
      });

      wavesurfer.on('region-updated', (region) => {
        if (this.regionUpdated) {
          this.regionUpdated(region);
        }
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
  playAt(start, end) {
    this.get('wavesurfer').play(start, end);
  },
  zoom(zoomLevel) {
    if (this.get('wavesurfer')) {
      Ember.Logger.log('zoom : ', zoomLevel);
      this.get('wavesurfer').zoom(zoomLevel);
    }
  },
  willDestroyElement() {
    if (this.unregisterPlayer) {
      this.unregisterPlayer(this.get('wavesurfer'));
    }
  }
});

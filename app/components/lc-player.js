import Ember from 'ember';

import Peaks from 'npm:peaks.js/peaks.js';

export default Ember.Component.extend({
  init() {
    this._super(...arguments);
    this.set('showAudio', true);

    if (Ember.testing) {
      this._loading = false;
      Ember.Test.registerWaiter(() => this._loading === false);
    }

  },
  currentTime: 0,
  loadwaveForms() {
    let mediaElement = this.$('#peaks-audio')[0];
    let peaks = Peaks.init({
      container: this.$('#peaks-container')[0],
      mediaElement: mediaElement,
      dataUri: {
        arraybuffer: `${this.get('waveformData')}.dat`,
        json: `${this.get('waveformData')}.json`
      },

      /** Optional config with defaults **/
      height: 200, // height of the waveform canvases in pixels
      zoomLevels: [4800, 8000, 12000], // Array of zoom levels in samples per pixel (big >> small)
      keyboard: true, // Bind keyboard controls
      nudgeIncrement: 0.01, // Keyboard nudge increment in seconds (left arrow/right arrow)
      inMarkerColor: '#454552', // Colour for the in marker of segments
      outMarkerColor: '#454552', // Colour for the out marker of segments
      zoomWaveformColor: 'rgba(250,250,250,1)', // Colour for the zoomed in waveform
      overviewWaveformColor: 'rgba(250,250,250,0.2)', // Colour for the overview waveform
      segmentColor: '#e85a71', // Colour for segments on the waveform
      overviewHighlightRectangleColor: 'white',
      playheadColor: '#454552',
      randomizeSegmentColor: false,
      waveformBuilderOptions: {
        scale: 12000,
        scale_adjuster: 127
      },
      segments: []
    });

    if (this.get('startAt') >= 0) {
      peaks.time.setCurrentTime(this.get('startAt'));
      peaks.player.play();
    }

    if (this.registerPlayer) {
      this.registerPlayer(peaks);
    }

    if (Ember.testing) {
      this._loading = true;
      peaks.on('segments.ready', () =>{
        this._loading = false;
      });
    }

    this.set('peaks', peaks);
  },

  didInsertElement() {
    Ember.run.scheduleOnce('afterRender', this, this.loadwaveForms);
  },
  didUpdateAttrs({oldAttrs, newAttrs}) {
    this._super(...arguments);

    if (oldAttrs.src.value !== newAttrs.src.value) {
      if (this.get('peaks')) {
        this.get('peaks').destroy();
        this.$('audio')[0].load();
        Ember.run.scheduleOnce('afterRender', this, this.loadwaveForms);
      }
    }
  },
  createSegment() {
    if (!this.get('segment')) {
      let peaks  = this.get('peaks');
      let startTime = peaks.time.getCurrentTime();
      let endTime = startTime + 10;
      let editable = true;
      peaks.segments.add({startTime, endTime, editable});
      let segment = peaks.segments.getSegments()[0];
      this.segmentCreated(segment);
    }
  },

  zoomOut() {
    this.get('peaks').zoom.zoomOut();
  },
  zoomIn() {
    this.get('peaks').zoom.zoomIn();
  },
  willDestroy() {
    if (this.get('peaks')) {
      this.get('peaks').destroy();
    }
  }
});

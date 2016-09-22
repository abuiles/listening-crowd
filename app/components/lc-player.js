import Ember from 'ember';

import Peaks from 'npm:peaks.js/peaks.js';

export default Ember.Component.extend({
  init() {
    this._super(...arguments);

    if (Ember.testing) {
      this._loading = false;
      Ember.Test.registerWaiter(() => this._loading === false);
    }

  },
  currentTime: 0,
  loadwaveForms() {
    let peaks = Peaks.init({
      container: this.$('#peaks-container')[0],
      mediaElement: this.$('#peaks-audio')[0],
      dataUri: this.get('waveformData'),

      /** Optional config with defaults **/
      height: 200, // height of the waveform canvases in pixels
      zoomLevels: [4410, 8000, 12000], // Array of zoom levels in samples per pixel (big >> small)
      keyboard: false, // Bind keyboard controls
      nudgeIncrement: 0.01, // Keyboard nudge increment in seconds (left arrow/right arrow)
      inMarkerColor: '#a0a0a0', // Colour for the in marker of segments
      outMarkerColor: '#a0a0a0', // Colour for the out marker of segments
      zoomWaveformColor: 'rgba(0, 225, 128, 1)', // Colour for the zoomed in waveform
      overviewWaveformColor: 'rgba(0,0,0,0.2)', // Colour for the overview waveform
      segmentColor: 'rgba(255, 161, 39, 1)', // Colour for segments on the waveform
      randomizeSegmentColor: true
    });

    if (this.registerPlayer) {
      this.registerPlayer(peaks);
    }

    this.$( "#peaks-container" ).dblclick(() =>  {
      this.createSegment();
    });

    this.set('peaks', peaks);
  },

  didInsertElement() {
    Ember.run.scheduleOnce('afterRender', this, this.loadwaveForms);
  },
  createSegment() {
    if (!this.get('region')) {
      let peaks  = this.get('peaks');
      let startTime = peaks.time.getCurrentTime();
      let endTime = startTime + 10;
      let editable = true;
      peaks.segments.add({startTime, endTime, editable});
      let region = peaks.segments.getSegments()[0];
      this.regionCreated({
        start: startTime,
        end: endTime,
        region
      });
    }
  },

  zoomOut() {
    this.get('peaks').zoom.zoomOut();
  },
  zoomIn() {
    this.get('peaks').zoom.zoomIn();
  }
});

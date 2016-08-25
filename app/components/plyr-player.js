import Ember from 'ember';

export default Ember.Component.extend({
  classNames: 'plyr',
  // mp4:        "",
  // webm:       "",
  // captions:   "",
  // poster:     "",
  // mp3:        "",
  // ogg:        "",
  // video_id:   "",
  options:    null,
  plyrObject: null,
  evented:    true,
  plyrIcons: 'assets/sprites/plyr.svg',
  didInsertElement() {
    this._super(...arguments);
    // this.$().attr('contenteditable', true);
    const options = this.get('options') || {};

    options.loadSprite = false;
    options.iconUrl = this.get('plyrIcons');

    let mediaElement = this.element.querySelector(this.get('mediaTag'));
    let plyrObject;

    if (options !== null) {
      plyrObject = window.plyr.setup(mediaElement, options)[0].plyr;
    } else {
      plyrObject = window.plyr.setup(mediaElement)[0].plyr;
    }

    this.set('plyrObject', plyrObject);


    if (this.get('evented') && plyrObject) {
      //send init event with video player so parent can control plyr object
      this.sendAction('videoReady', mediaElement);

      this.$(mediaElement).on('abort', (e) => {
        this.sendAction('abort', e);
      }).on('loadstart', (e) => {
        this.sendAction('loadstart', e);
      }).on('progess', (e) => {
        this.sendAction('progress', e);
      }).on('suspend', (e) => {
        this.sendAction('suspend', e);
      }).on('error', (e) => {
        this.sendAction('error', e);
      }).on('emptied', (e) => {
        this.sendAction('emptied', e);
      }).on('stalled', (e) => {
        this.sendAction('stalled', e);
      }).on('loadedmetadata', (e) => {
        this.sendAction('loadedmetadata', e);
      }).on('loadeddata', (e) => {
        this.sendAction('loadeddata', e);
      }).on('canplay', (e) => {
        this.sendAction('canplay', e);
      }).on('canplaythrough', (e) => {
        this.sendAction('canplaythrough', e);
      }).on('playing', (e) => {
        this.sendAction('playing', e);
      }).on('waiting', (e) => {
        this.sendAction('waiting', e);
      }).on('seeking', (e) => {
        this.sendAction('seeking', e);
      }).on('seeked', (e) => {
        this.sendAction('seeked', e);
      }).on('ended', (e) => {
        this.sendAction('ended', e);
      }).on('durationchange', (e) => {
        this.sendAction('durationchange', e);
      }).on('timeupdate', (e) => {
        this.sendAction('timeupdate', e);
      }).on('play', (e) => {
        this.sendAction('play', e);
      }).on('pause', (e) => {
        this.sendAction('pause', e);
      }).on('ratechange', (e) => {
        this.sendAction('ratechange', e);
      }).on('resize', (e) => {
        this.sendAction('resize', e);
      }).on('volumechange', (e) => {
        this.sendAction('volumechange', e);
      });
    }
  },
  willDestroyElement() {
    const plyrObject = this.get('plyrObject');

    if (plyrObject) {
      const { media } = plyrObject;

      this.$(media).off('abort loadstart progress suspend error emptied stalled ' +
        'loadedmetadata loadeddata canplay canplaythrough playing waiting ' +
        'seeking seeked ended durationchange timeupdate play pause ' +
        'ratechange resize volumechange');

      plyrObject.destroy();
    }
  }
});

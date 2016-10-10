import Ember from 'ember';

export default Ember.Service.extend({
  play(startTime) {
    let player = this.get('player');
    player.time.setCurrentTime(startTime);
    player.player.play();
  },
  pause() {
    let player = this.get('player');
    player.player.pause();
  }
});

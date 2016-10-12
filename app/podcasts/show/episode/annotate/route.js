import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service(),
  currentPlayer: Ember.inject.service(),
  scroller: Ember.inject.service(),
  model(params, transition) {
    if (!params.slug) {
      transition.abort();
      return this.transitionTo('podcasts.show.episode');
    } else {
      return this.store.query('annotation', {
        filter: {
          slug: params.slug
        }
      }).then(function(result) {
        return result.get('firstObject');
      });
    }
  },
  setupController(controller, model) {
    this._super(...arguments);
    if (!this.get('fastboot.isFastBoot')) {
      Ember.run.scheduleOnce('afterRender', this, this.addSegment, controller, model);
      Ember.run.scheduleOnce('afterRender', () => {
        this.get('scroller').scrollVertical('#peaks-container', {
          duration: 200
        });
      });
    }
  },
  activate() {
  },
  deactivate() {
    let model = this.controller.get('model');
    delete model._segment;
    this.get('currentPlayer.player').segments.removeAll();
    this.get('currentPlayer.player').off('segments.dragged', this._callback);
  },
  addSegment(controller, model) {
    if (this.get('currentPlayer.player') &&  this.get('currentPlayer.player').waveform.segments) {
      let playerService = this.get('currentPlayer');
      if (!model._segment) {
        let payload = {
          startTime: model.get('start'),
          endTime: model.get('end'),
          editable: true,
          id: model.get('id'),
          labelText: ''
        };
        playerService.player.segments.removeAll();
        playerService.player.segments.add([payload]);

        model._segment = playerService.player.segments.getSegments()[0];
      }

      controller.setProperties({
        f: model._segment.startTime,
        t: model._segment.endTime
      });

      playerService.setCurrentTime(model._segment.startTime);

      this._callback  = (segment) =>  { this.updateSegmentDate(segment); };
      this.get('currentPlayer.player').on('segments.dragged', this._callback);
    } else {
      Ember.run.later(this, this.addSegment, controller, model, 500);
    }
  },
  updateSegmentDate(segment) {
    let controller = this.controller;
    controller.setProperties({
      f: segment.startTime,
      t: segment.endTime
    });
  },
  serialize(model) {
    return {
      slug: model.get('slug') || 'new'
    };
  }
});

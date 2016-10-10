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

    Ember.run.once('afterRender', () => {
      if (!model._segment) {
        let payload = {
          startTime: model.get('start'),
          endTime: model.get('end'),
          editable: true,
          id: model.get('id'),
          labelText: ''
        };
        this.get('currentPlayer.player').segments.removeAll();
        this.get('currentPlayer.player').segments.add([payload]);

        model._segment = this.get('currentPlayer.player').segments.getSegments()[0];
      }

      controller.setProperties({
        f: model._segment.startTime,
        t: model._segment.endTime
      });

      this._callback  = (segment) =>  { this.updateSegmentDate(segment); };
      this.get('currentPlayer.player').on('segments.dragged', this._callback);
    });
  },
  actiavate() {
    this.get('scroller').scrollVertical('#peaks-container', {
      duration: 200
    });
  },
  deactivate() {
    let model = this.controller.get('model');
    delete model._segment;
    this.get('currentPlayer.player').segments.removeAll();
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


  // afterModel(model, transition) {
  //   let promise = Ember.RSVP.resolve(null);

  //   if (!this.get('session.isAuthenticated')) {
  //     let lockOptions = {
  //       authParams:{
  //         scope: 'openid'
  //       }
  //     };

  //     let episode = model.get('episode');
  //     let podcast = episode.get('podcast');

  //     promise = this.get('session').authenticate('simple-auth-authenticator:lock', lockOptions).then(() => {
  //       this.transitionToRoute('podcasts.show.episode.annotate', podcast, episode, model);
  //     }, () => {
  //       return this.transitionToRoute('podcasts.show.episode', podcast, episode);
  //     });
  //   }

  //   return promise;
  // },

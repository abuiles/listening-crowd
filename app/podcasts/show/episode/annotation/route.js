import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.query('annotation', {
      filter: {
        slug: params.slug
      }
    }).then(function(result) {
      return result.get('firstObject');
    });
  },
  // afterModel(model) {
  //   if (!model) {
  //     this.transitionTo('index');
  //   }
  // },
  serialize(model) {
    return { slug: model.get('slug') };
  }
});

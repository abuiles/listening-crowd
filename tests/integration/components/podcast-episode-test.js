import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('podcast-episode', 'Integration | Component | podcast episode', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{podcast-episode}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#podcast-episode}}
      template block text
    {{/podcast-episode}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

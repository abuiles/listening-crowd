import Ember from 'ember';

import createComponentCard from 'ember-mobiledoc-editor/utils/create-component-card';


export default Ember.Component.extend({
  cards: Ember.computed(function() {
    return [
      createComponentCard('video-card'),
      createComponentCard('song-card'),
      createComponentCard('amazon-card'),
      createComponentCard('quote-card')
    ];
  }),
  addCard(editor, card) {
    if (!editor.editor.hasCursor()) {
      editor.editor.focus();
    }
    editor.addCardInEditMode(card, {});
  },
  toggleLink({editor}) {
    if (!editor.hasCursor()) {
      return ;
    }

    if (editor.hasActiveMarkup('a')) {
      editor.toggleMarkup('a');
    } else {
      this.set('linkOffsets', editor.range);
    }
  },
  completeLink({editor}, href) {
    let offsets = this.get('linkOffsets');
    this.set('linkOffsets', null);
    editor.run(postEditor => {
      let markup = postEditor.builder.createMarkup('a', {href});
      // offsets.isCollapsed = false;
      // postEditor.addMarkupToRange(offsets, markup);
      postEditor.insertTextWithMarkup(offsets.tail, href, [markup]);
    });
  }
});

import Ember from 'ember';

import createComponentCard from 'ember-mobiledoc-editor/utils/create-component-card';


export default Ember.Component.extend({
  init() {
    this._super(...arguments);
  },
    cards: Ember.computed(function() {
    return [
      createComponentCard('video-card'),
      createComponentCard('song-card'),
      createComponentCard('amazon-card'),
      createComponentCard('quote-card'),
      createComponentCard('image-card')
    ];
  }),
  setMobileDocOptions() {
    this.set('mobileDocOptions', {
      parserPlugins: [this.imageToCardParser]
    });
  },
  imageToCardParser(node, builder, {addSection, addMarkerable, nodeFinished}) {
    if (node.nodeType !== 1 || node.tagName !== 'IMG') {
      return;
    }
    var payload = {
      src: node.src,
      alt: node.alt,
      title: node.title
    };

    var cardSection = builder.createCardSection('image-card', payload);
    addSection(cardSection);
    nodeFinished();
  },
  addCard(editor, card) {
    if (!editor.editor.hasCursor()) {
      editor.editor.focus();
    }
    editor.addCardInEditMode(card, {});
  },
  toggleLink(mobiledoc) {
    let editor = mobiledoc.editor;
    if (!editor.hasCursor()) {
      editor.focus();
    }

    if (editor.hasActiveMarkup('a')) {
      editor.toggleMarkup('a');
    } else {
      this.set('linkOffsets', editor.range);
    }
  },
  toggleImage(mobiledoc) {
    let editor = mobiledoc.editor;
    if (!editor.hasCursor()) {
      editor.focus();
    }

    if (editor.hasActiveMarkup('img')) {
      editor.toggleMarkup('img');
    } else {
      this.set('imgPrompt', true);
    }
  },
  completeLink({editor}, href) {
    let offsets = this.get('linkOffsets');
    this.set('linkOffsets', null);
    editor.run(postEditor => {
      let markup = postEditor.builder.createMarkup('a', {href});

      if (offsets.isCollapsed) {
        postEditor.insertTextWithMarkup(offsets.tail, href, [markup]);
      } else {
        postEditor.addMarkupToRange(offsets, markup);
      }
    });
  },
  addImg({editor}, src) {
    editor.run(postEditor => {
      let markup = postEditor.builder.createMarkup('img', {src});
      let offsets = editor.range;

      debugger;
      if (offsets.isCollapsed) {
        postEditor.toggleMarkup(markup);
      } else {
        postEditor.addMarkupToRange(offsets, markup);
      }
    });
  }
});

export default Ember.HTMLBars.template((function() {
  return {
    meta: {
      "revision": "Ember@2.8.0",
      "loc": {
        "source": null,
        "start": {
          "line": 1,
          "column": 0
        },
        "end": {
          "line": 19,
          "column": 0
        }
      },
      "moduleName": "listening-crowd/templates/podcasts/show/index.hbs"
    },
    isEmpty: false,
    arity: 0,
    cachedFragment: null,
    hasRendered: false,
    buildFragment: function buildFragment(dom) {
      var el0 = dom.createDocumentFragment();
      var el1 = dom.createElement("div");
      dom.setAttribute(el1,"class","flex");
      var el2 = dom.createTextNode("\n  ");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("div");
      dom.setAttribute(el2,"class","flex-auto");
      var el3 = dom.createTextNode("\n    ");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("div");
      dom.setAttribute(el3,"class","container mt3");
      var el4 = dom.createTextNode("\n      ");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("div");
      dom.setAttribute(el4,"class","mt3 f0");
      var el5 = dom.createTextNode("\n        ");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("div");
      dom.setAttribute(el5,"class","dib w-100 w-25-l v-top pr4-l");
      var el6 = dom.createTextNode("\n          ");
      dom.appendChild(el5, el6);
      var el6 = dom.createElement("img");
      dom.setAttribute(el6,"class","ba b--near-white db");
      dom.appendChild(el5, el6);
      var el6 = dom.createTextNode("\n        ");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      var el5 = dom.createTextNode("\n        ");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("div");
      dom.setAttribute(el5,"class","dib w-100 w-75-l v-top f5");
      var el6 = dom.createTextNode("\n          ");
      dom.appendChild(el5, el6);
      var el6 = dom.createElement("h1");
      dom.setAttribute(el6,"class","mt0 lh-solid-ns");
      var el7 = dom.createElement("a");
      dom.setAttribute(el7,"class","link");
      var el8 = dom.createComment("");
      dom.appendChild(el7, el8);
      dom.appendChild(el6, el7);
      dom.appendChild(el5, el6);
      var el6 = dom.createTextNode("\n          ");
      dom.appendChild(el5, el6);
      var el6 = dom.createElement("p");
      dom.setAttribute(el6,"class","mb0");
      var el7 = dom.createComment("");
      dom.appendChild(el6, el7);
      dom.appendChild(el5, el6);
      var el6 = dom.createTextNode("\n          ");
      dom.appendChild(el5, el6);
      var el6 = dom.createElement("p");
      dom.setAttribute(el6,"class","mb0");
      var el7 = dom.createComment("");
      dom.appendChild(el6, el7);
      dom.appendChild(el5, el6);
      var el6 = dom.createTextNode("\n          ");
      dom.appendChild(el5, el6);
      var el6 = dom.createElement("p");
      dom.setAttribute(el6,"class","mb0");
      var el7 = dom.createTextNode("Categories: ");
      dom.appendChild(el6, el7);
      var el7 = dom.createComment("");
      dom.appendChild(el6, el7);
      dom.appendChild(el5, el6);
      var el6 = dom.createTextNode("\n        ");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      var el5 = dom.createTextNode("\n      ");
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n    ");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n  ");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n");
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n");
      dom.appendChild(el0, el1);
      var el1 = dom.createComment("");
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n");
      dom.appendChild(el0, el1);
      return el0;
    },
    buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
      var element0 = dom.childAt(fragment, [0, 1, 1, 1]);
      var element1 = dom.childAt(element0, [1, 1]);
      var element2 = dom.childAt(element0, [3]);
      var element3 = dom.childAt(element2, [1, 0]);
      var morphs = new Array(7);
      morphs[0] = dom.createAttrMorph(element1, 'src');
      morphs[1] = dom.createAttrMorph(element3, 'href');
      morphs[2] = dom.createMorphAt(element3,0,0);
      morphs[3] = dom.createUnsafeMorphAt(dom.childAt(element2, [3]),0,0);
      morphs[4] = dom.createMorphAt(dom.childAt(element2, [5]),0,0);
      morphs[5] = dom.createMorphAt(dom.childAt(element2, [7]),1,1);
      morphs[6] = dom.createMorphAt(fragment,2,2,contextualElement);
      return morphs;
    },
    statements: [
      ["attribute","src",["get","model.itunesImage",["loc",[null,[6,49],[6,66]]],0,0,0,0],0,0,0,0],
      ["attribute","href",["get","model.link",["loc",[null,[9,61],[9,71]]],0,0,0,0],0,0,0,0],
      ["content","model.title",["loc",[null,[9,74],[9,89]]],0,0,0,0],
      ["content","model.description",["loc",[null,[10,25],[10,48]]],0,0,0,0],
      ["content","model.copyright",["loc",[null,[11,25],[11,44]]],0,0,0,0],
      ["content","model.itunesCategories",["loc",[null,[12,37],[12,63]]],0,0,0,0],
      ["content","outlet",["loc",[null,[18,0],[18,10]]],0,0,0,0]
    ],
    locals: [],
    templates: []
  };
}()));
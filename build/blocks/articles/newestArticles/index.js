/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/articles/newestArticles/index.js":
/*!*****************************************************!*\
  !*** ./src/blocks/articles/newestArticles/index.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_Divider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../components/Divider */ "./src/components/Divider.js");
/* harmony import */ var _svg_IconArrowRight__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../svg/IconArrowRight */ "./src/svg/IconArrowRight.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./style.scss */ "./src/blocks/articles/newestArticles/style.scss");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./block.json */ "./src/blocks/articles/newestArticles/block.json");
/* harmony import */ var _attributes_json__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./attributes.json */ "./src/blocks/articles/newestArticles/attributes.json");








/**
 *
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


/**
 * Internal Data
 */



(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_8__.name, {
  attributes: _attributes_json__WEBPACK_IMPORTED_MODULE_9__,
  edit: props => {
    const {
      attributes,
      setAttributes
    } = props;
    /**
     * Resave all default values for PHP rendering 
     */

    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
      Object.keys(attributes).forEach(attributeKey => setAttributes({
        [attributeKey]: attributes[attributeKey]
      }));
      console.log(attributes);

      for (const attributeKey of Object.keys(attributes)) {
        setAttributes({
          [attributeKey]: attributes[attributeKey]
        });
      }
    }, [attributes]);
    /**
     * Site Main Information
     *
     */

    /**
     * Posts
     */

    const postData = wp.data.useSelect(select => {
      return select('core').getEntityRecords('postType', 'udalosti', {
        per_page: attributes.max_articles,
        order: attributes.order
      });
    }, [attributes.max_articles, attributes.order]);
    /**
     * Get All Categories
     */

    const catData = wp.data.useSelect(select => {
      return select('core').getEntityRecords('taxonomy', 'category');
    }, []);
    /**
     * Get All Post Tags
     */

    const tagsData = wp.data.useSelect(select => {
      return select('core').getEntityRecords('taxonomy', 'post_tag');
    }, []);
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
      /**
       * Save Posts
       */
      if (postData && Object.entries(postData).length > 0 && (Object.entries(attributes.posts).length === 0 || postData !== attributes.posts)) {
        setAttributes({
          posts: postData
        });
      }
      /**
       * Save All Cats
       */


      if (catData && Object.entries(catData).length > 0 && Object.entries(attributes.all_categories).length === 0) {
        const betterCats = {};
        Object.values(catData).forEach(cat => {
          betterCats[cat.id] = {
            id: cat.id,
            name: cat.name,
            link: cat.link
          };
        });
        setAttributes({
          all_categories: betterCats
        });
      }
      /**
       * Save All Tags
       */


      if (tagsData && Object.entries(tagsData).length > 0 && Object.entries(attributes.all_tags).length === 0) {
        const betterTags = {};
        Object.values(tagsData).forEach(cat => {
          betterTags[cat.id] = {
            id: cat.id,
            name: cat.name,
            link: cat.link
          };
        });
        setAttributes({
          all_tags: betterTags
        });
      }
      /**
       * Save Local Cats
       */


      if (attributes.posts && Object.entries(attributes.posts).length > 0 && attributes.all_categories && Object.entries(attributes.all_categories).length > 0) {
        Object.values(attributes.posts).forEach(key => {
          const localCategories = {};
          key.categories.forEach(index => {
            localCategories[index] = {
              id: index,
              name: attributes.all_categories[index].name,
              href: attributes.all_categories[index].link
            };
          });

          if (localCategories && Object.entries(localCategories).length > 0) {
            setAttributes({
              categories: localCategories
            });
          }
        });
      }
      /**
       * Save Local Tags
       */


      if (attributes.posts && Object.entries(attributes.posts).length > 0 && attributes.all_tags && Object.entries(attributes.all_tags).length > 0) {
        Object.values(attributes.posts).forEach(key => {
          const localTags = {};
          key.tags.forEach(index => {
            localTags[index] = {
              id: index,
              name: attributes.all_tags[index].name,
              href: attributes.all_tags[index].link
            };
          });

          if (localTags && Object.entries(localTags).length > 0) {
            setAttributes({
              tags: localTags
            });
          }
        });
      }
      /**
       * Save Custom Post Type Archive Link
       */


      if (custom_data !== undefined && custom_data !== null && custom_data.udalosti_archive !== undefined && custom_data.udalosti_archive !== null && attributes.archive_link === '') {
        setAttributes({
          archive_link: custom_data.udalosti_archive
        });
      }
    }, [postData, catData, tagsData, attributes.all_categories, attributes.all_tags, attributes.max_articles, attributes.order]);
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
      initialOpen: true,
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Nastavení Článků', 'ant-studio-example')
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.RangeControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Počet Článků', 'ant-studio-example'),
      value: attributes.max_articles,
      onChange: val => setAttributes({
        max_articles: val
      }),
      min: 0,
      max: 12,
      initialPosition: 4
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Divider__WEBPACK_IMPORTED_MODULE_5__["default"], null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Seřazení Článků', 'ant-studio-example'),
      value: attributes.order,
      options: [{
        label: 'Od Nejnovějšího',
        value: 'desc'
      }, {
        label: 'Od Nejstaršího',
        value: 'asc'
      }],
      onChange: val => {
        setAttributes({
          order: val
        });
      },
      __nextHasNoMarginBottom: true
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps)({
      className: 'newest-articles'
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.BlockControls, {
      group: "block"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "newest-header"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.RichText, {
      tagName: "h2",
      allowedFormats: [],
      value: attributes.title,
      onChange: val => {
        setAttributes({
          title: val
        });
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: attributes.archive_link
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.RichText, {
      tagName: "span",
      allowedFormats: [],
      value: attributes.archive_text,
      onChange: val => {
        setAttributes({
          archive_text: val
        });
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_svg_IconArrowRight__WEBPACK_IMPORTED_MODULE_6__["default"], null))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "newest-items"
    }, Object.values(attributes.posts).map(key => {
      const postCategories = key.categories;
      const postTags = key.tags;
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "newest-item",
        key: key.title.rendered
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "newest-category"
      }, Object.values(attributes.all_categories).map((key, index) => {
        if (postCategories && postCategories.includes(key.id)) {
          return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
            href: key.link,
            key: key.name
          }, key.name);
        }
      })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "newest-date"
      }, key.date.replace('T', ' ')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "newest-title"
      }, key.title.rendered), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.RichText, {
        tagName: "div",
        value: key.excerpt.rendered,
        className: "newest-excerpt"
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "newest-tags"
      }, Object.values(attributes.all_tags).map((key, index) => {
        if (postTags && postTags.includes(key.id)) {
          return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
            href: key.link,
            key: key.name
          }, key.name);
        }
      })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "newest-link"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
        href: key.link,
        title: key.title.rendered
      }, "P\u0159e\u010D\xEDst V\xEDce", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_svg_IconArrowRight__WEBPACK_IMPORTED_MODULE_6__["default"], null))));
    }))));
  } // save: ( { attributes } ) => {
  // 	return (
  // 		<div
  // 			{ ...useBlockProps.save( {
  // 				className: 'newest-articles',
  // 			} ) }
  // 		>
  // 			<div className="newest-header">
  // 				<RichText.Content tagName="h2" value={ attributes.title } />
  // 				<a href={ attributes.archive_link }>
  // 					<RichText.Content
  // 						tagName="span"
  // 						value={ attributes.archive_text }
  // 					/>
  // 					<IconArrowRight />
  // 				</a>
  // 			</div>
  // 			<div className="newest-items">
  // 				{ Object.values( attributes.posts ).map( ( key ) => {
  // 					const postCategories = key.categories;
  // 					const postTags = key.tags;
  // 					return (
  // 						<div
  // 							className="newest-item"
  // 							key={ key.title.rendered }
  // 						>
  // 							<div className="newest-category">
  // 								{ Object.values(
  // 									attributes.all_categories
  // 								).map( ( key, index ) => {
  // 									if (
  // 										postCategories &&
  // 										postCategories.includes( key.id )
  // 									) {
  // 										return (
  // 											<a
  // 												href={ key.link }
  // 												key={ key.name }
  // 											>
  // 												{ key.name }
  // 											</a>
  // 										);
  // 									}
  // 								} ) }
  // 							</div>
  // 							<div className="newest-date">
  // 								{ key.date.replace( 'T', ' ' ) }
  // 							</div>
  // 							<div className="newest-title">
  // 								{ key.title.rendered }
  // 							</div>
  // 							<RichText.Content
  // 								tagName="div"
  // 								value={ key.excerpt.rendered }
  // 								className="newest-excerpt"
  // 							/>
  // 							<div className="newest-tags">
  // 								{ Object.values( attributes.all_tags ).map(
  // 									( key, index ) => {
  // 										if (
  // 											postTags &&
  // 											postTags.includes( key.id )
  // 										) {
  // 											return (
  // 												<a
  // 													href={ key.link }
  // 													key={ key.name }
  // 												>
  // 													{ key.name }
  // 												</a>
  // 											);
  // 										}
  // 									}
  // 								) }
  // 							</div>
  // 							<div className="newest-link">
  // 								<a
  // 									href={ key.link }
  // 									title={ key.title.rendered }
  // 								>
  // 									Přečíst Více
  // 									<IconArrowRight />
  // 								</a>
  // 							</div>
  // 						</div>
  // 					);
  // 				} ) }
  // 			</div>
  // 		</div>
  // 	);
  // },

});

/***/ }),

/***/ "./src/components/Divider.js":
/*!***********************************!*\
  !*** ./src/components/Divider.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Divider; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);


/**
 * This simple Divider components is being used as a replacement for the original Wordpress <Divider> Component
 * Currently the WP <Divider> is marked as “Experimental”
 *
 * See: https://developer.wordpress.org/block-editor/reference-guides/components/divider/
 */
function Divider() {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("hr", {
    className: "mchymcak-separator"
  });
}

/***/ }),

/***/ "./src/svg/IconArrowRight.js":
/*!***********************************!*\
  !*** ./src/svg/IconArrowRight.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ IconArrowRight; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

function IconArrowRight() {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "7.75",
    viewBox: "0 0 16 7.75"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M15.817,135.433h0l-3.266-3.25a.625.625,0,0,0-.882.886l2.193,2.182H.625a.625.625,0,0,0,0,1.25H13.861l-2.193,2.182a.625.625,0,0,0,.882.886l3.266-3.25h0A.626.626,0,0,0,15.817,135.433Z",
    transform: "translate(3 -132)",
    fill: "#af0b2b"
  }));
}

/***/ }),

/***/ "./src/blocks/articles/newestArticles/style.scss":
/*!*******************************************************!*\
  !*** ./src/blocks/articles/newestArticles/style.scss ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ (function(module) {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ (function(module) {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ (function(module) {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ (function(module) {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./src/blocks/articles/newestArticles/attributes.json":
/*!************************************************************!*\
  !*** ./src/blocks/articles/newestArticles/attributes.json ***!
  \************************************************************/
/***/ (function(module) {

module.exports = JSON.parse('{"posts":{"type":"array","default":{}},"all_categories":{"type":"object","default":{}},"categories":{"type":"object","default":{}},"tags":{"type":"object","default":{}},"all_tags":{"type":"object","default":{}},"title":{"type":"string","selector":"h2","attribute":"value","default":"Události, akce, novinky z oboru"},"max_articles":{"type":"integer","attribute":"value","default":4},"order":{"type":"string","attribute":"value","default":"desc"},"archive_link":{"type":"string","attribute":"text","default":""},"archive_text":{"type":"string","attribute":"value","default":"Aktuality"}}');

/***/ }),

/***/ "./src/blocks/articles/newestArticles/block.json":
/*!*******************************************************!*\
  !*** ./src/blocks/articles/newestArticles/block.json ***!
  \*******************************************************/
/***/ (function(module) {

module.exports = JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"mchymcak/newestarticles","version":"1.0","title":"Ant Studio - Newest Articles","category":"theme","icon":"laptop","description":"Newest Articles","supports":{"html":false},"example":{},"keywords":["articles","recent posts"],"textdomain":"ant-studio-example","editorScript":"file:./index.js","style":"file:./style-index.css"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"blocks/articles/newestArticles/index": 0,
/******/ 			"blocks/articles/newestArticles/style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkant_studio_test"] = self["webpackChunkant_studio_test"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["blocks/articles/newestArticles/style-index"], function() { return __webpack_require__("./src/blocks/articles/newestArticles/index.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map
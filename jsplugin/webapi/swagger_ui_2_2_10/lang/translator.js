'use strict';

/**
 * Translator for documentation pages.
 *
 * To enable translation you should include one of language-files in your index.html
 * after <script src='lang/translator.js' type='text/javascript'></script>.
 * For example - <script src='lang/ru.js' type='text/javascript'></script>
 *
 * If you wish to translate some new texts you should do two things:
 * 1. Add a new phrase pair ("New Phrase": "New Translation") into your language file (for example lang/ru.js). It will be great if you add it in other language files too.
 * 2. Mark that text it templates this way <anyHtmlTag data-sw-translate>New Phrase</anyHtmlTag> or <anyHtmlTag data-sw-translate value='New Phrase'/>.
 * The main thing here is attribute data-sw-translate. Only inner html, title-attribute and value-attribute are going to translate.
 *
 */
window.SwaggerTranslator = {

    _words:[],

    translate: function(sel) {
      var $this = this;
      sel = sel || '[data-sw-translate]';
      // console.log(sel);
      $(sel).each(function() {
        
        //当使用该方法设置一个值时，它会覆盖所有匹配元素的内容。
        $(this).html($this._tryTranslate($(this).html()));
        //该方法设置所有匹配元素的 value 属性的值。
        $(this).val($this._tryTranslate($(this).val()));
        //设置 title（当鼠标移至上方时，显示额外信息）
        $(this).attr('title', $this._tryTranslate($(this).attr('title')));
      });
    },

    _tryTranslate: function(word) { // 从_words数组中取匹配的译文
      return this._words[$.trim(word)] !== undefined ? this._words[$.trim(word)] : word;
    },

    learn: function(wordsMap) { // 在zh-cn.js中使用json数据初始化了_words
      this._words = wordsMap;
    }
};

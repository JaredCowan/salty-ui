+function($) {

  // DOCUMENT READY FUNCTIONS
  // ========================
  $(document).ready(function(){

    // SITE COLORS
    var colors = {
      white:     '#fff',
      black:     '#000',
      red:       '#d9534f',
      brightRed: 'rgb(255,0,0)',
      teal:      '#16a085'
    }

    // COLOR SCROLLBAR STYLES
    // ======================
    $("html").niceScroll(
      {
        styler:"fb",
        cursorcolor: colors.teal,
        cursorwidth: '6',
        cursorborderradius: '10px',
        background: '#404040',
        spacebarenabled:false,  
        cursorborder: '',
        zindex: '1000'
      }
    );

    $("#sidebar, .code-window > pre").niceScroll(
      {
        styler:"fb",
        cursorcolor: colors.teal,
        cursorwidth: '6',
        cursorborderradius: '10px',
        background: '#404040',
        spacebarenabled:false,  
        cursorborder: '',
        zindex: '1000'
      }
    );

    // SIDEBAR DROPDOWN MENU AUTO SCROLLING
    // ====================================

    $('#sidebar .sub-menu > a').click( function() {
        var o = ( $(this).offset() );
        diff  = 70 - o.top;
        if ( diff > 0 )
            $("#sidebar").scrollTo("-="+Math.abs(diff),500);
        else
            $("#sidebar").scrollTo("+="+Math.abs(diff),500);
    });

    // LEFT SIDEBAR FUNCTION
    $(function() {

      var wSize              = $(window).width()
            , el_toggle_nav  = $('.sidebar-toggle-box')
            , el_cont        = $('#container')
            , el_main_cont   = $('#main-content')
            , el_sb          = $('#sidebar')
            , el_sb_ul       = $('#sidebar > ul');

      // RESPONSIVE LEFT SIDEBAR
      // =======================    
      function sidebarResponsive() {
        
        if (wSize <= 768 || (wSize > 768 && el_cont.hasClass('sidebar-closed'))) {
          el_main_cont.css({
            'margin-left': '0px'
          });
          el_sb.css({
              'margin-left': '-210px'
          });
          el_cont.addClass('sidebar-closed');
          el_sb_ul.hide();
        }

        if (wSize > 768 && !el_cont.hasClass('sidebar-closed')) {
          el_main_cont.css({
            'margin-left': '210px'
          });
          el_sb_ul.show();
          el_sb.css({
            'margin-left': '0'
          });
          el_cont.removeClass('sidebar-closed');
          el_sb_ul.show();
        }
      }
      $(window).on('load resize', sidebarResponsive);
  
  
      // SIDEBAR TOGGLE
      // ==============
      function sidebarToggle() {
        
      if (el_sb_ul.is(":visible") === true) {
          el_main_cont.css({
              'margin-left': '-1px'
          });
          el_sb.css({
              'margin-left': '-210px'
          });
          el_sb_ul.hide();
          el_cont.addClass("sidebar-closed");
        } else {
          el_main_cont.css({
              'margin-left': '210px'
          });
          el_sb_ul.show();
          el_sb.css({
              'margin-left': '-1px'
          });
          el_cont.removeClass("sidebar-closed");
        }
      };
      el_toggle_nav.on('click', sidebarToggle);
    });

    $('.tooltips').tooltip();
    $('.popovers').popover();

    $('#nav-accordion').dcAccordion({
        eventType: 'click',
        autoClose: true,
        saveState: true,
        disableLink: true,
        speed: 'slow',
        showCount: false,
        autoExpand: true,
        classExpand: 'dcjq-current-parent'
    });
  });  // DOCUMENT READY FUNCTION
  
  // Insert copy to clipboard button before .highlight
    $('.highlight').each(function () {
      var btnHtml = '<div class="zero-clipboard"><span class="btn btn-clipboard copy-button hidden-xs"><i class="fa fa-copy"></i> Copy</span></div>'
      $(this).before(btnHtml)
    })
     // =======================================
  // =======================================
  // Refactor 

    $('.icon-copy').each(function () {
      var iconCopyHtml = '<div class="zero-clipboard"><span class="btn icon-clipboard copy-button hidden-xs"><i class="fa fa-copy"></i> Copy</span></div>'
      $(this).before(iconCopyHtml)
    })

    $('.fa-icon-copy').each(function () {
      var iconCopyHtml = '<div class="zero-clipboard"><span class="btn fa-icon-clipboard copy-button hidden-xs"><i class="fa fa-copy"></i> Copy</span></div>'
      $(this).before(iconCopyHtml)
    })

  // Init clipboard and variables
  var zeroClipboard = new ZeroClipboard( $(".copy-button") )
    , $btn_clip     = $('.btn-clipboard')
    , $copy_button  = $(".copy-button")
    , $icon_copy    = $(".icon-clipboard")
    , $fa_icon_copy = $(".fa-icon-clipboard"); 

  // Dynamically add popover data attributes to each button
  $copy_button.attr({
    "data-toggle":          "tooltip",
    "title":                "Click To Copy",
    "data-placement":       "top"
  });

  // Show/hide confirmation text on copy success
  zeroClipboard.on( "ready", function( readyEvent ) {
    $copy_button.on( "click", function() {
      $('.tooltip-inner').text('Copied!')
    });

    // Dynamically add unique ids to button and target
    // of element to copy. Run only once.
    $btn_clip.one('mouseenter', function( el ) {
      var $highlight = $(this).parent().nextAll('.highlight').first()
        , $btn = $( this )
        , randId = Math.ceil(Math.random() * 20000);
      $btn.attr("data-clipboard-target", randId )
      $highlight.attr({ id: randId })
    })

    // =======================================
  // =======================================
  // Refactor 


    // Dynamically add unique ids to button and target
    // of element to copy. Run only once.
    $icon_copy.on('mouseover', function( el ) {
      if ( $(".tooltip").length >= 2 ) {
        $(".tooltip").first().tooltip('hide')
      }
      var $icon_copy_elm = $(this).parent().nextAll('.icon-copy').first()
        , $btn = $( this )
        , randId = Math.ceil(Math.random() * 20000);
      $btn.attr("data-clipboard-target", randId )
      $icon_copy_elm.attr({ id: randId })
    })

    $fa_icon_copy.on('mouseover', function( el ) {
      if ( $(".tooltip").length >= 2 ) {
        $(".tooltip").first().tooltip('hide')
      }
      var $fa_icon_copy_elm = $(this).parent().nextAll('.fa-icon-copy').first()
        , $btn = $( this )
        , randId = Math.ceil(Math.random() * 20000);
      $btn.attr("data-clipboard-target", randId )
      $fa_icon_copy_elm.attr({ id: randId })
    })
    // =======================================
    // =======================================
  });

  
  // scroll to page section on click
  // corrects the height with the fixed slider-menu
  $( '.navbar-slider header a, .go-top, a[href^="#"]' ).not('.outlink').on('click', function( event ) {
    // Prevent button clicks from causing screen to flicker
    event.preventDefault();
    var el      = $( this ).attr( 'href' )
      , el_pos  = $( el ).offset().top
      , win_pos = $( window ).scrollTop()
      , o       = $( el ).offset().top - win_pos - $( ".thriii__landing--nav" ).innerHeight()
      , current = window.location.hash
      , el_scroll_to;

      // Fix the scroll height to accommodate
      // for the height of the navbars
      el_scroll_to = el_pos - 70;

      // Scroll smoothly to the correct element
      $( 'html, body' ).animate({
          scrollTop: el_scroll_to
        }, 800
      )
  }) //  END scroll to section on click

  $('[data-toggle="tooltip"]').tooltip({
    container: 'body'
  })

  !function ($) {
    $(function(){
      window.prettyPrint && prettyPrint()   
    })
  }(window.jQuery)

  $('body').scrollspy({
        target: '.nav-sidebar',
        offset: 140
      });

  $('#sidenav').affix({
    offset: {
      top: 460,
      bottom: function () {
        return (this.bottom = $('.footer').outerHeight(true))
      }
    }
  });

  $( ".iterm--header" ).append( 
    "<span class='iterm--window-icons' >" +
      "<span class='red'></span>"         + 
      "<span class='yellow'></span>"      +
      "<span class='green'></span>"       +
    "</span>"
  );

  (function(b){b.gritter={};b.gritter.options={position:"",class_name:"",fade_in_speed:"medium",fade_out_speed:1000,time:6000};b.gritter.add=function(f){try{return a.add(f||{})}catch(d){var c="Gritter Error: "+d;(typeof(console)!="undefined"&&console.error)?console.error(c,f):alert(c)}};b.gritter.remove=function(d,c){a.removeSpecific(d,c||{})};b.gritter.removeAll=function(c){a.stop(c||{})};var a={position:"",fade_in_speed:"",fade_out_speed:"",time:"",_custom_timer:0,_item_count:0,_is_setup:0,_tpl_close:'<div class="gritter-close"></div>',_tpl_title:'<span class="gritter-title">[[title]]</span>',_tpl_item:'<div id="gritter-item-[[number]]" class="gritter-item-wrapper [[item_class]]" style="display:none"><div class="gritter-top"></div><div class="gritter-item">[[close]][[image]]<div class="[[class_name]]">[[title]]<p>[[text]]</p></div><div style="clear:both"></div></div><div class="gritter-bottom"></div></div>',_tpl_wrap:'<div id="gritter-notice-wrapper"></div>',add:function(g){if(typeof(g)=="string"){g={text:g}}if(!g.text){throw'You must supply "text" parameter.'}if(!this._is_setup){this._runSetup()}var k=g.title,n=g.text,e=g.image||"",l=g.sticky||false,m=g.class_name||b.gritter.options.class_name,j=b.gritter.options.position,d=g.time||"";this._verifyWrapper();this._item_count++;var f=this._item_count,i=this._tpl_item;b(["before_open","after_open","before_close","after_close"]).each(function(p,q){a["_"+q+"_"+f]=(b.isFunction(g[q]))?g[q]:function(){}});this._custom_timer=0;if(d){this._custom_timer=d}var c=(e!="")?'<img src="'+e+'" class="gritter-image" />':"",h=(e!="")?"gritter-with-image":"gritter-without-image";if(k){k=this._str_replace("[[title]]",k,this._tpl_title)}else{k=""}i=this._str_replace(["[[title]]","[[text]]","[[close]]","[[image]]","[[number]]","[[class_name]]","[[item_class]]"],[k,n,this._tpl_close,c,this._item_count,h,m],i);if(this["_before_open_"+f]()===false){return false}b("#gritter-notice-wrapper").addClass(j).append(i);var o=b("#gritter-item-"+this._item_count);o.fadeIn(this.fade_in_speed,function(){a["_after_open_"+f](b(this))});if(!l){this._setFadeTimer(o,f)}b(o).bind("mouseenter mouseleave",function(p){if(p.type=="mouseenter"){if(!l){a._restoreItemIfFading(b(this),f)}}else{if(!l){a._setFadeTimer(b(this),f)}}a._hoverState(b(this),p.type)});b(o).find(".gritter-close").click(function(){a.removeSpecific(f,{},null,true)});return f},_countRemoveWrapper:function(c,d,f){d.remove();this["_after_close_"+c](d,f);if(b(".gritter-item-wrapper").length==0){b("#gritter-notice-wrapper").remove()}},_fade:function(g,d,j,f){var j=j||{},i=(typeof(j.fade)!="undefined")?j.fade:true,c=j.speed||this.fade_out_speed,h=f;this["_before_close_"+d](g,h);if(f){g.unbind("mouseenter mouseleave")}if(i){g.animate({opacity:0},c,function(){g.animate({height:0},300,function(){a._countRemoveWrapper(d,g,h)})})}else{this._countRemoveWrapper(d,g)}},_hoverState:function(d,c){if(c=="mouseenter"){d.addClass("hover");d.find(".gritter-close").show()}else{d.removeClass("hover");d.find(".gritter-close").hide()}},removeSpecific:function(c,g,f,d){if(!f){var f=b("#gritter-item-"+c)}this._fade(f,c,g||{},d)},_restoreItemIfFading:function(d,c){clearTimeout(this["_int_id_"+c]);d.stop().css({opacity:"",height:""})},_runSetup:function(){for(opt in b.gritter.options){this[opt]=b.gritter.options[opt]}this._is_setup=1},_setFadeTimer:function(f,d){var c=(this._custom_timer)?this._custom_timer:this.time;this["_int_id_"+d]=setTimeout(function(){a._fade(f,d)},c)},stop:function(e){var c=(b.isFunction(e.before_close))?e.before_close:function(){};var f=(b.isFunction(e.after_close))?e.after_close:function(){};var d=b("#gritter-notice-wrapper");c(d);d.fadeOut(function(){b(this).remove();f()})},_str_replace:function(v,e,o,n){var k=0,h=0,t="",m="",g=0,q=0,l=[].concat(v),c=[].concat(e),u=o,d=c instanceof Array,p=u instanceof Array;u=[].concat(u);if(n){this.window[n]=0}for(k=0,g=u.length;k<g;k++){if(u[k]===""){continue}for(h=0,q=l.length;h<q;h++){t=u[k]+"";m=d?(c[h]!==undefined?c[h]:""):c[0];u[k]=(t).split(l[h]).join(m);if(n&&u[k]!==t){this.window[n]+=(t.length-u[k].length)/l[h].length}}}return p?u:u[0]},_verifyWrapper:function(){if(b("#gritter-notice-wrapper").length==0){b("body").append(this._tpl_wrap)}}}})(jQuery);

  !function(){function a(b,c,d){var e=a.resolve(b);if(null==e){d=d||b,c=c||"root";var f=new Error('Failed to require "'+d+'" from "'+c+'"');throw f.path=d,f.parent=c,f.require=!0,f}var g=a.modules[e];if(!g._resolving&&!g.exports){var h={};h.exports={},h.client=h.component=!0,g._resolving=!0,g.call(this,h.exports,a.relative(e),h),delete g._resolving,g.exports=h.exports}return g.exports}a.modules={},a.aliases={},a.resolve=function(b){"/"===b.charAt(0)&&(b=b.slice(1));for(var c=[b,b+".js",b+".json",b+"/index.js",b+"/index.json"],d=0;d<c.length;d++){var b=c[d];if(a.modules.hasOwnProperty(b))return b;if(a.aliases.hasOwnProperty(b))return a.aliases[b]}},a.normalize=function(a,b){var c=[];if("."!=b.charAt(0))return b;a=a.split("/"),b=b.split("/");for(var d=0;d<b.length;++d)".."==b[d]?a.pop():"."!=b[d]&&""!=b[d]&&c.push(b[d]);return a.concat(c).join("/")},a.register=function(b,c){a.modules[b]=c},a.alias=function(b,c){if(!a.modules.hasOwnProperty(b))throw new Error('Failed to alias "'+b+'", it does not exist');a.aliases[c]=b},a.relative=function(b){function c(a,b){for(var c=a.length;c--;)if(a[c]===b)return c;return-1}function d(c){var e=d.resolve(c);return a(e,b,c)}var e=a.normalize(b,"..");return d.resolve=function(d){var f=d.charAt(0);if("/"==f)return d.slice(1);if("."==f)return a.normalize(e,d);var g=b.split("/"),h=c(g,"deps")+1;return h||(h=0),d=g.slice(0,h+1).join("/")+"/deps/"+d},d.exists=function(b){return a.modules.hasOwnProperty(d.resolve(b))},d},a.register("component-classes/index.js",function(a,b,c){function d(a){if(!a)throw new Error("A DOM element reference is required");this.el=a,this.list=a.classList}var e=b("indexof"),f=/\s+/,g=Object.prototype.toString;c.exports=function(a){return new d(a)},d.prototype.add=function(a){if(this.list)return this.list.add(a),this;var b=this.array(),c=e(b,a);return~c||b.push(a),this.el.className=b.join(" "),this},d.prototype.remove=function(a){if("[object RegExp]"==g.call(a))return this.removeMatching(a);if(this.list)return this.list.remove(a),this;var b=this.array(),c=e(b,a);return~c&&b.splice(c,1),this.el.className=b.join(" "),this},d.prototype.removeMatching=function(a){for(var b=this.array(),c=0;c<b.length;c++)a.test(b[c])&&this.remove(b[c]);return this},d.prototype.toggle=function(a,b){return this.list?("undefined"!=typeof b?b!==this.list.toggle(a,b)&&this.list.toggle(a):this.list.toggle(a),this):("undefined"!=typeof b?b?this.add(a):this.remove(a):this.has(a)?this.remove(a):this.add(a),this)},d.prototype.array=function(){var a=this.el.className.replace(/^\s+|\s+$/g,""),b=a.split(f);return""===b[0]&&b.shift(),b},d.prototype.has=d.prototype.contains=function(a){return this.list?this.list.contains(a):!!~e(this.array(),a)}}),a.register("segmentio-extend/index.js",function(a,b,c){c.exports=function(a){for(var b,c=Array.prototype.slice.call(arguments,1),d=0;b=c[d];d++)if(b)for(var e in b)a[e]=b[e];return a}}),a.register("component-indexof/index.js",function(a,b,c){c.exports=function(a,b){if(a.indexOf)return a.indexOf(b);for(var c=0;c<a.length;++c)if(a[c]===b)return c;return-1}}),a.register("component-event/index.js",function(a){var b=window.addEventListener?"addEventListener":"attachEvent",c=window.removeEventListener?"removeEventListener":"detachEvent",d="addEventListener"!==b?"on":"";a.bind=function(a,c,e,f){return a[b](d+c,e,f||!1),e},a.unbind=function(a,b,e,f){return a[c](d+b,e,f||!1),e}}),a.register("timoxley-to-array/index.js",function(a,b,c){function d(a){return"[object Array]"===Object.prototype.toString.call(a)}c.exports=function(a){if("undefined"==typeof a)return[];if(null===a)return[null];if(a===window)return[window];if("string"==typeof a)return[a];if(d(a))return a;if("number"!=typeof a.length)return[a];if("function"==typeof a&&a instanceof Function)return[a];for(var b=[],c=0;c<a.length;c++)(Object.prototype.hasOwnProperty.call(a,c)||c in a)&&b.push(a[c]);return b.length?b:[]}}),a.register("javve-events/index.js",function(a,b){var c=b("event"),d=b("to-array");a.bind=function(a,b,e,f){a=d(a);for(var g=0;g<a.length;g++)c.bind(a[g],b,e,f)},a.unbind=function(a,b,e,f){a=d(a);for(var g=0;g<a.length;g++)c.unbind(a[g],b,e,f)}}),a.register("javve-get-by-class/index.js",function(a,b,c){c.exports=function(){return document.getElementsByClassName?function(a,b,c){return c?a.getElementsByClassName(b)[0]:a.getElementsByClassName(b)}:document.querySelector?function(a,b,c){return b="."+b,c?a.querySelector(b):a.querySelectorAll(b)}:function(a,b,c){var d=[],e="*";null==a&&(a=document);for(var f=a.getElementsByTagName(e),g=f.length,h=new RegExp("(^|\\s)"+b+"(\\s|$)"),i=0,j=0;g>i;i++)if(h.test(f[i].className)){if(c)return f[i];d[j]=f[i],j++}return d}}()}),a.register("javve-get-attribute/index.js",function(a,b,c){c.exports=function(a,b){var c=a.getAttribute&&a.getAttribute(b)||null;if(!c)for(var d=a.attributes,e=d.length,f=0;e>f;f++)void 0!==b[f]&&b[f].nodeName===b&&(c=b[f].nodeValue);return c}}),a.register("javve-natural-sort/index.js",function(a,b,c){c.exports=function(a,b,c){var d,e,f=/(^-?[0-9]+(\.?[0-9]*)[df]?e?[0-9]?$|^0x[0-9a-f]+$|[0-9]+)/gi,g=/(^[ ]*|[ ]*$)/g,h=/(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/,i=/^0x[0-9a-f]+$/i,j=/^0/,c=c||{},k=function(a){return c.insensitive&&(""+a).toLowerCase()||""+a},l=k(a).replace(g,"")||"",m=k(b).replace(g,"")||"",n=l.replace(f,"\x00$1\x00").replace(/\0$/,"").replace(/^\0/,"").split("\x00"),o=m.replace(f,"\x00$1\x00").replace(/\0$/,"").replace(/^\0/,"").split("\x00"),p=parseInt(l.match(i))||1!=n.length&&l.match(h)&&Date.parse(l),q=parseInt(m.match(i))||p&&m.match(h)&&Date.parse(m)||null,r=c.desc?-1:1;if(q){if(q>p)return-1*r;if(p>q)return 1*r}for(var s=0,t=Math.max(n.length,o.length);t>s;s++){if(d=!(n[s]||"").match(j)&&parseFloat(n[s])||n[s]||0,e=!(o[s]||"").match(j)&&parseFloat(o[s])||o[s]||0,isNaN(d)!==isNaN(e))return isNaN(d)?1:-1;if(typeof d!=typeof e&&(d+="",e+=""),e>d)return-1*r;if(d>e)return 1*r}return 0}}),a.register("javve-to-string/index.js",function(a,b,c){c.exports=function(a){return a=void 0===a?"":a,a=null===a?"":a,a=a.toString()}}),a.register("component-type/index.js",function(a,b,c){var d=Object.prototype.toString;c.exports=function(a){switch(d.call(a)){case"[object Date]":return"date";case"[object RegExp]":return"regexp";case"[object Arguments]":return"arguments";case"[object Array]":return"array";case"[object Error]":return"error"}return null===a?"null":void 0===a?"undefined":a!==a?"nan":a&&1===a.nodeType?"element":typeof a.valueOf()}}),a.register("list.js/index.js",function(a,b,c){!function(a,d){"use strict";var e=a.document,f=b("get-by-class"),g=b("extend"),h=b("indexof"),i=function(a,c,j){var k,l=this,m=b("./src/item")(l),n=b("./src/add-async")(l),o=b("./src/parse")(l);k={start:function(){l.listClass="list",l.searchClass="search",l.sortClass="sort",l.page=200,l.i=1,l.items=[],l.visibleItems=[],l.matchingItems=[],l.searched=!1,l.filtered=!1,l.handlers={updated:[]},l.plugins={},l.helpers={getByClass:f,extend:g,indexOf:h},g(l,c),l.listContainer="string"==typeof a?e.getElementById(a):a,l.listContainer&&(l.list=f(l.listContainer,l.listClass,!0),l.templater=b("./src/templater")(l),l.search=b("./src/search")(l),l.filter=b("./src/filter")(l),l.sort=b("./src/sort")(l),this.items(),l.update(),this.plugins())},items:function(){o(l.list),j!==d&&l.add(j)},plugins:function(){for(var a=0;a<l.plugins.length;a++){var b=l.plugins[a];l[b.name]=b,b.init(l,i)}}},this.add=function(a,b){if(b)return n(a,b),void 0;var c=[],e=!1;a[0]===d&&(a=[a]);for(var f=0,g=a.length;g>f;f++){var h=null;a[f]instanceof m?(h=a[f],h.reload()):(e=l.items.length>l.page?!0:!1,h=new m(a[f],d,e)),l.items.push(h),c.push(h)}return l.update(),c},this.show=function(a,b){return this.i=a,this.page=b,l.update(),l},this.remove=function(a,b,c){for(var d=0,e=0,f=l.items.length;f>e;e++)l.items[e].values()[a]==b&&(l.templater.remove(l.items[e],c),l.items.splice(e,1),f--,e--,d++);return l.update(),d},this.get=function(a,b){for(var c=[],d=0,e=l.items.length;e>d;d++){var f=l.items[d];f.values()[a]==b&&c.push(f)}return c},this.size=function(){return l.items.length},this.clear=function(){return l.templater.clear(),l.items=[],l},this.on=function(a,b){return l.handlers[a].push(b),l},this.off=function(a,b){var c=l.handlers[a],d=h(c,b);return d>-1&&c.splice(d,1),l},this.trigger=function(a){for(var b=l.handlers[a].length;b--;)l.handlers[a][b](l);return l},this.reset={filter:function(){for(var a=l.items,b=a.length;b--;)a[b].filtered=!1;return l},search:function(){for(var a=l.items,b=a.length;b--;)a[b].found=!1;return l}},this.update=function(){var a=l.items,b=a.length;l.visibleItems=[],l.matchingItems=[],l.templater.clear();for(var c=0;b>c;c++)a[c].matching()&&l.matchingItems.length+1>=l.i&&l.visibleItems.length<l.page?(a[c].show(),l.visibleItems.push(a[c]),l.matchingItems.push(a[c])):a[c].matching()?(l.matchingItems.push(a[c]),a[c].hide()):a[c].hide();return l.trigger("updated"),l},k.start()};c.exports=i}(window)}),a.register("list.js/src/search.js",function(a,b,c){var d=b("events"),e=b("get-by-class"),f=b("to-string");c.exports=function(a){var b,c,g,h,i={resetList:function(){a.i=1,a.templater.clear(),h=void 0},setOptions:function(a){2==a.length&&a[1]instanceof Array?c=a[1]:2==a.length&&"function"==typeof a[1]?h=a[1]:3==a.length&&(c=a[1],h=a[2])},setColumns:function(){c=void 0===c?i.toArray(a.items[0].values()):c},setSearchString:function(a){a=f(a).toLowerCase(),a=a.replace(/[-[\]{}()*+?.,\\^$|#]/g,"\\$&"),g=a},toArray:function(a){var b=[];for(var c in a)b.push(c);return b}},j={list:function(){for(var b=0,c=a.items.length;c>b;b++)j.item(a.items[b])},item:function(a){a.found=!1;for(var b=0,d=c.length;d>b;b++)if(j.values(a.values(),c[b]))return a.found=!0,void 0},values:function(a,c){return a.hasOwnProperty(c)&&(b=f(a[c]).toLowerCase(),""!==g&&b.search(g)>-1)?!0:!1},reset:function(){a.reset.search(),a.searched=!1}},k=function(b){return a.trigger("searchStart"),i.resetList(),i.setSearchString(b),i.setOptions(arguments),i.setColumns(),""===g?j.reset():(a.searched=!0,h?h(g,c):j.list()),a.update(),a.trigger("searchComplete"),a.visibleItems};return a.handlers.searchStart=a.handlers.searchStart||[],a.handlers.searchComplete=a.handlers.searchComplete||[],d.bind(e(a.listContainer,a.searchClass),"keyup",function(b){var c=b.target||b.srcElement,d=""===c.value&&!a.searched;d||k(c.value)}),d.bind(e(a.listContainer,a.searchClass),"input",function(a){var b=a.target||a.srcElement;""===b.value&&k("")}),a.helpers.toString=f,k}}),a.register("list.js/src/sort.js",function(a,b,c){var d=b("natural-sort"),e=b("classes"),f=b("events"),g=b("get-by-class"),h=b("get-attribute");c.exports=function(a){a.sortFunction=a.sortFunction||function(a,b,c){return c.desc="desc"==c.order?!0:!1,d(a.values()[c.valueName],b.values()[c.valueName],c)};var b={els:void 0,clear:function(){for(var a=0,c=b.els.length;c>a;a++)e(b.els[a]).remove("asc"),e(b.els[a]).remove("desc")},getOrder:function(a){var b=h(a,"data-order");return"asc"==b||"desc"==b?b:e(a).has("desc")?"asc":e(a).has("asc")?"desc":"asc"},getInSensitive:function(a,b){var c=h(a,"data-insensitive");b.insensitive="true"===c?!0:!1},setOrder:function(a){for(var c=0,d=b.els.length;d>c;c++){var f=b.els[c];if(h(f,"data-sort")===a.valueName){var g=h(f,"data-order");"asc"==g||"desc"==g?g==a.order&&e(f).add(a.order):e(f).add(a.order)}}}},c=function(){a.trigger("sortStart"),options={};var c=arguments[0].currentTarget||arguments[0].srcElement||void 0;c?(options.valueName=h(c,"data-sort"),b.getInSensitive(c,options),options.order=b.getOrder(c)):(options=arguments[1]||options,options.valueName=arguments[0],options.order=options.order||"asc",options.insensitive="undefined"==typeof options.insensitive?!0:options.insensitive),b.clear(),b.setOrder(options),options.sortFunction=options.sortFunction||a.sortFunction,a.items.sort(function(a,b){return options.sortFunction(a,b,options)}),a.update(),a.trigger("sortComplete")};return a.handlers.sortStart=a.handlers.sortStart||[],a.handlers.sortComplete=a.handlers.sortComplete||[],b.els=g(a.listContainer,a.sortClass),f.bind(b.els,"click",c),a.on("searchStart",b.clear),a.on("filterStart",b.clear),a.helpers.classes=e,a.helpers.naturalSort=d,a.helpers.events=f,a.helpers.getAttribute=h,c}}),a.register("list.js/src/item.js",function(a,b,c){c.exports=function(a){return function(b,c,d){var e=this;this._values={},this.found=!1,this.filtered=!1;var f=function(b,c,d){if(void 0===c)d?e.values(b,d):e.values(b);else{e.elm=c;var f=a.templater.get(e,b);e.values(f)}};this.values=function(b,c){if(void 0===b)return e._values;for(var d in b)e._values[d]=b[d];c!==!0&&a.templater.set(e,e.values())},this.show=function(){a.templater.show(e)},this.hide=function(){a.templater.hide(e)},this.matching=function(){return a.filtered&&a.searched&&e.found&&e.filtered||a.filtered&&!a.searched&&e.filtered||!a.filtered&&a.searched&&e.found||!a.filtered&&!a.searched},this.visible=function(){return e.elm.parentNode==a.list?!0:!1},f(b,c,d)}}}),a.register("list.js/src/templater.js",function(a,b,c){var d=b("get-by-class"),e=function(a){function b(b){if(void 0===b){for(var c=a.list.childNodes,d=0,e=c.length;e>d;d++)if(void 0===c[d].data)return c[d];return null}if(-1!==b.indexOf("<")){var f=document.createElement("div");return f.innerHTML=b,f.firstChild}return document.getElementById(a.item)}var c=b(a.item),e=this;this.get=function(a,b){e.create(a);for(var c={},f=0,g=b.length;g>f;f++){var h=d(a.elm,b[f],!0);c[b[f]]=h?h.innerHTML:""}return c},this.set=function(a,b){if(!e.create(a))for(var c in b)if(b.hasOwnProperty(c)){var f=d(a.elm,c,!0);f&&("IMG"===f.tagName&&""!==b[c]?f.src=b[c]:f.innerHTML=b[c])}},this.create=function(a){if(void 0!==a.elm)return!1;var b=c.cloneNode(!0);return b.removeAttribute("id"),a.elm=b,e.set(a,a.values()),!0},this.remove=function(b){a.list.removeChild(b.elm)},this.show=function(b){e.create(b),a.list.appendChild(b.elm)},this.hide=function(b){void 0!==b.elm&&b.elm.parentNode===a.list&&a.list.removeChild(b.elm)},this.clear=function(){if(a.list.hasChildNodes())for(;a.list.childNodes.length>=1;)a.list.removeChild(a.list.firstChild)}};c.exports=function(a){return new e(a)}}),a.register("list.js/src/filter.js",function(a,b,c){c.exports=function(a){return a.handlers.filterStart=a.handlers.filterStart||[],a.handlers.filterComplete=a.handlers.filterComplete||[],function(b){if(a.trigger("filterStart"),a.i=1,a.reset.filter(),void 0===b)a.filtered=!1;else{a.filtered=!0;for(var c=a.items,d=0,e=c.length;e>d;d++){var f=c[d];f.filtered=b(f)?!0:!1}}return a.update(),a.trigger("filterComplete"),a.visibleItems}}}),a.register("list.js/src/add-async.js",function(a,b,c){c.exports=function(a){return function(b,c,d){var e=b.splice(0,100);d=d||[],d=d.concat(a.add(e)),b.length>0?setTimeout(function(){addAsync(b,c,d)},10):(a.update(),c(d))}}}),a.register("list.js/src/parse.js",function(a,b,c){c.exports=function(a){var c=b("./item")(a),d=function(a){for(var b=a.childNodes,c=[],d=0,e=b.length;e>d;d++)void 0===b[d].data&&c.push(b[d]);return c},e=function(b,d){for(var e=0,f=b.length;f>e;e++)a.items.push(new c(d,b[e]))},f=function(b,c){var d=b.splice(0,100);e(d,c),b.length>0?setTimeout(function(){init.items.indexAsync(b,c)},10):a.update()};return function(){var b=d(a.list),c=a.valueNames;a.indexAsync?f(b,c):e(b,c)}}}),a.alias("component-classes/index.js","list.js/deps/classes/index.js"),a.alias("component-classes/index.js","classes/index.js"),a.alias("component-indexof/index.js","component-classes/deps/indexof/index.js"),a.alias("segmentio-extend/index.js","list.js/deps/extend/index.js"),a.alias("segmentio-extend/index.js","extend/index.js"),a.alias("component-indexof/index.js","list.js/deps/indexof/index.js"),a.alias("component-indexof/index.js","indexof/index.js"),a.alias("javve-events/index.js","list.js/deps/events/index.js"),a.alias("javve-events/index.js","events/index.js"),a.alias("component-event/index.js","javve-events/deps/event/index.js"),a.alias("timoxley-to-array/index.js","javve-events/deps/to-array/index.js"),a.alias("javve-get-by-class/index.js","list.js/deps/get-by-class/index.js"),a.alias("javve-get-by-class/index.js","get-by-class/index.js"),a.alias("javve-get-attribute/index.js","list.js/deps/get-attribute/index.js"),a.alias("javve-get-attribute/index.js","get-attribute/index.js"),a.alias("javve-natural-sort/index.js","list.js/deps/natural-sort/index.js"),a.alias("javve-natural-sort/index.js","natural-sort/index.js"),a.alias("javve-to-string/index.js","list.js/deps/to-string/index.js"),a.alias("javve-to-string/index.js","list.js/deps/to-string/index.js"),a.alias("javve-to-string/index.js","to-string/index.js"),a.alias("javve-to-string/index.js","javve-to-string/index.js"),a.alias("component-type/index.js","list.js/deps/type/index.js"),a.alias("component-type/index.js","type/index.js"),"object"==typeof exports?module.exports=a("list.js"):"function"==typeof define&&define.amd?define(function(){return a("list.js")}):this.List=a("list.js")}();
  var options = {
    valueNames: [ 'icon-copy' ]
  };

  var userList = new List('bs-icons', options);

  var options = {
    valueNames: [ 'icon-name' ]
  };

  var userList = new List('icons', options);

  // Add popover info to glyphicons on mouseover
  $( ".glyphicons-list li" ).on("mouseenter", function (){
    var $target = $(this)
      , child   = $target[0].childNodes[1].className;

    $target.addClass("icon-popover");

    $target.attr({
      "no-select":            "",
      "data-toggle":          "popover",
      "data-html":            "true",
      "data-trigger":         "click",
      "title":                "",
      "data-placement":       "top",
      "data-container":        "body",
      "data-content":         "<span class=\"icon " + child + "\"></span> &lt;span class=\"" + child + "\"&gt;&lt;/span&gt;",
      "data-template":        '<div class="glyphicon-popover popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    })

    $('.icon-popover').popover()
    
    if ( $('.popover').length > 1 ) {
      $('.popover').not($('.popover').last()).popover('hide')
    } else {
      $($target).on("mouseleave", function (e) {
        e.stopPropagation();
        $('.icon-popover').popover('hide');
      })
    }
  }) // End popovers


  function setStyle(data) {
    var selectedEffect
      , $dropdown = $( ".dropdown-menu" )
      , $js_code  = $( ".js-dropdown-code span" );
   
    // Set default
    if ( data == "default" ) {
      selectedEffect = "dropdown-menu"
    } else {
      selectedEffect = "dropdown-menu " + data
    }

    // run the effect
    $dropdown.removeClass().addClass( selectedEffect );
    $js_code.text( selectedEffect );
  };

  // set style
  $( ".style-row .btn" ).click(function() {
    var data = $.trim(this.childNodes[2].data.toLowerCase());
    setStyle(data);
  });

}( jQuery );

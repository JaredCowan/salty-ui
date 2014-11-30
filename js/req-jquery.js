if (typeof jQuery === 'undefined') {
  throw new Error('Salty-ui\'s JavaScript requires jQuery')
}
+function ($) {
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1)) {
    throw new Error('Salty-ui\'s JavaScript requires jQuery version 1.9.1 or higher')
  }
}(jQuery);
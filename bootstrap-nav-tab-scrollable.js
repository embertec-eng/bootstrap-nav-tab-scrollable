// Add Horizontal Tabs to jquery
(function ($){

  $.fn.horizontalTabs = function() {
    // Variable creation
    var $elem = $(this),
    widthOfReducedList = $elem.find('.nav-tabs-horizontal, .nav-pills').width(),
    widthOfList = 0,
    currentPos = 0,
    scrollerWidth = 0,
    adjustScroll = function () {
      widthOfList = 0;
      currentPos = $elem.find('.nav-tabs-horizontal, .nav-pills').scrollLeft();
      $elem.find('.nav-tabs-horizontal li, .nav-pills li').each(function(index, item) {
        widthOfList += $(item).outerWidth(true);
      });

      widthAvailable = $elem.width();

      if (widthOfList > widthAvailable) {
        $elem.find('.scroller').show();
        updateArrowStyle(currentPos);
      } else {
        $elem.find('.scroller').hide();
      }
      scrollerWidth = $elem.find('.scroller').outerWidth(true);
      widthOfReducedList = $elem.find('.nav-tabs-horizontal, .nav-pills').width();
    },
    scrollLeft = function () {
      $elem.find('.nav-tabs-horizontal, .nav-pills').animate({
          scrollLeft: currentPos - widthOfReducedList
      }, 500);
      
      if (currentPos - widthOfReducedList > 0) {
        currentPos -= widthOfReducedList;    
      } else {
        currentPos = 0;
      }
    },
    scrollRight = function () {
      $elem.find('.nav-tabs-horizontal, .nav-pills').animate({
          scrollLeft: currentPos + widthOfReducedList
      }, 500);

      if ( (currentPos + widthOfReducedList) < (widthOfList - widthOfReducedList)) {
        currentPos += widthOfReducedList;
      } else {
        currentPos = (widthOfList - widthOfReducedList);
      }
    },
    manualScroll = function () {
      currentPos = $elem.find('.nav-tabs-horizontal, .nav-pills').scrollLeft();
      
      updateArrowStyle(currentPos);
    },
    updateArrowStyle = function (position) {
      if (position >= (widthOfList - widthOfReducedList)) {
        $elem.find('.arrow-right').addClass('disabled');
      } else {
        $elem.find('.arrow-right').removeClass('disabled');
      };

      if (position <= 0) {
        $elem.find('.arrow-left').addClass('disabled');
      } else {
        $elem.find('.arrow-left').removeClass('disabled');
      };
    };

    // Event binding
    $(window).resize( function () {
      adjustScroll();
    });

    $elem.find('.arrow-left').on('click.horizontalTabs', function (){
      scrollLeft();
    });

    $elem.find('.arrow-right').on('click.horizontalTabs', function (){
      scrollRight();
    });

    $elem.find('.nav-tabs-horizontal, .nav-pills').scroll( function (){
      manualScroll();
    });

    $elem.find('.nav-tabs-horizontal, .nav-pills').on('shown.bs.tab', function (ev){
      var itemWidth = $(ev.target).parent().outerWidth(true);
      var rect = $(ev.target).parent().position();
      rect.left -= (itemWidth - $(ev.target).parent().innerWidth()) / 2;

      var diff = 0;
      if (rect.left < 0) {
        // Left edge of the item is hidden
        diff = rect.left - scrollerWidth;
      } else if (rect.left + itemWidth > widthOfReducedList) {
        // Right edge of the item is hidden
        diff = rect.left + itemWidth - widthOfReducedList + 5;
      }
            
      currentPos = $elem.find('.nav-tabs-horizontal, .nav-pills').scrollLeft() + diff;
      $elem.find('.nav-tabs-horizontal, .nav-pills').animate({
        scrollLeft: currentPos
      }, 500);
    });

    // Initial Call
    adjustScroll();

    this.adjustScroll = adjustScroll;
    return this;
  }

}(window.jQuery));

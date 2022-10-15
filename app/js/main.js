
$(function () {
  // Iterate over each select element
  $('select').each(function () {

    // Cache the number of options
    var $this = $(this),
      numberOfOptions = $(this).children('option').length;

    // Hides the select element
    $this.addClass('s-hidden');

    // Wrap the select element in a div
    $this.wrap('<div class="select"></div>');

    // Insert a styled div to sit over the top of the hidden select element
    $this.after('<div class="styledSelect"></div>');

    // Cache the styled div
    var $styledSelect = $this.next('div.styledSelect');

    // Show the first select option in the styled div
    $styledSelect.text($this.children('option').eq(0).text());

    // Insert an unordered list after the styled div and also cache the list
    var $list = $('<ul />', {
      'class': 'options'
    }).insertAfter($styledSelect);

    // Insert a list item into the unordered list for each select option
    for (var i = 0; i < numberOfOptions; i++) {
      $('<li />', {
        text: $this.children('option').eq(i).text(),
        rel: $this.children('option').eq(i).val()
      }).appendTo($list);
    }

    // Cache the list items
    var $listItems = $list.children('li');

    // Show the unordered list when the styled div is clicked (also hides it if the div is clicked again)
    $styledSelect.click(function (e) {
      e.stopPropagation();
      $('div.styledSelect.active').each(function () {
        $(this).removeClass('active').next('ul.options').hide();
      });
      $(this).toggleClass('active').next('ul.options').toggle();
    });

    // Hides the unordered list when a list item is clicked and updates the styled div to show the selected list item
    // Updates the select element to have the value of the equivalent option
    $listItems.click(function (e) {
      e.stopPropagation();
      $styledSelect.text($(this).text()).removeClass('active');

      $this.val($(this).attr('rel'));
      $list.hide();
      /* alert($this.val()); Uncomment this for demonstration! */
    });

    // Hides the unordered list when clicking outside of it
    $(document).click(function () {
      $styledSelect.removeClass('active');
      $list.hide();
    });

  });

  $('.shop-content__filter-btn').on('click', function () {
    $('.shop-content__filter-btn').removeClass('shop-content__filter-btn--active');
    $(this).addClass('shop-content__filter-btn--active');
  })
  $('.button-list').on('click', function(){
    $('.product-item').addClass('product-item--list');
    $('.shop-content__inner').removeClass('shop-content__inner--border');
  })
  $('.button-grid').on('click', function(){
    $('.product-item').removeClass('product-item--list');
    $('.shop-content__inner').addClass('shop-content__inner--border');
  })
  jQuery.event.special.touchstart = {
    setup: function (_, ns, handle) {
      if (ns.includes("noPreventDefault")) {
        this.addEventListener("touchstart", handle, { passive: false });
      } else {
        this.addEventListener("touchstart", handle, { passive: true });
      }
    }
  };
  $(".filter-price__input").ionRangeSlider({
    type: "double",
    min: 0,
    max: 999,
    from: 200,
    to: 800,
    prefix: "$",
    hide_from_to: true,
    hide_min_max: true,
    onStart: function (data) {
      $('.filter-price__from').text('$' + data.from)
      $('.filter-price__to').text('$' + data.to)
    },
    onChange: function (data) {
      $('.filter-price__from').text('$' + data.from)
      $('.filter-price__to').text('$' + data.to)
    },

  }
  );

  $('.top-slider__inner').slick({
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear',
    autoplay: true,
    autoplaySpeed: 2000,
  })
  $(".video-fashion__path").bind("webkitAnimationEnd mozAnimationEnd animationend", function () {
    $(this).removeClass("animated")
  })
  $(".video-fashion__svg").hover(function () {
    $(".video-fashion__path").addClass("animated");
  })

  $(".star").rateYo({
    starWidth: "17px",
    ratedFill: "#ffc35b",
    normalFill: "#ccccce",
    readOnly: true
  });

  function getTimeRemaining(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return {
      total,
      days,
      hours,
      minutes,
      seconds
    };
  }

  function initializeClock(className, endtime) {
    const clockVar = document.getElementsByClassName(className);
    var clock = clockVar[0];
    const daysSpan = clock.querySelector('.promo__days');
    const hoursSpan = clock.querySelector('.promo__hours');
    const minutesSpan = clock.querySelector('.promo__minutes');
    const secondsSpan = clock.querySelector('.promo__seconds');

    function updateClock() {
      const t = getTimeRemaining(endtime);

      daysSpan.innerHTML = t.days;
      hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
      minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
      secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

      if (t.total <= 0) {
        clearInterval(timeinterval);
      }
    }

    updateClock();
    const timeinterval = setInterval(updateClock, 1000);
  }

  const deadline = $('.promo__clock').attr('data-time')
  initializeClock('promo__clock', deadline);


});
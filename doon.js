/**
 * Do On - Super light weight event driven containers.
 *
 * @version 1.0.2
 * @author Christian Blanquera <cblanquera@openovate.com>
 * @website https://github.com/cblanquera/doon
 * @license MIT
 */
jQuery.fn.extend({
  doon: function() {
    return this.each(function() {
      jQuery('*[data-do]', this).add(this)
      .each(function() {
        var trigger = jQuery(this);

        var actions = trigger.attr('data-do');

        if(!actions || trigger.data('doon')) {
          return;
        }

        actions = actions.split('|');
        trigger.data('doon', true);

        var event = trigger.attr('data-on');

        var target = this;
        if (trigger.data('doon-target')) {
          target = jQuery(trigger.data('doon-target'));
        }

        //trigger init
        actions.forEach(function(action) {
          jQuery(window).trigger(action+'-init', [target]);
        });

        if(!event) {
          return;
        }

        jQuery.each(event.split('|'), function(i, event) {
          jQuery(target).on(event, function(e) {
            actions.some(function(action) {
              //mod the custom event type
              e.type = action + '-' + event;
              //pass it along
              jQuery(window).trigger(e, [target]);

              return e.return === false
            });

            //so you can stop a form
            if (e.return === false) {
              return false;
            }
          });
        });
      });
    });
  }
});

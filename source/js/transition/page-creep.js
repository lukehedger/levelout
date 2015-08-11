'use strict';

import Tween from 'component-tween';
import raf from 'component-raf';

const DEFAULTS = {
	duration: 500,
  y: 10
};

function pageCreep(t, params) {

  var id, tween, target;

  params = t.processParams(params, DEFAULTS);

  if (t.isIntro) {

    // intro
    tween = Tween({ y: params.y, opacity: 0 });
    target = { y: 0, opacity: 1 };

  } else {

    // outro
    tween = Tween({ y: 0, opacity: 1 });
    target = { y: params.y, opacity: 0 };

  }

  tween.ease('in-out-quart').duration(params.duration).to(target);

  tween.update(function(o) {

    var transform = 'translateY(' + o.y + '%)';

	  t.setStyle('opacity', o.opacity);
	  t.setStyle('transform', transform);

	});

	tween.on('end', function() {

		raf.cancel(id);
	  animate = null;
		t.complete();

	});

	function animate() {

	  id = raf(animate);
	  tween.update();

	}

	animate();

}

module.exports = pageCreep;

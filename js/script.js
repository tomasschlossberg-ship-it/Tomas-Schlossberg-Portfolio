// ==========================================================================
// TOMÁS SCHLOSSBERG — shared site behavior
// ==========================================================================

// Everything that needs to (re)run whenever the page's markup is in place —
// including after the PJAX-style swap at the bottom of a project gallery,
// which replaces the page content without a real navigation.
function hossInit(){
  // Footer year
  document.querySelectorAll('#year').forEach(function(el){
    el.textContent = new Date().getFullYear();
  });

  // Nav: solid background after scrolling past the hero
  var nav = document.getElementById('nav');
  function onScroll(){
    if(!nav) return;
    if(window.scrollY > 40){ nav.classList.add('is-scrolled'); }
    else{ nav.classList.remove('is-scrolled'); }
  }
  window.addEventListener('scroll', onScroll, { passive:true });
  onScroll();

  // Mobile nav toggle
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  if(navToggle && navLinks){
    navToggle.addEventListener('click', function(){
      navToggle.classList.toggle('is-open');
      navLinks.classList.toggle('is-open');
    });
    navLinks.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        navToggle.classList.remove('is-open');
        navLinks.classList.remove('is-open');
      });
    });
  }

  // Contact form: placeholder submit handling.
  // Replace this with a real endpoint (Formspree, Resend, your own API route, etc.)
  // See README.md for setup instructions.
  var contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', function(e){
      e.preventDefault();
      var note = document.getElementById('formNote');
      if(note){
        note.textContent = "Thanks — this form doesn't send real emails yet. Connect it following README.md.";
      }
    });
  }

  // Home hero slideshow: cycles through .hero-slide elements automatically.
  // Add or remove slides freely in the HTML — this reads whatever is there.
  var heroSlides = document.querySelectorAll('#heroSlides .hero-slide');
  if(heroSlides.length > 1){
    var currentSlide = 0;
    setInterval(function(){
      heroSlides[currentSlide].classList.remove('is-active');
      currentSlide = (currentSlide + 1) % heroSlides.length;
      heroSlides[currentSlide].classList.add('is-active');
    }, 5000);
  }
}

hossInit();

// Single-project gallery page (proyecto.html?slug=...).
// Reads the project from projects-data.js and builds the page.
// See js/projects-data.js to add/edit projects — nothing here needs editing.
var galleryEl = document.getElementById('projectGallery');
if(galleryEl && window.TOMAS_PROJECTS){
  var slug = new URLSearchParams(window.location.search).get('slug');
  var project = window.TOMAS_PROJECTS.find(function(p){ return p.slug === slug; });

  var nameEl = document.getElementById('projectName');
  var metaEl = document.getElementById('projectMeta');
  var titleEl = document.getElementById('pageTitle');

  if(project){
    if(titleEl) titleEl.textContent = project.name + ' — Tomás Schlossberg';
    if(nameEl) nameEl.textContent = project.name;
    if(metaEl){
      metaEl.textContent = project.location || '';
    }

    // Optional vertical video, above the gallery grid.
    var videoEl = document.getElementById('projectVideo');
    if(videoEl){
      if(project.video){
        videoEl.innerHTML = '<video src="' + project.video + '" playsinline autoplay muted loop preload="auto"></video>';
      } else {
        videoEl.innerHTML = '';
      }
    }

    // Gallery: real photos if supplied, otherwise placeholder tiles
    // based on the "images" count, or a "pending" note if the project
    // has no photos yet at all. Some projects use a "stacked" layout —
    // full-width, natural size, no cropping — instead of the default
    // grid (see js/projects-data.js).
    var html = '';
    if(project.galleryLayout === 'stacked' && project.gallery && project.gallery.length){
      galleryEl.className = 'project-gallery-stacked';
      var imgs = project.gallery;
      var i = 0;
      while(i < imgs.length){
        if(project.pairAt && (i + 1) === project.pairAt && imgs[i + 1]){
          html += '<div class="gallery-pair">' +
            '<img src="' + imgs[i] + '" alt="' + project.name + '">' +
            '<img src="' + imgs[i + 1] + '" alt="' + project.name + '">' +
            '</div>';
          i += 2;
        } else {
          html += '<div class="gallery-full"><img src="' + imgs[i] + '" alt="' + project.name + '"></div>';
          i += 1;
        }
      }
    } else if(project.gallery && project.gallery.length){
      project.gallery.forEach(function(src){
        html += '<div><img src="' + src + '" alt="' + project.name + '"></div>';
      });
    } else if(project.pending){
      html = '<p style="grid-column:1/-1; text-align:center; padding:80px 0; color:var(--ink-soft); font-size:15px;">Images for this project are pending.</p>';
    } else {
      for(var j = 1; j <= (project.images || 0); j++){
        html += '<div><div class="ph"><span class="ph-label">Image ' + j + ' — replace</span></div></div>';
      }
    }
    galleryEl.innerHTML = html;
  } else {
    if(nameEl) nameEl.textContent = 'Project not found';
    if(metaEl) metaEl.textContent = '';
  }

  // Scrolling past the end of the gallery takes you to this project's
  // category page. Instead of a normal browser navigation (which always
  // has a hard flash, no matter how the trigger is timed), the category
  // page is fetched in the background as soon as this page loads, so by
  // the time you reach the bottom there's no network wait — the swap is
  // just a quick, contained crossfade rather than a full reload.
  //
  // Note: this fetch requires the site to be served over http/https
  // (e.g. on Vercel) — it won't work if you open the .html file directly
  // from disk. Regular link clicks (nav, footer, etc.) are untouched and
  // always work normally either way.
  if(project){
    var categoryUrl = project.categoryPage;
    var prefetchPromise = fetch(categoryUrl).then(function(res){
      return res.ok ? res.text() : null;
    }).catch(function(){ return null; });

    var navigated = false;
    var TRIGGER_MARGIN = 4; // px before the true bottom — only fires once you've actually reached the end
    var checkScrollEnd = function(){
      if(navigated) return;
      var scrolledNearBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - TRIGGER_MARGIN);
      if(scrolledNearBottom){
        navigated = true;
        window.removeEventListener('scroll', checkScrollEnd);
        prefetchPromise.then(function(html){
          if(html){
            swapToCategory(html, categoryUrl);
          } else {
            window.location.href = categoryUrl; // fallback if the fetch failed
          }
        });
      }
    };
    window.addEventListener('scroll', checkScrollEnd, { passive: true });
  }
}

// Swaps the current page's content for an already-fetched page's content,
// with a quick crossfade — no network wait, no white flash.
function swapToCategory(html, url){
  var doc = new DOMParser().parseFromString(html, 'text/html');
  document.body.style.transition = 'opacity .22s ease';
  document.body.style.opacity = '0';
  setTimeout(function(){
    document.title = doc.title;
    document.body.innerHTML = doc.body.innerHTML;
    document.body.style.opacity = '0';
    window.scrollTo(0, 0);
    history.pushState({}, '', url);
    requestAnimationFrame(function(){
      requestAnimationFrame(function(){
        document.body.style.transition = 'opacity .22s ease';
        document.body.style.opacity = '1';
      });
    });
    hossInit();
  }, 220);
}

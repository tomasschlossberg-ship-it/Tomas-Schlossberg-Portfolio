// ==========================================================================
// TOMÁS SCHLOSSBERG — project data
//
// This is the ONLY place you need to edit to add, remove, or update a
// project. Each entry becomes one row on its category page, and one
// gallery page (proyecto.html?slug=...).
//
// Fields:
//   slug         unique id used in the URL, e.g. proyecto.html?slug=paris-5
//   category     "Residential" | "Commercial" | "Hospitality"
//   categoryPage the HTML file for that category's list
//   name         project name shown on the page (and, for overlay-style
//                covers, the big title on the image)
//   location     optional — shown under the name (as the subtitle on
//                overlay-style covers, and next to the category on the
//                gallery page)
//   year         shown next to the name — fill in the real year, "TBD" for now
//
//   Photos — three ways to supply them:
//
//   A) You HAVE real photos, want a plain cover tile:
//      cover    path to the cover image
//      gallery  array of image paths for the gallery grid
//
//   B) You HAVE real photos, want the Paris-5-style cover with the
//      name/location overlaid in white on the image itself:
//      cover, gallery — same as above, PLUS:
//      overlayCover: true
//
//   C) You DON'T have photos yet:
//      pending: true            — cover shows "Pending images"
//      underConstruction: true  — cover shows "Project under construction"
//      (use one or the other, not both; omit cover/gallery/images)
//      images   optional — how many placeholder tiles the gallery page
//               shows if you DO want placeholders instead of a pending note
//
// To add a project: copy one block below, change the values, done —
// it will automatically appear on its category page and get its own
// gallery. To add a whole new category, also copy one of the
// proyectos-*.html files and add a link to it from proyectos.html.
// ==========================================================================

window.TOMAS_PROJECTS = [
  {
    slug: 'pilar-casa-el-arroyo',
    category: 'Residential',
    categoryPage: 'proyectos-residential.html',
    name: 'Pilar - Buenos Aires',
    location: 'Casa el Arroyo',
    year: 'TBD',
    overlayCover: true,
    cover: 'assets/projects/pilar-casa-el-arroyo/cover.jpg',
    // Special one-off layout for this gallery only: images stacked full
    // width, shown at their real/natural size (no cropping), except the
    // pair starting at position "pairAt" which sits side by side, smaller.
    galleryLayout: 'stacked',
    pairAt: 8,
    gallery: [
      'assets/projects/pilar-casa-el-arroyo-v2/01-pasillo-jardin-escalera.jpg',
      'assets/projects/pilar-casa-el-arroyo-v2/02-living-cocina-gris.jpg',
      'assets/projects/pilar-casa-el-arroyo-v2/03-living-estufa-persianas.jpg',
      'assets/projects/pilar-casa-el-arroyo-v2/04-pared-negra-cocina.jpg',
      'assets/projects/pilar-casa-el-arroyo-v2/05-cocina-isla-marmol.jpg',
      'assets/projects/pilar-casa-el-arroyo-v2/06-pasillo-baranda-vidrio.jpg',
      'assets/projects/pilar-casa-el-arroyo-v2/07-pasillo-vista-pileta.jpg',
      'assets/projects/pilar-casa-el-arroyo-v2/08-bano-marmol-claro.jpg',
      'assets/projects/pilar-casa-el-arroyo-v2/09-bano-banera-exenta.jpg',
      'assets/projects/pilar-casa-el-arroyo-v2/10-dormitorio-vacio.jpg'
    ]
  },

  {
    slug: 'paris-5',
    category: 'Residential',
    categoryPage: 'proyectos-residential.html',
    name: 'Paris 5',
    location: 'Jardin des Plantes',
    year: 'TBD',
    overlayCover: true,
    cover: 'assets/projects/paris-5/cover.jpg',
    video: 'assets/projects/paris-5/video.mp4',
    gallery: [
      'assets/projects/paris-5/01-living-beams-kitchen.jpg',
      'assets/projects/paris-5/02-living-shelf.jpg',
      'assets/projects/paris-5/03-kitchen-island.jpg',
      'assets/projects/paris-5/04-kitchen-marble-dark.jpg',
      'assets/projects/paris-5/05-hallway.jpg',
      'assets/projects/paris-5/06-bathroom.jpg',
      'assets/projects/paris-5/07-bedroom.jpg'
    ]
  },

  {
    slug: 'paris-20',
    category: 'Residential',
    categoryPage: 'proyectos-residential.html',
    name: 'Paris 20',
    location: 'Cimetière du Père-Lachaise',
    year: 'TBD',
    overlayCover: true,
    pending: true
  },

  {
    slug: 'paris-6',
    category: 'Commercial',
    categoryPage: 'proyectos-commercial.html',
    name: 'Paris 6',
    location: 'LAZO Store',
    year: 'TBD',
    overlayCover: true,
    pending: true
  },

  {
    slug: 'pilar-clubhouse-azzurra',
    category: 'Hospitality',
    categoryPage: 'proyectos-hospitality.html',
    name: 'Pilar - Buenos Aires',
    location: 'Club House Azzurra',
    year: 'TBD',
    overlayCover: true,
    underConstruction: true,
    cover: 'assets/projects/pilar-clubhouse-azzurra/cover.jpg',
    gallery: [
      'assets/projects/pilar-clubhouse-azzurra/01.jpg',
      'assets/projects/pilar-clubhouse-azzurra/02.jpg',
      'assets/projects/pilar-clubhouse-azzurra/03.jpg',
      'assets/projects/pilar-clubhouse-azzurra/04.jpg',
      'assets/projects/pilar-clubhouse-azzurra/05.jpg'
    ]
  }
];

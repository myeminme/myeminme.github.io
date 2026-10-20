/* ==========================================================
   Mykha Lizette Floresca — Flower Patch Portfolio
   PORTFOLIO CONTENT: works, sustained investigations, hackathon pages,
   artist statements and links. Edit this file to add or change pieces.
   Images live in /portfolio as name.webp + name-thumb.webp
   ========================================================== */

/* =========================================================
   PORTFOLIO — to add a piece, copy one block below.
   Images live in the /portfolio folder: name.webp + name-thumb.webp
   cat: "traditional" | "digital" | "design" | "3d" | "photo"
   ========================================================= */
const WORKS = [
  { cat: 'digital', title: 'Allain', kind: 'Character illustration', year: 2022, size: '494 × 800 px', materials: 'Clip Studio Paint', images: ['allain'] },
  { cat: 'digital', title: 'Diffy', kind: 'Character illustration', images: ['diffy'] },
  { cat: 'digital', title: 'Oleander', kind: 'Character illustration', images: ['oleander'] },
  { cat: 'digital', title: 'In the Pool', kind: 'Illustration', year: 2025, size: '963 × 1552 px', materials: 'Clip Studio Paint', images: ['in-the-pool'] },
  { cat: 'digital', title: 'Evelynn', kind: 'Character sheet', year: 2023, size: '1350 × 1071 px', materials: 'Clip Studio Paint', images: ['evelynn', 'evelynn-bust'], captions: ['Reference sheet', 'Portrait'] },
  { cat: 'digital', title: 'Triton the Wandering Song', kind: 'Reference sheet', year: 2024, size: '779 × 996 px', materials: 'Clip Studio Paint', images: ['triton'] },
  { cat: 'digital', title: 'Oh My Friends', kind: 'Grayscale portrait sketches', year: 2023, size: 'Various', materials: 'Clip Studio Paint',
    images: ['portrait-studies-1', 'portrait-studies-2', 'portrait-studies-3'], captions: ['Sheet 1', 'Sheet 2', 'Sheet 3'],
    desc: 'Another big motivator for my art is drawing my loved ones. These are a collage of various different grayscale sketches of my friends throughout high school. I love drawing their authentic selves, noting all the little features of the face that makes them unique. I especially love drawing people being quirky and unique as it is a reminder to me to live with joy, be accepting of all, and free. Funnily enough, through this, I grew my skills in human anatomy realism. Which is another reason I focus so much on drawing people, especially the human body and face. I tend to focus on the face however as I believe that so much can be told through an expression and how one looks and dresses.' },
  { cat: 'digital', title: 'Post-Apocalyptic Game Characters', kind: 'Character brainstorm', desc: 'Character brainstorming for a post-apocalyptic game: the Marksman, the Tinkerer (two versions), and the Healer.', images: ['apocalypse-brainstorm'] },
  { cat: 'digital', title: 'Portrait Study', kind: 'Personal study', desc: 'A personal digital painting study.', images: ['portrait-study'] },
  { cat: 'digital', title: 'Camera & Cat', kind: 'Character illustration', images: ['camera-and-cat'] },
  { cat: 'digital', title: 'Frog Friend', kind: 'Character illustration', images: ['frog-friend'] },
  { cat: 'digital', title: 'Chibi Pair', kind: 'Chibi illustration', images: ['chibi-pair'] },
  { cat: 'digital', title: 'Zoro: Discipline', kind: 'Fan art illustration', images: ['zoro-discipline'] },
  { cat: 'digital', title: 'Highway Robber', kind: 'Ink illustration', images: ['highway-robber'] },
  { cat: 'design', title: 'Artist Catalog', kind: 'Publication design · Adobe InDesign', year: 2025, book: { pages: 46 }, size: '8 × 8 in, 46 pages',
    desc: 'A 46-page catalog of my digital, traditional, and 3-dimensional work, with an artist statement for each section.',
    images: ['catalog-mockup-closed', 'catalog-mockup-open', 'catalog-cover-wrap', 'catalog-p01', 'catalog-p03', 'catalog-p04', 'catalog-p05', 'catalog-p06', 'catalog-p07', 'catalog-p08', 'catalog-p09', 'catalog-p10', 'catalog-p11', 'catalog-p12', 'catalog-p13', 'catalog-p14', 'catalog-p15', 'catalog-p16', 'catalog-p17', 'catalog-p18', 'catalog-p19', 'catalog-p20', 'catalog-p21', 'catalog-p22', 'catalog-p23', 'catalog-p24', 'catalog-p25', 'catalog-p26', 'catalog-p27', 'catalog-p28', 'catalog-p29', 'catalog-p30', 'catalog-p31', 'catalog-p32', 'catalog-p33', 'catalog-p34', 'catalog-p35', 'catalog-p36', 'catalog-p37', 'catalog-p38', 'catalog-p39', 'catalog-p40', 'catalog-p41', 'catalog-p42', 'catalog-p43', 'catalog-p44', 'catalog-p45', 'catalog-p46'],
    captions: ['Book mockup', 'Spread mockup: Traditional', 'Full wraparound cover (back + front)', 'Page 1', 'Page 3', 'Page 4', 'Page 5', 'Page 6', 'Page 7', 'Page 8', 'Page 9', 'Page 10', 'Page 11', 'Page 12', 'Page 13', 'Page 14', 'Page 15', 'Page 16', 'Page 17', 'Page 18', 'Page 19', 'Page 20', 'Page 21', 'Page 22', 'Page 23', 'Page 24', 'Page 25', 'Page 26', 'Page 27', 'Page 28', 'Page 29', 'Page 30', 'Page 31', 'Page 32', 'Page 33', 'Page 34', 'Page 35', 'Page 36', 'Page 37', 'Page 38', 'Page 39', 'Page 40', 'Page 41', 'Page 42', 'Page 43', 'Page 44', 'Page 45', 'Page 46'] },
  { cat: 'digital', title: 'Artist Catalog Cover', kind: 'Wraparound cover illustration', year: 2025,
    desc: 'The front and back covers of my Artist Catalog, joined into one piece.', images: ['catalog-cover-wrap'] },
  { cat: 'photo', title: 'Stone Portrait', kind: 'Photo composite', year: 2025, size: '11 × 8 in', materials: 'Photoshop', images: ['stone-face'] },
  { cat: 'photo', title: 'Apocalyptic Landscape', kind: 'Photo composite', year: 2025, size: '8 × 11 in', materials: 'Photoshop', images: ['squirrel-window'] },
  { cat: 'photo', title: 'Call Box 52', kind: 'Photo composite', images: ['call-box-52'] },
  { cat: '3d', title: 'Blind Faith', kind: 'Wearables', year: 2025,
    materials: 'Creative air-dry paper clay, beads, wire, paint, sculpting knife, hot glue, paper mask, tape',
    desc: 'The back contains scribbled writings of an Our Father, Hail Mary, Glory Be, and parts of a Hail Holy Queen.',
    images: ['blind-faith-1', 'blind-faith-2', 'blind-faith-3'],
    captions: ['Submitted piece for critique', 'Submitted piece for critique', 'The back, with handwritten prayers'] },
  { cat: '3d', title: 'Gaksa Ko', kind: 'Tactile sound sculpture', year: 2025,
    materials: 'All-purpose flour, masking tape, water, puck speaker, wires, amp',
    desc: 'When the viewer lays their head on the sculpture, they will hear and feel the vibrations of a calm heartbeat and my mother singing a Cebuano lullaby.',
    images: ['gaksa-ko-1', 'gaksa-ko-2', 'gaksa-ko-3', 'gaksa-ko-4', 'gaksa-ko-5', 'gaksa-ko-6', 'gaksa-ko-7', 'gaksa-ko-8'],
    captions: ['Submitted piece for critique', 'Submitted piece for critique', 'Submitted piece for critique',
               'Work in progress', 'Work in progress', 'Work in progress', 'Work in progress', 'Work in progress'] },
  { cat: '3d', title: 'Falling in Shadow', kind: 'Light & space', year: 2025, size: '6 × 6 in',
    materials: 'Small motor, 2 AA batteries, wires, switch, cardboard',
    links: [['Watch video 1', 'https://drive.google.com/file/d/1uMkD3EMAyEbZ-ta3SKPbG2F04kmW5KoO/view?usp=sharing'],
            ['Watch video 2', 'https://drive.google.com/file/d/1zSfTk9pD7kQzw7qiCspLei7QEOMS9Iq7/view?usp=sharing']],
    images: ['falling-in-shadow-1', 'falling-in-shadow-2'],
    captions: ['Submitted piece for critique', 'Submitted piece for critique'] },
  { cat: '3d', title: 'A Childish Lung', kind: 'Multiples', year: 2024,
    materials: 'Post-it notes, tape, acrylic paint, pipe cleaner, hot glue',
    images: ['childish-lung-1', 'childish-lung-2', 'childish-lung-3', 'childish-lung-4', 'childish-lung-5', 'childish-lung-6',
             'childish-lung-7', 'childish-lung-8', 'childish-lung-9', 'childish-lung-10', 'childish-lung-11', 'childish-lung-12'],
    captions: ['Submitted piece for critique', 'Submitted piece for critique', 'Original sketch',
               'Rolled and painted Post-it notes', 'Rolled and painted Post-it notes',
               'The stages of forming the base', 'The stages of forming the base', 'The stages of forming the base',
               'Finished product with lung and lung cover', 'Finished product with lung and lung cover',
               'Finished product with lung and lung cover', 'Finished product with lung and lung cover'] },
  { cat: 'traditional', title: 'Connected One At A Time', kind: 'Watercolor', year: 2023, size: '10.6 × 13.5 in', materials: 'Watercolor',
    desc: 'From my Embrace sustained investigation. The colors bleed into each other, representing how each person is connected in more ways than one.', images: ['trad-connected'] },
  { cat: 'traditional', title: 'Unwanted Embrace', kind: 'Graphite drawing', year: 2023, size: '8.3 × 9.5 in', materials: 'Graphite',
    desc: 'From my Embrace sustained investigation. Realization of being in a toxic relationship.', images: ['trad-unwanted-embrace'] },
  { cat: 'traditional', title: 'Self-Embrace', kind: 'Ink drawing', year: 2023, size: '10 × 14 in', materials: 'Micron pen, tracing paper',
    desc: 'From my Embrace sustained investigation.', images: ['trad-self-embrace'] },
  { cat: 'traditional', title: 'Wet Dress and Ties', kind: 'Watercolor', year: 2025, size: '7 × 14.2 in', materials: 'Watercolor',
    desc: 'From my Hidden in Plain Sight sustained investigation. Trying to thrive and stay afloat in a sea of men. I drenched the page in water to explore the feeling of trying to control unpredictableness in a place where you are not welcomed.', images: ['trad-wet-dress'] },
  { cat: 'traditional', title: 'Prized Possession', kind: 'Graphite drawing', year: 2024, size: '14.2 × 9.4 in', materials: 'Graphite pencils',
    desc: 'From my Hidden in Plain Sight sustained investigation.', images: ['trad-prized-possession'] },
  { cat: 'traditional', title: 'Touched and Stolen', kind: 'Gouache painting', year: 2024, size: '11.2 × 14.2 in', materials: 'Gouache',
    desc: 'From my Hidden in Plain Sight sustained investigation.', images: ['trad-touched-stolen'] },
  { cat: 'traditional', title: 'The Giver Cover Study', kind: 'Book cover study', images: ['trad-giver-cover'] },
  { cat: 'traditional', title: 'Sketchbook Ink Spread', kind: 'Ink sketchbook drawing', images: ['trad-sketchbook-spread'] },
  { cat: 'traditional', title: 'Kung Fu Tea', kind: 'Ink line drawing', images: ['trad-kung-fu-tea'] },
  { cat: 'traditional', title: 'Pencil Scene Sketch', kind: 'Pencil sketch', images: ['trad-pencil-scene'] },
  { cat: 'traditional', title: 'Mixed Media Still Life', kind: 'AP selected work', size: '4.7 × 4.6 in',
    materials: 'Various papers, color pencil, charcoal, micro pen, pastel, acrylic paint',
    process: 'Tear papers, sketch figures, color using variety of materials',
    desc: 'Mixed media still life collage.', images: ['still-life-collage'] },
  { cat: 'traditional', title: 'You Are What You Eat', kind: 'AP selected work', size: '10.6 × 14.2 in',
    materials: 'Pastel pencils, white drawing paper',
    process: 'Sketch the face of pig and take a reference photo of hands and then color and render.',
    desc: 'You are what you eat, the eye is reflection of the person forcing hand to see themselves.', images: ['you-are-what-you-eat'] },
  { cat: 'digital', title: 'Reflection', kind: 'Still life', year: 2022, size: '10.4 × 14.2 in',
    materials: 'Clip Studio Paint, XP Pen 16.5 display tablet',
    process: 'Take reference photo, sketch the figures in Clip Studio, layout flat colors, render piece',
    desc: 'Reflection of orb, diamond, and moisturizer jar.', images: ['orb-diamond-jar'] },
  { cat: 'digital', title: 'After Eric Fischl', kind: 'AP selected work', size: '10.6 × 7.4 in',
    materials: 'Clip Studio Paint, XP Pen 16.5 display tablet',
    process: 'Take notes from Eric Fischl, sketch the figures, add values in greyscale then color, add effects',
    desc: 'Neo Expressionism artwork inspired by artist Eric Fischl capturing the dark side of human connection.', images: ['after-fischl'] },
  { cat: 'digital', title: "Ari's House", kind: 'Digital painting', year: 2022, size: '12.3 × 17.3 in',
    materials: 'Clip Studio Paint, Artist 13.3',
    process: 'Take screenshot of house in Minecraft, sketch the landscape, color and render',
    desc: 'Digital painting of a Minecraft house at night.', images: ['minecraft-house'] },
  { cat: 'digital', title: 'Portrait of a Friend', kind: 'AP selected work', size: '8.2 × 4 in',
    materials: 'Clip Studio Paint, Artist 13.3',
    process: 'Take reference photo of friend, sketch face, add values, and color',
    desc: 'Sketch interesting photo of a friend.', images: ['friend-portrait'] },
  { cat: 'digital', title: 'Landscape Study', kind: 'Digital painting', year: 2022, size: '12.3 × 17.3 in',
    materials: 'Clip Studio Paint, Artist 13.3',
    process: 'Sketch landscape, layout colors focusing on value, and texture with different brushes.',
    desc: 'Studying texture with a landscape.', images: ['texture-study'] },
  { cat: 'photo', title: 'Garden Entrance', kind: 'AP selected work', size: '9.5 × 14.2 in',
    materials: 'Nikon D60 camera, 55-220 lens, Lightroom',
    process: 'Position self against the entrance, adjust camera settings, take photo, edit in Lightroom.',
    desc: 'An entrance to a garden focused on asymmetry, color, and depth.', images: ['garden-entrance'] },
];

/* =========================================================
   ARTIST STATEMENTS (from my Artist Catalog)
   Shown above the gallery when a filter is picked.
   ========================================================= */
const QUOTE = 'Art to me is like a friend who you may not see for years. However, the moment you catch up with them, it’s like time has never passed.';
const LINKS = {
  technica: [['Technica 2026 website', 'https://gotechnica.org/'], ['Technica 2025 website', 'https://2025.gotechnica.org/'], ['Bitcamp 2026 website', 'https://2026.bit.camp/']],
};
const STATEMENTS = {
  technica: [
    'At Technica, I started as a Design Organizer for the 2025 season and now, as Co-Design Director for 2026, lead a cross-functional design team producing website UI, merchandise, promotional materials, and social media assets for the world\u2019s largest hackathon for underrepresented genders. At Bitcamp, I create branded social media graphics, event posters, and promotional materials as a Design Team Graphic Organizer.',
  ],
  digital: [
    'I was gifted my first tablet in elementary school. It was a tiny Wacom and pen, which plugged into the family laptop. I used it to create greeting cards for my family, a tiny drawing always included. I used it to draw me and my siblings in the games we played. I used it throughout grade school to draw all of my friends in fantastical scenarios. Drawing the fantasy worlds we would brainstorm during lunch.',
    'Eventually, I would immerse myself into the world wide web. I was inspired by animators who reimagined scenes from musicals. These animated videos eventually leading me into anime and manga. This fueled my creative drive as I created stories and characters, focusing on the tiniest details. I loved immersing myself in other worlds which made me stumble my way into Dungeons and Dragons. It was through this that I found another creative outlet, except this time it was collaborative. I would find myself drawing concepts of my players’ Dungeons and Dragons characters. I hoped to tell stories through their designs and the illustrations I created. My love for character design and illustration only blossomed through the games I played like League of Legends which had a robust art and storytelling team. Inspiring me further.',
    'One time while scrolling the web, I found a digital painting named “The Father of the Sun” by Timofey Stepanov. This painting led me to find my love for dark fantasy and eldritch horror.',
    'I love digital art in the way that I can confidently explore new techniques without the worry of failure. It has created a safe ground for me in the sense that I can always take my time. This has taught me to recognize when enough is enough as well as develop my own personal taste and style. Digital art will always be my comfort pick as I can make anything I dream a reality through it. Then these drawings come to life and impact the work and quality I do for school and personal work. I feel that through this medium I can also connect further with my interest that is so heavily integrated with technology and the world wide web. I am also able to engage and collaborate with other artists online through events like Art Fight. I will always love drawing for other people, especially their characters and worlds.',
  ],
  traditional: [
    'Like most other artists, my journey began with a piece of paper and pencil. I was gifted my first sketchbook after I littered my parents’ walls with pictures of bears with tiny heads and massive amounts of little ponies and girls. I practice my art and grew my technical skills through countless amounts of sketches in sketchbooks. Each one becoming their own art piece. Traditional has been the foundation of my skills, so I ensure to never neglect it.',
    'When it comes to various mediums, I have learned that I find it more difficult working with color traditionally. Due to my comfort selecting any color digitally, it took a long time throughout high school, learning to mix and use color well. I felt this especially trying to paint skin tones or scenery with acrylic and watercolor. However, with time and through the AP classes I took in high school, I feel that I have become comfortable enough that I can handle them in most mediums.',
    'To decide what medium I want to create a piece in, I like to think about how it may affect the message. I like using watercolor when I want things to bleed into each other, much like how Connected One At A Time has various colors bleeding into each other, representing how each person is connected in more ways than one. Additionally, for Wet Dress and Ties, it made sense to drench my page in water to explore the feeling of trying to control unpredictableness in a place where you are not welcomed. Graphite and inks have always been my strongest suit however. It lets me focus on just values and the technique to portray something as I want.',
    'Art is not just a pastime. It is also a way I have learned to cope. Throughout childhood, I found myself using it to distract myself from an emotionally uncomfortable home life. When I grew up, I did sustained investigations to further investigate feelings of doubt and trauma I have experienced. Art is how I process and think about these events and eventually express how I feel. It is another way of speaking for me.',
  ],
  '3d': [
    'When I was younger I had a 3D pen. I believed it to be the coolest thing as what I drew became something tangible and 3-dimensional. I made little creatures, buildings, furniture for my dolls and more. Eventually I quit due to the expensive filament that I could not afford. My interest in the 3D never left though, as when I played Dungeons and Dragons in person, I relished in the idea of creating dioramas and finding models to perfectly portray the scene I wanted. I mostly focused though on painting miniatures though that never progressed further as I eventually turned to playing digitally.',
    'In high school, I once wanted to be an architect. I was always confident in creating models such as birdcages, buildings, bridges, planes, etc. However, as I drifted from that path I delved less and less into the 3D. Coming into college, I was allowed to further challenge and explore how I thought about art three dimensionally. I used it to express things personal to me. Often furthering ideas I explored previously such as religious trauma (Blind Faith), childhood impressions (A Childish Lung), and feelings of love and home (Gaksa Ko). I love working in 3D as I am bound to my materials and I must challenge how I manipulate them to make things I imagine come to a reality.',
    'Overall, I hope to become more and more fluent in each aspect of my art. Whether it be the reason of why I create, the process in which I think, as well as the execution and use of materials. I believe it to be a powerful tool to express personal and deep feelings that could never be said with just words. My favorite part however, will always be seeing the excitement on someone’s face, when I gift them my art.',
  ],
};

/* =========================================================
   SUSTAINED INVESTIGATIONS (AP portfolios, 2025)
   Each step: img (file name), size, materials, process,
   optional: piece (title of the work), idea, refs, final: true
   ========================================================= */
/* Featured on the Portfolio front page, in this order. Use a WORKS title, or a SERIES id for a project page. */
const FEATURED = ['In the Pool', 'Triton the Wandering Song', 'Connected One At A Time', 'Artist Catalog',
                  'Reflection', "Ari's House", 'embrace', 'pngtuber', 'technica-2026'];

const SERIES = [
  {
    id: 'technica-2025', title: 'Technica 2025: Bring Your Ideas to Life', course: 'Technica', year: 2025,
    cats: 'technica design', cover: 'tc-2025-hero', ribbon: 'Technica theme', subtitle: '\u201cBring Your Ideas to Life\u201d',
    noStage: true, layout: 'gallery',
    groups: { 'Concept sketches': 'Character Design', 'Poster': 'Poster & Social Media', 'Social media countdown post': 'Poster & Social Media',
              'Technica Celebrates': 'Technica Celebrates', 'Track signage': 'Track Signage', 'Sticker design': 'Stickers', 'Sticker': 'Stickers' },
    boxes: [['Theme', 'Bring Your Ideas to Life', true], ['My role', 'Design Organizer'],
            ['About', 'Design work for Technica 2025, the world\u2019s largest hackathon celebrating underrepresented genders in tech: from my character brainstorm to the track gate signage, stickers, the Halloween registration campaign, and Technica Celebrates posts.']],
    links: [['Technica 2025 website', 'https://2025.gotechnica.org/']],
    steps: [
      { img: 'tc-2025-brainstorm', piece: 'Character brainstorm', type: 'Concept sketches', mine: true, wide: true, full: true,
        note: 'Part of my character brainstorm for the 2025 Technica season: a mad scientist hacker, a Frankenstein zombie, a vampire streamer, a pumpkin witch on a floating magic pumpkin, a werewolf jukebox dancer, a siren, a grim reaper, and a spooky ghost frog.' },
      { img: 'tc-poster', piece: 'Registration poster', type: 'Poster' },
      { img: 'tc-10-days', piece: '10 Days Until Technica', type: 'Social media countdown post' },
      { img: 'tc-road-warrior', piece: 'National Women Road Warrior Day', type: 'Technica Celebrates' },
      { img: 'tc-juneteenth', piece: 'Juneteenth', type: 'Technica Celebrates' },
      { img: 'tc-pride', piece: 'Pride Month', type: 'Technica Celebrates' },
      { img: 'tc-gate-general', piece: 'General track gate', type: 'Track signage' },
      { img: 'tc-gate-beginner', piece: 'Beginner track gate', type: 'Track signage' },
      { img: 'tc-gate-research', piece: 'Research track gate', type: 'Track signage' },
      { img: 'tc-gate-hardware', piece: 'Hardware track gate', type: 'Track signage' },
      { img: 'tc-gate-startup', piece: 'Start Up track gate', type: 'Track signage' },
      { img: 'tc-sticker-sheet', piece: 'Sticker sheet', type: 'Sticker design', note: 'The full Technica 2025 sticker sheet. I designed Game Start, Haunting In Progress, the You Win! arcade, and the pumpkin frog.' },
      { img: 'tc-sticker-game-start', piece: 'Game Start', type: 'Sticker', mine: true },
      { img: 'tc-sticker-haunting', piece: 'Haunting In Progress', type: 'Sticker', mine: true },
      { img: 'tc-sticker-arcade', piece: 'You Win! arcade', type: 'Sticker', mine: true },
      { img: 'tc-sticker-pumpkin', piece: 'Pumpkin frog', type: 'Sticker', mine: true },
    ],
  },
  {
    id: 'technica-2026', title: 'Technica 2026: Dare to Dive', course: 'Technica', year: 2026,
    cats: 'technica design', cover: 'tc-2026-hero', featFit: 'contain', featBg: '#d1fbf2', ribbon: 'Technica theme', subtitle: '\u201cDare to Dive\u201d',
    noStage: true, layout: 'gallery',
    groups: { 'Concept sketches': 'Character Design', 'Rendered character': 'Character Design', 'Social media countdown post': 'Social Media', 'Technica Celebrates': 'Technica Celebrates',
              'Wayfinding': 'Venue Maps', 'Mascot design': 'Mascots & Emotes', 'Emote': 'Mascots & Emotes', 'Sponsorship document': 'Sponsorship' },
    boxes: [['Theme', 'Dare to Dive', true], ['My role', 'Co-Design Director'],
            ['About', 'Design work for Technica 2026, the world\u2019s largest hackathon celebrating underrepresented genders in tech: from my character ideation and rendered characters to the venue maps, the tracks countdown, the mascots and their emotes, Technica Celebrates posts, and the sponsorship prospectus.']],
    links: [['Technica 2026 website', 'https://gotechnica.org/']],
    steps: [
      { img: 'tc-2026-ideation', piece: 'Character ideation', type: 'Concept sketches', mine: true, wide: true, full: true,
        note: 'My character ideation for the 2026 Technica season, with reference images and notes for each design.' },
      { img: 'tc-2026-char-purple-mermaid', piece: 'Purple-tailed mermaid', type: 'Rendered character', mine: true },
      { img: 'tc-2026-char-blind-mermaid', piece: 'Blind mermaid', type: 'Rendered character', mine: true },
      { img: 'tc-7-days-tracks', piece: '7 Days Till Technica: Tracks', type: 'Social media countdown post' },
      { img: 'tc-earth-day', piece: 'Earth Day', type: 'Technica Celebrates' },
      { img: 'tc-trans-visibility', piece: 'Trans pride illustration', type: 'Technica Celebrates' },
      { img: 'tc-chick-frog', piece: 'Frog and chick by the river', type: 'Technica Celebrates' },
      { img: 'tc-map-main', piece: 'Main floor map', type: 'Wayfinding' },
      { img: 'tc-map-upper', piece: 'Upper floor map', type: 'Wayfinding' },
      { img: 'tc-map-hackerspace', piece: 'Hacker space map', type: 'Wayfinding' },
      { img: 'tc-mascots', piece: 'Claire & Meena', type: 'Mascot design', wide: true },
      { img: 'tc-emote-claire-rainbow', piece: 'Claire crying (animated)', type: 'Emote' },
      { img: 'tc-emote-meena-rainbow', piece: 'Meena crying (animated)', type: 'Emote' },
      { img: 'tc-emote-claire-boba', piece: 'Claire with boba', type: 'Emote' },
      { img: 'tc-emote-meena-boba', piece: 'Meena with boba', type: 'Emote' },
      { img: 'tc-emote-claire-cry', piece: 'Claire crying', type: 'Emote' },
      { img: 'tc-emote-meena-cry', piece: 'Meena crying', type: 'Emote' },
      { img: 'tc-prospectus', piece: 'Sponsorship prospectus', type: 'Sponsorship document' },
    ],
  },  {
    id: 'bitcamp', title: 'Bitcamp', course: 'Bitcamp', year: '2025 – present', cats: 'technica design', cover: 'bitcamp-mural', ribbon: 'Hackathon',
    subtitle: 'Mural & social media design', noStage: true, layout: 'gallery',
    groups: { 'Mural': 'Community Mural', 'Social media post': 'Social Media' },
    boxes: [['My role', 'Design Team Graphic Organizer', true],
            ['About', 'Collaborate with the design team to create branded social media graphics, event posters, and promotional materials for one of the East Coast\u2019s largest hackathons, supporting an event with 1,000+ attendees.']],
    links: [['Bitcamp 2026 website', 'https://2026.bit.camp/']],
    steps: [
      { img: 'bitcamp-mural', piece: 'Community mural mockup', type: 'Mural', wide: true, full: true },
      { img: 'bitcamp-7-days', piece: '7 days countdown', type: 'Social media post' },
      { img: 'bitcamp-6-days', piece: '6 days countdown', type: 'Social media post' },
      { img: 'bitcamp-holidays', piece: 'Holiday post', type: 'Social media post' },
    ],
  },

  {
    id: 'pngtuber', title: 'PNGtuber Avatar', course: 'Digital illustration', year: '', cats: 'digital', cover: 'pngtuber-star-smile', ribbon: 'Interactive',
    subtitle: 'Avatar frames & emotes', noStage: true, layout: 'gallery', demo: 'pngtuber',
    groups: { 'Avatar frame': 'Avatar Frames', 'Emote': 'Emotes' },
    boxes: [['What it is', 'A PNGtuber avatar: a set of drawn frames that swap as the streamer talks and blinks, plus a set of emotes.', true],
            ['Try it', 'The avatar above talks on its own. Click or tap them to make them close their eyes.']],
    steps: [
      { img: 'pngtuber-emote-laugh', piece: 'Laughing', type: 'Emote' },
      { img: 'pngtuber-emote-cry', piece: 'Crying', type: 'Emote' },
      { img: 'pngtuber-emote-angry', piece: 'Angry', type: 'Emote' },
      { img: 'pngtuber-emote-nervous', piece: 'Nervous', type: 'Emote' },
      { img: 'pngtuber-star-smile', piece: 'Eyes open, mouth closed', type: 'Avatar frame' },
      { img: 'pngtuber-star-open', piece: 'Eyes open, talking', type: 'Avatar frame' },
      { img: 'pngtuber-star-grin', piece: 'Eyes open, grin', type: 'Avatar frame' },
      { img: 'pngtuber-closed-smile', piece: 'Eyes closed, mouth closed', type: 'Avatar frame' },
      { img: 'pngtuber-closed-open', piece: 'Eyes closed, talking', type: 'Avatar frame' },
      { img: 'pngtuber-closed-grin', piece: 'Eyes closed, grin', type: 'Avatar frame' },
    ],
  },

  {
    id: 'embrace', title: 'Embrace', course: 'AP 2-D Art and Design', year: 2025,
    cats: 'ap', cover: 'embrace-15', coverPos: '50% 13%',
    inquiry: 'How do humans connect through embracing? What feelings, memories, and images can be elicited by a single embrace?',
    intro: 'Initially, the question "How do people connect?" came to mind. This question eventually grew into the overarching subject of "embrace." Wrapping your arms around another is present in a variety of contexts, including childhood memories, lovers, a farewell to a friend, and even combat. An embrace in my eyes, is intimate, as you share a special moment and sensation with another.',
    development: 'Images 1 through 4 show these individuals melded into a single figure through the application of color and processes. Through further investigation I realized that an embrace does not only need to depict the emotions felt, but also concepts. Also, in each piece I experimented with materials in order to create distinct atmospheres. Image 5 and subsequent pieces symbolize topics such as humanity, abuse, resilience, and living. Each note and draft thoroughly investigates these concepts. In addition, I examined who and what you can embrace.',
    steps: [
      { img: 'embrace-1', materials: 'Sketchbook, graphite pencil', process: 'Choose concept, sketch thumbnails, use compositional techniques to decide best one' },
      { img: 'embrace-2', size: '10 × 13 in', materials: 'Pastel, Prisma color pencils, white drawing paper, kneaded eraser, lead pencil, blending stick', process: 'Sketch composition with lead pencil, lightly erase, lay pastel base, blend out, add detail and value.', final: true },
      { img: 'embrace-3', size: '8 × 12 in', process: 'Write and create imagery from dream, take a picture and add color digitally, explore color palettes' },
      { img: 'embrace-4', size: '8 × 12 in', materials: 'XP Pen 16.5 display tablet, Clip Studio Paint', process: '2nd sketch over colors, work from foreground to background to refine composition, solidify shapes', final: true },
      { img: 'embrace-5', size: '7.2 × 14.2 in', materials: 'Sketchbook, watercolor paper, watercolor, graphite pencil, sharpie, colored markers', process: 'Explore silhouettes then overlay idea, create thumbnail and interactions, experiment with watercolor' },
      { img: 'embrace-6', piece: 'Connected One At A Time', size: '10.6 × 13.5 in', materials: 'Watercolor paper, sax black paper, exacto knife, watercolors, lightbox, glue stick', process: 'Transfer sketch with lightbox, final sketch, paint figures and line, cut and glue black paper', final: true },
      { img: 'embrace-7', piece: 'Unwanted Embrace', materials: 'Sketchbook, graphite pencils, charcoal pencil', process: 'Choose concept, take reference photo, create thumbnail, sketch full-bodied concept' },
      { img: 'embrace-8', piece: 'Unwanted Embrace', size: '8.3 × 10.9 in', materials: 'White drawing paper, graphite pencils, charcoal pencil', process: 'Fully investigate & define meaning, layout general pose in accordance to the golden ratio' },
      { img: 'embrace-9', piece: 'Unwanted Embrace', size: '8.3 × 9.5 in', materials: 'White drawing paper, graphite pencils', process: 'Create large sketch to figure out proportions, add value, add notes on what to change and fix.' },
      { img: 'embrace-10', piece: 'Unwanted Embrace', size: '8.3 × 9.5 in', materials: 'White drawing paper, graphite pencils, kneaded eraser, tracing paper, lightbox', process: 'Transfer sketch using lightbox, render, and adjust positioning, values, and push expression', idea: 'Realization of being in a toxic relationship.', final: true },
      { img: 'embrace-11', piece: 'Self-Embrace', size: '8 × 14 in', materials: 'White drawing paper, pencil', process: 'Choose concept, create thumbnails, expand idea, rework thumbnail and composition, sketch final' },
      { img: 'embrace-12', piece: 'Self-Embrace', size: '10 × 14 in', materials: 'Tracing paper, Micron pen', process: 'Trace over sketch, correct the proportions, add lineart, shadow blocks, and detail', final: true },
      { img: 'embrace-13', piece: "Death's Warm Embrace", size: '14 × 20 in', materials: 'iPad, Photoshop', process: 'Create thumbnail off of rough idea, define theme with second sketch, color over sketch' },
      { img: 'embrace-14', piece: "Death's Warm Embrace", size: '14 × 10 in', materials: 'iPad, Photoshop, Procreate', process: 'Brighten colors to have a sun kissed feel, refine sketch, paint over figures' },
      { img: 'embrace-15', piece: "Death's Warm Embrace", size: '10 × 7 in', materials: 'XP Pen 16.5 display tablet, Clip Studio Paint', process: 'Rework positions and interactions, render figures, add texture to background, edit colors', final: true },
    ],
  },
  {
    id: 'plain-sight', title: 'Hidden in Plain Sight', course: 'AP Drawing', year: 2025,
    cats: 'ap', cover: 'plain-sight-8', coverPos: '50% 46%',
    inquiry: 'What are unfavorable experiences of womanhood hidden in plain sight?',
    intro: 'These experiences have distinct adversities or feelings experienced by many. I wondered how I could represent some of these common situations in my artwork, such as the terror of going out alone at night, being silenced, forced to obey, or the difficulty of living in a patriarchy.',
    development: 'My art developed through experimenting with different mediums (acrylic, watercolor, and Clip Studio Paint) to convey the distinct adversities experienced by women, such as the fear of an assailant attack in image 5. Image 10 depicts a temporary moment of peace. Image 11 revises the piece with a snake hidden in the grass, showing how danger is always lurking. The open purse in image 7 represents a woman\'s virginity, which is highly prized. Image 8 shows stealing hands, which symbolizes a violation. Images 13 to 15 show a woman\'s obedience, with the red thread symbolizing her compliance.',
    steps: [
      { img: 'plain-sight-1', piece: 'Against the Current', materials: 'Sketchbook, graphite pencil, colored pencils', process: 'Create thumbnail sketches, applied colored pencils and notes aligned with ideas for composition.', refs: 'tatler.com/article/the-real-story-of-marilyn-monroe, flickr.com/photos/scott, acidcow.com/pics/11482' },
      { img: 'plain-sight-2', piece: 'Wet Dress and Ties', size: '7.0 × 14.2 in', materials: 'Strathmore drawing paper, watercolors, graphite pencil', process: 'Sketch composition, block out colors and shapes, paint figures, render', idea: 'Trying to thrive and stay afloat in a sea of men.', refs: 'tatler.com/article/the-real-story-of-marilyn-monroe, flickr.com/photos/scott, acidcow.com/pics/11482', final: true },
      { img: 'plain-sight-3', piece: 'Paranoia My Friend', materials: 'Sketchbook, pencil, colored pencils', process: 'Created sketches of composition idea, add planning notes and colored pencils', refs: 'saferwatchapp.com/blog/safety-tips-when-walking-alone-at-night/' },
      { img: 'plain-sight-4', piece: 'Paranoia My Friend', size: '14.2 × 9.3 in', materials: 'White drawing paper, graphite pencil, colored pencil', process: 'Take reference photo, sketch figure, and layout background based on reference, color for emphasis', refs: 'pinterest.com/pin/1069745717708627759/' },
      { img: 'plain-sight-5', piece: 'Paranoia My Friend', size: '14.2 × 10.0 in', materials: 'Acrylic panel board, acrylic paint, brushes, tracing paper', process: 'Trace sketch onto panel board, block values in, add red color to make monochrome, render', refs: 'pinterest.com/pin/1069745717708627759/', final: true },
      { img: 'plain-sight-6', materials: 'Sketchbook, pencil, notes', process: 'Identify precious items and their double meanings. Sketch compositions.' },
      { img: 'plain-sight-7', piece: 'Prized Possession', size: '14.2 × 9.4 in', materials: 'White drawing paper, graphite pencils, and a blending stick', process: 'Layout shape, sketch purse, render', refs: 'ebay.com/itm/224492186099', final: true },
      { img: 'plain-sight-8', piece: 'Touched and Stolen', size: '11.2 × 14.2 in', materials: 'Gouache, canvas panel board, pencil', process: 'Take reference photos of hands, sketch composition, block colors, and render.', final: true },
      { img: 'plain-sight-9', piece: 'Happiness Hidden in the Garden of Eden', materials: 'Sketchbook, pencil', process: 'Create sketches of composition idea, add planning notes' },
      { img: 'plain-sight-10', piece: 'Happiness Hidden in the Garden of Eden', size: '15.5 × 11.0 in', materials: 'Clip Studio Paint, Artist 13.3', process: 'Sketch figure and color', refs: 'pinterest.jp/pin/940970915875827046/' },
      { img: 'plain-sight-11', piece: 'Happiness Hidden in the Garden of Eden', size: '16.6 × 11.6 in', materials: 'Clip Studio Paint, Artist 13.3', process: "Revise color, woman's body position, and add butterflies to demonstrate hidden in plain sight", refs: 'kids.nationalgeographic.com/animals/invertebrates/facts/monarch-butterfly', final: true },
      { img: 'plain-sight-12', piece: 'Silenced', materials: 'Sketchbook, graphite pencil', process: 'Create sketches of composition idea, add planning notes' },
      { img: 'plain-sight-13', piece: 'Silenced', size: '10.2 × 14.2 in', materials: 'Clip Studio Paint, Artist 13.3', process: 'Using fish eye perspective grids, layout midground, background, and foreground. Sketch figures.', refs: 'pinterest.com/pin/593490057173977752/, flickr.com/photos/azorch/albums/72157' },
      { img: 'plain-sight-14', piece: 'Silenced', size: '10.2 × 14.2 in', materials: 'Clip Studio Paint, Artist 13.3', process: 'Solidify values, lighting, shade, and add details', refs: 'pinterest.com/pin/593490057173977752/, flickr.com/photos/azorch/albums/72157' },
      { img: 'plain-sight-15', piece: 'Silenced', size: '10.2 × 14.2 in', materials: 'Clip Studio Paint, Artist 13.3', process: 'Blocked out color, fixed perspective, rendered figures, and added layer effects.', final: true },
    ],
  },
];

/* =========================================================
   ABOUT ME CHAT (click the girl, or the About Me sign)
   Everything she says lives here, so it's easy to reword.
   Each answer is a list of lines; each line is one text box.
   ========================================================= */
const CHAT = {
  hello: ['Oh! Hi, welcome to my flower patch.', 'I’m Mykha. What would you like to do?'],
  again: ['Anything else?'],
  bye: ['Thanks for stopping by! Feel free to look around.'],
  journal: ['Sure, here’s my journal!'],
  journalDone: ['That’s me so far!'],
  photo: ['A photo? Okay, ready…'],
  photoDone: ['Hehe, thanks!'],
  askIntro: ['Sure, ask away!'],
  questions: [
    { q: 'What do you study?', a: [
      'I’m studying Information Science at the University of Maryland, College Park.',
      'I’m expecting to graduate in December 2027.',
      'Some of my classes: Object Oriented Programming 2 (Java and Python), Information Organization, and Database Design.'] },
    { q: 'What kind of art do you make?', a: [
      'Digital illustration, traditional media, sculpture, and graphic design.',
      'You can see all of it under the Portfolio sign!'] },
    { q: 'What do you do at Technica?', a: [
      'Technica is the world’s largest hackathon for underrepresented genders.',
      'I was a Design Organizer for the 2025 season, and now I’m a Co-Design Director for 2026.',
      'I lead a design team making website UI, merch, promotional materials, and social media.'] },
    { q: 'What else are you involved in?', a: [
      'I’m a Design Team Graphic Organizer for Bitcamp, one of the East Coast’s largest hackathons.',
      'I’m also the Administrative Director of IMMERSE, and Co-VP of Admin Affairs for the Asian American Student Union.',
      'And I’m an Orientation Advisor at UMD, helping incoming students find their way around.'] },
    { q: 'What tools do you use?', a: [
      'For art and design: Adobe Illustrator, Adobe Creative Cloud, Figma, Clip Studio Paint, and Canva.',
      'For code: Java, Python, JavaScript, C#, HTML, and PostgreSQL.'] },
    { q: 'Can I commission you?', a: [
      'Yes! Message me on Instagram at @mooogie_boogie.'], link: ['Open my Instagram', 'https://www.instagram.com/mooogie_boogie/'] },
    { q: 'How can I reach you?', a: [
      'You can email me at mdf17@umd.edu, or find me on LinkedIn.',
      'Everything’s under the Contact sign too!'] },
  ],
};

/* Her journal: one entry per page. "pic" tapes in one of my artworks. */
const JOURNAL = [
  { title: 'About me', pic: ['in-the-pool', 'In the Pool'], lines: [
    'Mykha Lizette Floresca',
    'College Park, MD',
    'Information Science student at UMD, and an artist and designer working across digital illustration, traditional media, sculpture, and graphic design.'] },
  { title: 'School', lines: [
    'University of Maryland, College Park',
    'B.S. Information Science, expected December 2027',
    'Classes: Object Oriented Programming 2 (Java & Python), Information Organization, Database Design'] },
  { title: 'Technica', pic: ['tc-sticker-pumpkin', 'Pumpkin frog sticker'], lines: [
    'Co-Design Director, 2026 season to now',
    'Design Organizer, 2025 season',
    'Leading a design team on website UI, merch, promo materials, and social media for the world’s largest hackathon for underrepresented genders.'] },
  { title: 'Bitcamp', pic: ['bitcamp-mural', 'Bitcamp mural'], lines: [
    'Design Team Graphic Organizer, Nov 2025 to now',
    'Social media graphics, event posters, and promo materials for an event with 1,000+ attendees.',
    'Day-of help with attendee flow, venue logistics, and lines.'] },
  { title: 'Clubs', lines: [
    'IMMERSE: Administrative Director, July 2026 to now. Event docs, RSVP forms, catering, and campus coordination.',
    'AASU: Co-VP of Admin Affairs, Aug 2026 to now. Board notes, forms, attendance, calendars, and room booking.'] },
  { title: 'Work', lines: [
    'Orientation Advisor / Office Orientation Assistant, UMD Office of Orientation & Transition, Jan 2026 to now. Leading groups of 14–25 new students.',
    'Project Manager / Intern, Dynamic vSolutions, June 2023 to May 2024. Led a 5-person capstone team, built a school website, and managed VMs in VMware vSphere and Horizon.'] },
  { title: 'Tools', pic: ['triton', 'Triton the Wandering Song'], lines: [
    'Design: Adobe Illustrator, Adobe Creative Cloud, Figma, Clip Studio Paint, Canva',
    'Code: Java, Python, JavaScript, C#, HTML, PostgreSQL, VMware, Horizon, Git / GitHub, VS Code',
    'Certified: VMware Certified Technical Associate (VCTA), FERPA'] },
  { title: 'Say hi!', lines: [
    'Email: mdf17@umd.edu',
    'LinkedIn: linkedin.com/in/mykhafloresca',
    'Commissions: Instagram @mooogie_boogie'] },
];

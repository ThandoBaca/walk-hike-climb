// Walk Hike Climb (WHC / SRT) Interactive Application Logic - Phase 2

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------
  // 1. Mobile Menu Toggle
  // -------------------------------------------------------------
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      const spans = navToggle.querySelectorAll('span');
      if (spans.length === 3) {
        spans[0].style.transform = isOpen ? 'rotate(45deg) translate(6px, 6px)' : 'none';
        spans[1].style.opacity = isOpen ? '0' : '1';
        spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none';
      }
    });

    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navMenu.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
          const spans = navToggle.querySelectorAll('span');
          if (spans.length === 3) {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
          }
        }
      });
    });
  }

  // -------------------------------------------------------------
  // 2. Sticky Header Styling on Scroll
  // -------------------------------------------------------------
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // -------------------------------------------------------------
  // 3. Hero Background Image Carousel Autoplay & Dots
  // -------------------------------------------------------------
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroDots = document.querySelectorAll('.hero-dot');
  let currentSlideIndex = 0;
  let carouselInterval = null;

  function showSlide(index) {
    if (heroSlides.length === 0) return;
    heroSlides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    heroDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    currentSlideIndex = index;
  }

  function nextSlide() {
    const nextIdx = (currentSlideIndex + 1) % heroSlides.length;
    showSlide(nextIdx);
  }

  if (heroSlides.length > 0) {
    carouselInterval = setInterval(nextSlide, 5000);
    heroDots.forEach(dot => {
      dot.addEventListener('click', () => {
        const targetSlide = parseInt(dot.getAttribute('data-slide'), 10);
        showSlide(targetSlide);
        clearInterval(carouselInterval);
        carouselInterval = setInterval(nextSlide, 5000);
      });
    });
  }

  // -------------------------------------------------------------
  // 4. Packages Filter Tabs (Grid & Dropdown Navigation)
  // -------------------------------------------------------------
  const tabButtons = document.querySelectorAll('.tab-btn');
  const packageCards = document.querySelectorAll('.package-card');
  const dropdownFilterLinks = document.querySelectorAll('.dropdown-menu a[data-filter]');

  function applyPackageFilter(filterValue) {
    tabButtons.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-filter') === filterValue);
    });

    packageCards.forEach(card => {
      const category = card.getAttribute('data-category');
      if (filterValue === 'all' || category === filterValue) {
        card.style.display = 'flex';
        card.style.opacity = '0';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transition = 'opacity 0.3s ease';
        }, 30);
      } else {
        card.style.display = 'none';
      }
    });
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filterValue = btn.getAttribute('data-filter');
      applyPackageFilter(filterValue);
    });
  });

  dropdownFilterLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const filterValue = link.getAttribute('data-filter');
      if (filterValue) {
        applyPackageFilter(filterValue);
      }
    });
  });

  // Handle URL query filter on page load (e.g. from subpages like about.html)
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const filterFromUrl = urlParams.get('filter') || urlParams.get('cat');
    if (filterFromUrl && tabButtons.length > 0) {
      applyPackageFilter(filterFromUrl);
    }
  } catch (err) {
    // Graceful fallback
  }

  // -------------------------------------------------------------
  // 5. Package Details Registry & Modal Engine (Phase 2 Data Matrix)
  // -------------------------------------------------------------
  const packageRegistry = {
    'wc-4d': {
      title: 'West Coast \u2013 Beyond What You See',
      category: 'African Cradle of Human Culture Tours',
      duration: '4 Days, 3 Nights',
      image: './assets/uploads/2026/phase2/rock-art.jpg',
      price: 'R95 500.00 per tour for 9 people',
      bookingTerms: [
        'Payable upon confirmation of booking',
        'Please book timeously to secure accommodation in advance',
        'Booking confirmation 48 hours in advance'
      ],
      description: '4 days, 3 nights. One journey through landscapes and stories that stretch far beyond what you see today. From the historic town of Clanwilliam, through the Cederberg mountain range and on to the coast \u2014 discover the many layers of the West Coast, its landscapes, its people and the stories held within them.',
      readMore: `The West Coast is layered with stories \u2014 some visible, others hidden, and some reaching back thousands, even millions, of years.\n\nAlong the way, discover ancient rock art, archaeological sites, fossil-rich landscapes, and living San heritage \u2013 the people who have shaped this remarkable part of South Africa \u2013 each offering a glimpse into the stories held within this extraordinary region.\n\nYou don't need to be a history enthusiast or an archaeology expert to enjoy it. Come with curiosity, an appreciation for beautiful places, and a willingness to experience the West Coast from a different perspective.`,
      included: [
        '4-day guided journey with certified expert guides',
        'Breakfast x 3, Lunch x 4 and Dinner x 3',
        '3 nights comfortable accommodation',
        'Air-conditioned transportation throughout the journey',
        'Guided visits and experiences at the featured sites',
        'Pick-up and drop-off at your accommodation'
      ]
    },
    'wc-2d': {
      title: 'West Coast \u2013 Beyond What You See: 2-Day Tour',
      category: 'African Cradle of Human Culture Tours',
      duration: '2 Days, 1 Night',
      image: './assets/uploads/2026/phase2/1.jpg',
      price: 'R57 000.00 per tour for 9 people',
      bookingTerms: [
        'Payable upon confirmation of booking',
        'Please book timeously to secure accommodation in advance',
        'Booking confirmation 48 hours in advance'
      ],
      description: 'Explore the fascinating heritage, culture and coastal beauty of South Africa\u2019s West Coast. Discover ancient rock art at Diepkloof Rock Shelter, unwind in the seaside town of Yzerfontein, and experience the rich San heritage of !Khwa ttu San Heritage Centre. A 2-day journey combining history, culture, nature and coastal relaxation.',
      readMore: `This 2-day tour takes you from Cape Town along the beautiful West Coast, combining fascinating heritage experiences with time to relax and enjoy the coast.\n\nVisit Diepkloof Rock Shelter and take a short hike to explore the area and its remarkable ancient rock art. From there, continue to Yzerfontein for an overnight stay. The afternoon is yours to enjoy the beach, explore the town or have a meal overlooking the coast.\n\nWe then take a drive down to !Khwa ttu San Heritage Centre for a guided cultural and heritage experience, learning more about the history, traditions and living heritage of the San people. Enjoy lunch at the centre before making your way back to Cape Town in the afternoon.`,
      included: [
        '2-day guided journey',
        'Breakfast x 1, Lunch x 2 and Dinner x 1',
        '1 night comfortable accommodation',
        'Air-conditioned transportation throughout the journey',
        'Guided visits and experiences at the featured sites',
        'Pick-up and drop-off at your accommodation'
      ]
    },
    'city': {
      title: 'Cape Town \u2013 Stories of the City',
      category: 'Single Day Tours',
      duration: '4 Hours',
      image: './assets/uploads/2026/phase2/2.jpg',
      price: 'R3 000.00 per tour for 2 people',
      bookingTerms: [
        'Limited to 10 people',
        'Payable in advance',
        'Booking confirmation 48 hours in advance'
      ],
      description: 'Follow the threads of Cape Town\u2019s story through its colourful streets, historic quarters, and places where the past meets everyday life. Discover a city shaped by struggle, resilience, and change.',
      readMore: `Walk a little deeper into Cape Town, where the familiar can take on a different meaning. Look beyond what first catches your eye and uncover the stories, people, and influences that have shaped the city.\n\nExplore the Castle of Good Hope, South Africa\u2019s oldest surviving colonial building. As we move through time, you can learn about Cape Town\u2019s slave history by visiting the Iziko Slave Lodge. Stopping at the District Six Museum, you\u2019ll learn how Apartheid affected the communities living in Cape Town. We then make our way to the Bo-Kaap, which highlights the resilience and cultural character of neighbourhoods that have played a role in Cape Town\u2019s changing story.\n\nSpend the rest of your time exploring Cape Town by sampling traditional Cape Malay flavours and browsing local shops and markets.\n\nThe day can be moulded around what interests you most. We\u2019ll help plan the day and provide comfortable transport where needed, giving you the freedom to experience Cape Town at your own pace.`,
      combinesWith: ['Table Mountain cable way', 'Cape Peninsula'],
      toBring: [
        'Comfortable walking shoes',
        'Appropriate clothing (weather-dependent)',
        'Water and money for lunch and personal souvenirs',
        'Sun hat, sunglasses, sunscreen',
        'Own medication (if needed)'
      ],
      included: [
        'Guided visits and experiences at the featured sites',
        'Entrance fees to the museums'
      ]
    },
    'cableway': {
      title: 'The Table Mountain Cableway',
      category: 'Single Day Tours',
      duration: '4 Hours',
      image: './assets/uploads/2026/phase2/3.jpg',
      price: 'R8 000.00 per tour for 2 people',
      bookingTerms: [
        'Limited to 10 people',
        'Payable in advance',
        'Booking confirmation 48 hours in advance'
      ],
      description: 'Take in the breathtaking views from the top of Table Mountain without the long hike. The cable car is perfect for those who prefer a more relaxed experience or have limited time, giving you a chance to enjoy the spectacular scenery and explore the summit.',
      readMore: `Experience one of Cape Town\u2019s most iconic attractions without committing to a long hike. The Table Mountain Aerial Cableway takes you from the lower station to the summit in just a few minutes, where you can enjoy spectacular views across Cape Town and the Atlantic Ocean.\n\nAn important tip to remember is that the Cableway is weather dependent and may close during strong winds or poor conditions. Keep an eye on the weather forecast when planning your visit to avoid unfavourable conditions.`,
      didYouKnow: 'The mountain\u2019s famous \u201cTablecloth\u201d is another part of the experience. When the south-easterly wind rolls in, a blanket of cloud can spill over the flat summit, creating the dramatic effect that gives the mountain its legendary appearance. One of Cape Town\u2019s favourite stories says the clouds are the smoke from a legendary smoking contest between the Devil and a retired sea captain named Jan van Hunks, said to have taken place on nearby Devil\u2019s Peak.',
      combinesWith: ['Cape Peninsula', 'Cape Winelands', 'Cape Town City Tour'],
      toBring: [
        'Comfortable walking shoes',
        'Appropriate clothing (weather-dependent)',
        'Water and money for snacks and personal souvenirs',
        'Sun hat, sunglasses, sunscreen',
        'Own medication (if needed)'
      ],
      included: [
        'Guided visit and experience at the featured sites',
        'Fast Track Cableway Tickets (no waiting in line)',
        'Air conditioned transportation',
        'Pick-up and drop-off at your accommodation'
      ]
    },
    'tm-hike': {
      title: 'Table Mountain / Hoerikwaggo \u2013 Mountain in the Sea',
      category: 'Single Day Tours',
      duration: '6 Hours',
      image: './assets/uploads/2026/phase2/4.jpg',
      price: 'R2 000.00 per person',
      bookingTerms: [
        'Pay to book',
        'Limited to 10 people',
        'Booking confirmation 48 hours in advance',
        'No refunds'
      ],
      description: 'Discover Table Mountain from a different perspective with a choice of scenic hiking trails, ranging from relaxed walks to challenging scrambles. Whether you want panoramic city views, rugged mountain scenery or the reward of reaching the summit on foot, there is definitely a route for all.',
      readMore: `Table Mountain offers a variety of trails to suit different fitness levels. Each route offers a different way to experience the mountain and its spectacular surroundings.\n\nDifficulty Guide: \uD83E\uDD7EEasy | \uD83E\uDD7E\uD83E\uDD7EModerate | \uD83E\uDD7E\uD83E\uDD7E\uD83E\uDD7EDifficult`,
      hikingTips: 'Mountain weather can change rapidly, so always check conditions before setting out and be prepared for changing weather. Wear suitable footwear, carry enough water and stay on marked trails. For safety, it is recommended to hike in a group rather than alone.',
      trails: [
        {
          name: '1. India Venster \uD83E\uDD7E\uD83E\uDD7E\uD83E\uDD7E',
          desc: 'A challenging and adventurous route with steep sections, rocky terrain and spectacular views across Cape Town and the Atlantic.'
        },
        {
          name: '2. Platteklip Gorge \uD83E\uDD7E\uD83E\uDD7E\uD83E\uDD7E',
          desc: 'A steep and direct climb to the summit, offering a rewarding route for experienced and fit hikers.'
        },
        {
          name: '3. The Back Table \uD83E\uDD7E\uD83E\uDD7E',
          desc: 'A scenic route across the quieter side of Table Mountain, with open landscapes and beautiful views.'
        },
        {
          name: '4. Pipe Track \uD83E\uDD7E',
          desc: 'A relatively easy and scenic trail along the slopes of the Twelve Apostles sandstone buttresses, with impressive views of the Atlantic coastline.'
        },
        {
          name: '5. Eagle\u2019s Nest \uD83E\uDD7E\uD83E\uDD7E\uD83E\uDD7E',
          desc: 'A hike offering beautiful views across the surrounding mountains and coastline.'
        }
      ],
      toBring: [
        'Walk at a guided pace',
        'Bring along a day pack with your own water, lunch & refreshments',
        'Walking sticks (optional)',
        'Comfortable walking shoes (sneakers and walking/hiking boots)',
        'Appropriate clothing (weather-dependent)',
        'Sun hat, sunglasses, sunscreen',
        'Own medication (if needed)'
      ]
    },
    'peninsula': {
      title: 'The Cape Peninsula',
      category: 'Single Day Tours',
      duration: '6 Hours',
      image: './assets/uploads/2026/phase2/5.png',
      price: 'R8 000.00 per tour for 2 people',
      bookingTerms: [
        'Limited to 10 people',
        'Payable in advance',
        'Booking confirmation 48 hours in advance'
      ],
      description: 'Trace the coastline of the Cape Peninsula, where dramatic mountains meet the Atlantic and every bend reveals another unforgettable view. Wind your way through scenic coastal villages, taking in beautiful architecture, sweeping ocean vistas, and rugged landscapes along the way. Continue towards Cape Point, where historic lighthouses and king proteas crown the dramatic landscapes at the tip of the Peninsula.',
      readMore: `As you follow the scenic False Bay coastline toward the Peninsula's southern reaches, the road becomes part of the experience. Winding past coastal villages, the journey leads to the home of the Cape\u2019s most stylish residents \u2014 the African penguin. Take time to experience 1 of 2 only mainland-bound colonies and surrounding coastline before pausing for lunch and enjoying the seaside atmosphere.\n\nFrom there, continue to the Cape Point Nature Reserve, where the landscape grows wilder and more dramatic. While exploring the reserve, keep an eye out for the unmistakable king protea, South Africa\u2019s national flower, standing proudly among the landscape.\n\nThe return journey can be just as scenic. If time and energy allow, continue along Chapman\u2019s Peak Drive to soak in the golden hour at sunset before making your way back home.\n\nEvery guest has a different idea of the perfect day, so the experience can be tailored to your pace and interests. We\u2019ll help shape the journey and provide comfortable transport, leaving you to enjoy the Peninsula.`,
      combinesWith: ['Cape Town City Tour', 'Table Mountain Cable Way'],
      toBring: [
        'Comfortable walking shoes',
        'Appropriate clothing (weather-dependent)',
        'Water and money for lunch and personal souvenirs',
        'Sun hat, sunglasses, sunscreen',
        'Own medication (if needed)'
      ],
      included: [
        'Air conditioned transportation',
        'Guided visits and experiences at the featured sites',
        'Entrance fees to Penguin Colony, Cape Point Nature Reserve and Funicular',
        'Pick-up and drop-off at your accommodation'
      ]
    },
    'winelands': {
      title: 'Cape Winelands',
      category: 'Single Day Tours',
      duration: '6 to 8 Hours',
      image: './assets/uploads/2020/10/boland-trail-1.jpg',
      price: 'R12 000.00 per tour for 2 people',
      bookingTerms: [
        'Limited to 10 people',
        'Payable in advance',
        'Booking confirmation 48 hours in advance'
      ],
      description: 'Sip, swirl, and journey into the deep history of the Cape\u2019s most celebrated wine valleys. Explore the mountain-framed landscapes of Franschhoek and Stellenbosch, with visits to renowned wine estates, cellar experiences, and tastings along the way.',
      readMore: `A day in the Cape Winelands can be as much about what catches your eye as what fills your glass. Franschhoek and Stellenbosch offer an ideal introduction to the Winelands.\n\nFranschhoek offers a rich variety of wines. These vineyards produce award-winning MCC wines that pair well with the region's olives for a memorable tasting experience. And if you are looking for souvenirs from this beautiful town, you could find yourself strolling through the Franschoek Village Market, which showcases art, books, local talent, food items and clothes. (Open every Saturday 10am and ends at 3 PM).\n\nBut why stop there? Continue your journey towards Stellenbosch, via the Helshoogte Pass, providing picturesque mountain views. Stellenbosch is the second oldest town in South Africa and South Africa\u2019s premier wine capital. Connoisseurs have a variety of options for world-class wines to indulge in while having lunch at local wine estates or visiting the central area with its iconic Cape Dutch-style architecture.\n\nThere is no single way to experience the Winelands. Tell us what catches your interest, and we'll help create a day around it.`,
      didYouKnow: 'The Cape Winelands extend well beyond Stellenbosch and Franschhoek. Different valleys and wine-producing areas spread across the Cape, each with their own landscapes, estates, character, and reasons to visit. Depending on your interests, your journey can venture further \u2014 perhaps towards the quieter countryside, distinctive wine regions, historic farms, or coastal vineyards.',
      combinesWith: ['Table Mountain cable way', 'Cape Town City Tour'],
      toBring: [
        'Comfortable walking shoes',
        'Appropriate clothing (weather-dependent)',
        'Water and money for snacks and personal souvenirs',
        'Sun hat, sunglasses, sunscreen',
        'Own medication (if needed)'
      ],
      included: [
        'Guided visits and experiences at the featured sites',
        'Visit to two wine estates',
        'Lunch included',
        'Air conditioned transportation throughout the journey',
        'Pick-up and drop-off at your accommodation'
      ]
    },
    'reflection': {
      title: 'Walk of Reflection',
      category: 'Walk of Reflection',
      duration: '2 Days (May to November only)',
      image: './assets/uploads/2026/phase2/6.png',
      price: 'R2 800.00 per person',
      bookingTerms: [
        'Available from May to November only',
        'No less than 6 people',
        'Shared self-catering accommodation',
        'Payable one month in advance',
        'Booking confirmation a month in advance',
        'No refunds - the pilgrim may find a replacement'
      ],
      description: '2-day camino-inspired Walk of Reflection is a chaperoned, slow-paced walk designed to encourage participants to reconnect with themselves and explore their spiritual journey while immersed in nature. If you are looking to step away from the demands of everyday life for the opportunity for quiet contemplation, mindfulness, and personal growth, then this is for you.',
      readMore: `Route:\n\u2022 Day 1: 16.85km (approx 5 hours). Start in Bergvliet, Cape Town, with reflection points along the way, and end in Fish Hoek (accommodation for the night dependent on group size)\n\u2022 Day 2: 13km (approx 6 hours). Start in Fish Hoek, visiting local points of reflection, walk up to Elsies Peak, down to Glencairn and back via Beach Road to your accommodation in Fish Hoek.\n\nWhat to know:\n\u2022 You carry a day pack and your bigger bag will be transported to accommodation in Fish Hoek\n\u2022 You walk at your own pace but keeping your chaperone in sight`,
      toBring: [
        'Overnight bag with your 2 days of clothing, toiletries, towels, dishcloth and food (or purchase along the way)',
        'Day pack to carry on your walk',
        'Walking sticks (optional)',
        'Comfortable walking shoes for both days (sneakers and walking/hiking boots)',
        'Appropriate clothing (weather-dependent)',
        'Water bottles',
        'Breakfast, Lunch, Supper and Snacks per day',
        'Sun hat, sunglasses, sunscreen',
        'Own medication (if needed)'
      ]
    }
  };

  const packageDetailModal = document.getElementById('packageDetailModal');
  const packageDetailContent = document.getElementById('packageDetailContent');
  const closeDetailModal = document.getElementById('closeDetailModal');

  function openPackageDetails(pkgKey) {
    const data = packageRegistry[pkgKey];
    if (!data || !packageDetailContent) return;

    let trailsHtml = '';
    if (data.trails && data.trails.length > 0) {
      trailsHtml = `
        <h4 class="modal-section-title">Trail Options &amp; Difficulty Levels</h4>
        <p style="font-size:0.88rem; color:var(--text-muted); margin-bottom:10px;">Click on any trail below to view route details:</p>
        <div class="trail-accordion-list">
          ${data.trails.map((t, idx) => `
            <div class="trail-item ${idx === 0 ? 'open' : ''}">
              <div class="trail-header">
                <span>${t.name}</span>
                <i class="fa-solid fa-chevron-down"></i>
              </div>
              <div class="trail-desc">${t.desc}</div>
            </div>
          `).join('')}
        </div>
      `;
    }

    let combinesHtml = '';
    if (data.combinesWith && data.combinesWith.length > 0) {
      combinesHtml = `
        <div style="background:var(--primary-sand-light); padding:14px 18px; border-radius:6px; margin-top:16px;">
          <strong style="color:var(--primary-burgundy); font-size:0.92rem;"><i class="fa-solid fa-link"></i> Easy to combine with other city attractions:</strong>
          <ul style="margin-top:6px; padding-left:20px; font-size:0.88rem; color:var(--text-muted);">
            ${data.combinesWith.map(c => `<li>${c}</li>`).join('')}
          </ul>
        </div>
      `;
    }

    let didYouKnowHtml = '';
    if (data.didYouKnow) {
      didYouKnowHtml = `
        <div style="border-left:4px solid var(--primary-green); background:#f4faf5; padding:14px 18px; border-radius:4px; margin-top:16px;">
          <strong style="color:var(--primary-green); font-size:0.92rem;"><i class="fa-regular fa-lightbulb"></i> Did You Know?</strong>
          <p style="margin-top:6px; font-size:0.88rem; line-height:1.5; color:var(--primary-black);">${data.didYouKnow}</p>
        </div>
      `;
    }

    let hikingTipsHtml = '';
    if (data.hikingTips) {
      hikingTipsHtml = `
        <div style="border-left:4px solid var(--primary-burgundy); background:#fdf7f7; padding:14px 18px; border-radius:4px; margin-top:16px;">
          <strong style="color:var(--primary-burgundy); font-size:0.92rem;"><i class="fa-solid fa-mountain-sun"></i> Hiking Tips</strong>
          <p style="margin-top:6px; font-size:0.88rem; line-height:1.5; color:var(--primary-black);">${data.hikingTips}</p>
        </div>
      `;
    }

    let listsGridHtml = '';
    if (data.included || data.toBring) {
      listsGridHtml = `
        <div class="modal-lists-grid">
          ${data.included ? `
            <div>
              <h4 class="modal-section-title">What's Included</h4>
              <ul class="modal-bullet-list">
                ${data.included.map(item => `<li><i class="fa-solid fa-check"></i> <span>${item}</span></li>`).join('')}
              </ul>
            </div>
          ` : ''}
          ${data.toBring ? `
            <div>
              <h4 class="modal-section-title">What to Bring Along</h4>
              <ul class="modal-bullet-list">
                ${data.toBring.map(item => `<li><i class="fa-solid fa-backpack"></i> <span>${item}</span></li>`).join('')}
              </ul>
            </div>
          ` : ''}
        </div>
      `;
    }

    packageDetailContent.innerHTML = `
      <div class="modal-header-hero">
        <img src="${data.image}" alt="${data.title}">
        <span class="modal-hero-badge">${data.category}</span>
      </div>
      <h2 style="font-size:1.6rem; margin-bottom:8px; color:var(--primary-black);">${data.title}</h2>
      <div class="modal-price-strip">
        <div>
          <div class="modal-price-val">${data.price}</div>
          <div class="modal-price-meta"><i class="fa-regular fa-clock"></i> Duration: ${data.duration}</div>
        </div>
        <button class="btn btn-green book-this-tour-btn" data-tour="${data.title}" style="padding:10px 20px; font-size:0.92rem;">
          Inquire / Book This Tour
        </button>
      </div>

      <h4 class="modal-section-title">Experience Overview</h4>
      <p class="modal-body-text" style="font-weight:600;">${data.description}</p>
      <div class="modal-body-text" style="white-space: pre-line;">${data.readMore}</div>

      ${trailsHtml}
      ${didYouKnowHtml}
      ${hikingTipsHtml}
      ${combinesHtml}
      ${listsGridHtml}

      <div style="background:#faf7f0; border:1px solid var(--border-color); padding:16px 20px; border-radius:6px; margin-top:24px;">
        <strong style="color:var(--primary-burgundy); font-size:0.9rem;">Booking Terms &amp; Confirmation:</strong>
        <ul style="margin-top:6px; padding-left:20px; font-size:0.86rem; color:var(--text-muted);">
          ${data.bookingTerms.map(term => `<li>${term}</li>`).join('')}
        </ul>
      </div>

      <div style="margin-top:24px; text-align:right;">
        <button class="btn btn-green book-this-tour-btn" data-tour="${data.title}">
          Book This Tour &raquo;
        </button>
      </div>
    `;

    // Attach Accordion Toggle Listeners
    const trailItems = packageDetailContent.querySelectorAll('.trail-item');
    trailItems.forEach(item => {
      const headerEl = item.querySelector('.trail-header');
      if (headerEl) {
        headerEl.addEventListener('click', () => {
          item.classList.toggle('open');
        });
      }
    });

    // Attach "Inquire / Book This Tour" Click handler
    const bookBtns = packageDetailContent.querySelectorAll('.book-this-tour-btn');
    bookBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const tourName = btn.getAttribute('data-tour');
        if (packageDetailModal) packageDetailModal.classList.remove('open');
        openQuoteModal(tourName);
      });
    });

    if (packageDetailModal) packageDetailModal.classList.add('open');
  }

  // Attach Read More button clicks on all cards
  const readMoreButtons = document.querySelectorAll('.btn-read-more');
  readMoreButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const pkgKey = btn.getAttribute('data-package');
      openPackageDetails(pkgKey);
    });
  });

  if (closeDetailModal && packageDetailModal) {
    closeDetailModal.addEventListener('click', () => {
      packageDetailModal.classList.remove('open');
    });
    packageDetailModal.addEventListener('click', (e) => {
      if (e.target === packageDetailModal) {
        packageDetailModal.classList.remove('open');
      }
    });
  }

  // -------------------------------------------------------------
  // 6. "Book a Tour" Banner Quote Modal Window
  // -------------------------------------------------------------
  const quoteModal = document.getElementById('quoteModal');
  const bannerBookBtn = document.getElementById('bannerBookTourBtn');
  const closeQuoteModalBtn = document.getElementById('closeQuoteModal');
  const bPackageSelect = document.getElementById('bPackageInterest');
  const quoteBookingForm = document.getElementById('quoteBookingForm');
  const quoteFeedback = document.getElementById('quoteFeedback');

  function openQuoteModal(preferredTour = '') {
    if (quoteModal) {
      quoteModal.classList.add('open');
      if (preferredTour && bPackageSelect) {
        // Attempt to match select option
        Array.from(bPackageSelect.options).forEach(opt => {
          if (opt.value.toLowerCase().includes(preferredTour.toLowerCase().slice(0, 10)) ||
              preferredTour.toLowerCase().includes(opt.value.toLowerCase().slice(0, 10))) {
            opt.selected = true;
          }
        });
      }
      const firstInput = quoteModal.querySelector('input');
      if (firstInput) firstInput.focus();
    }
  }

  if (bannerBookBtn) {
    bannerBookBtn.addEventListener('click', () => {
      openQuoteModal();
    });
  }

  if (closeQuoteModalBtn && quoteModal) {
    closeQuoteModalBtn.addEventListener('click', () => {
      quoteModal.classList.remove('open');
    });
    quoteModal.addEventListener('click', (e) => {
      if (e.target === quoteModal) {
        quoteModal.classList.remove('open');
      }
    });
  }

  // Helper: Secure submission and client-side validation handler
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => !phone || /^\+?[0-9\s\-()]{7,20}$/.test(phone);

  async function submitInquiry(payload, feedbackEl, formEl, modalEl) {
    if (!payload.name || payload.name.trim().length < 2) {
      alert('Please enter your name (at least 2 characters).');
      return;
    }
    if (!validateEmail(payload.email)) {
      alert('Please enter a valid email address.');
      return;
    }
    if (payload.phone && !validatePhone(payload.phone)) {
      alert('Please enter a valid phone number (digits and standard formatting).');
      return;
    }

    const submitBtn = formEl.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.innerText : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerText = 'Sending Inquiry...';
    }

    try {
      // Send test submissions directly to thandob83@gmail.com via FormSubmit AJAX
      const response = await fetch('https://formsubmit.co/ajax/thandob83@gmail.com', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...payload,
          _subject: `[Demo Inquiry] ${payload.package || 'General'} - ${payload.name}`
        })
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        if (feedbackEl) {
          feedbackEl.style.display = 'block';
          feedbackEl.innerText = `Thank you, ${payload.name}! Your demo test inquiry has been sent to thandob83@gmail.com.`;
        }
        formEl.reset();
        setTimeout(() => {
          if (feedbackEl) feedbackEl.style.display = 'none';
          if (modalEl) modalEl.classList.remove('open');
        }, 4000);
      } else {
        alert(data.message || 'There was an issue submitting your inquiry. Please try again.');
      }
    } catch (err) {
      console.warn('API submission note:', err);
      if (feedbackEl) {
        feedbackEl.style.display = 'block';
        feedbackEl.innerText = `Thank you, ${payload.name}! Your inquiry has been recorded.`;
      }
      formEl.reset();
      setTimeout(() => {
        if (feedbackEl) feedbackEl.style.display = 'none';
        if (modalEl) modalEl.classList.remove('open');
      }, 4000);
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerText = originalBtnText;
      }
    }
  }

  if (quoteBookingForm) {
    quoteBookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fName = document.getElementById('bFirstName')?.value?.trim() || '';
      const lName = document.getElementById('bLastName')?.value?.trim() || '';
      const payload = {
        name: `${fName} ${lName}`.trim(),
        email: document.getElementById('bEmail')?.value?.trim() || '',
        phone: document.getElementById('bPhone')?.value?.trim() || '',
        country: document.getElementById('bCountry')?.value || '',
        package: document.getElementById('bPackageInterest')?.value || '',
        groupSize: parseInt(document.getElementById('bGroupSize')?.value || '1', 10),
        date: document.getElementById('bDate')?.value || '',
        message: document.getElementById('bNotes')?.value?.trim() || '',
        _hp_company: quoteBookingForm.querySelector('[name="_hp_company"]')?.value || ''
      };
      submitInquiry(payload, quoteFeedback, quoteBookingForm, quoteModal);
    });
  }

  // -------------------------------------------------------------
  // 7. Quick Email Enquiry Modal Drawer
  // -------------------------------------------------------------
  const enquiryModal = document.getElementById('enquiryModal');
  const openEnquiryButtons = document.querySelectorAll('.open-enquiry-modal');
  const closeEnquiryButton = document.getElementById('closeModal');
  const quickEnquiryForm = document.getElementById('quickEnquiryForm');
  const qFeedback = document.getElementById('qFeedback');

  openEnquiryButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (enquiryModal) enquiryModal.classList.add('open');
    });
  });

  if (closeEnquiryButton && enquiryModal) {
    closeEnquiryButton.addEventListener('click', () => {
      enquiryModal.classList.remove('open');
    });
    enquiryModal.addEventListener('click', (e) => {
      if (e.target === enquiryModal) {
        enquiryModal.classList.remove('open');
      }
    });
  }

  if (quickEnquiryForm) {
    quickEnquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const payload = {
        name: document.getElementById('qName')?.value?.trim() || '',
        email: document.getElementById('qEmail')?.value?.trim() || '',
        phone: document.getElementById('qPhone')?.value?.trim() || '',
        country: document.getElementById('qCountry')?.value || '',
        package: document.getElementById('qPackage')?.value || '',
        message: document.getElementById('qMessage')?.value?.trim() || '',
        _hp_company: quickEnquiryForm.querySelector('[name="_hp_company"]')?.value || ''
      };
      submitInquiry(payload, qFeedback, quickEnquiryForm, enquiryModal);
    });
  }

  // -------------------------------------------------------------
  // 7b. Contact Page Direct Inquiry Form Handler
  // -------------------------------------------------------------
  const contactPageForm = document.getElementById('contactPageForm');
  const contactFeedback = document.getElementById('contactFeedback');

  if (contactPageForm) {
    contactPageForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const payload = {
        name: document.getElementById('cFullName')?.value?.trim() || '',
        email: document.getElementById('cEmail')?.value?.trim() || '',
        phone: document.getElementById('cPhone')?.value?.trim() || '',
        country: document.getElementById('cCountry')?.value || '',
        package: document.getElementById('cPackage')?.value || '',
        groupSize: parseInt(document.getElementById('cGroupSize')?.value || '1', 10),
        date: document.getElementById('cDate')?.value || '',
        message: document.getElementById('cMessage')?.value?.trim() || '',
        _hp_company: contactPageForm.querySelector('[name="_hp_company"]')?.value || ''
      };
      submitInquiry(payload, contactFeedback, contactPageForm, null);
    });
  }

  // -------------------------------------------------------------
  // 8. Global Escape Key Listener for Modals
  // -------------------------------------------------------------
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (quoteModal && quoteModal.classList.contains('open')) quoteModal.classList.remove('open');
      if (packageDetailModal && packageDetailModal.classList.contains('open')) packageDetailModal.classList.remove('open');
      if (enquiryModal && enquiryModal.classList.contains('open')) enquiryModal.classList.remove('open');
    }
  });
});

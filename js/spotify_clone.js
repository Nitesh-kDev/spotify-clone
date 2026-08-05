(() => {
    const box = document.querySelector('.box');
    const sidebar = document.querySelector('.sidebar');
    const header = document.querySelector('.header');
    const searchInput = document.querySelector('.search_barBox');

    if (!box || !sidebar || !header || !searchInput) {
        return;
    }

    const topSection = document.createElement('section');
    topSection.className = 'extra-top-content';
    topSection.innerHTML = `
        <div class="quick-filters" aria-label="Quick Filters">
            <button class="quick-filter-btn active" data-filter="all">All</button>
            <button class="quick-filter-btn" data-filter="songs">Music</button>
            <button class="quick-filter-btn" data-filter="artists">Artists</button>
            <button class="quick-filter-btn" data-filter="albums">Albums</button>
        </div>
        <h1>Top result</h1>
        <div class="top-result-grid">
            <article class="top-result-card">
                <div class="top-result-artist">
                    <img src="assets/acard6.jpg" alt="Top Artist">
                    <div>
                        <h3>Arijit Singh</h3>
                        <p>Artist</p>
                    </div>
                </div>
            </article>
            <article class="top-songs-card">
                <h3>Popular on Spotify</h3>
                <ul class="top-song-list">
                    <li class="top-song-row" data-card-target="0">
                        <div class="top-song-meta">
                            <span class="top-song-index">1</span>
                            <p>Aigiri Nandini</p>
                        </div>
                        <p>3:27</p>
                    </li>
                    <li class="top-song-row" data-card-target="1">
                        <div class="top-song-meta">
                            <span class="top-song-index">2</span>
                            <p>Kesariya</p>
                        </div>
                        <p>4:28</p>
                    </li>
                    <li class="top-song-row" data-card-target="2">
                        <div class="top-song-meta">
                            <span class="top-song-index">3</span>
                            <p>Tere Hawaale</p>
                        </div>
                        <p>5:46</p>
                    </li>
                </ul>
            </article>
        </div>
    `;

    const trendingHeading = Array.from(box.querySelectorAll('h1')).find((heading) =>
        heading.textContent.toLowerCase().includes('trending songs')
    );

    if (trendingHeading) {
        box.insertBefore(topSection, trendingHeading);
    } else {
        box.prepend(topSection);
    }

    const topResultHeading = topSection.querySelector('h1');
    const topResultGrid = topSection.querySelector('.top-result-grid');

    const recentlyPlayedSection = document.createElement('section');
    recentlyPlayedSection.innerHTML = `
        <h1>Recently played</h1>
        <div class="recently-played sub-box">
            <div class="card-box" data-category="songs">
                <img src="assets/card (10).jpg" class="image-of-Content" alt="Night Vibes">
                <p class="title-of-song">Night Vibes</p>
                <p class="discription-of-song">Playlist</p>
            </div>
            <div class="card-box" data-category="songs">
                <img src="assets/card (11).jpg" class="image-of-Content" alt="Lo-Fi Chill">
                <p class="title-of-song">Lo-Fi Chill</p>
                <p class="discription-of-song">Playlist</p>
            </div>
            <div class="card-box" data-category="artists">
                <img src="assets/acard8.jpg" class="image-of-artist" alt="Shreya Ghoshal">
                <p class="title-of-song">Shreya Ghoshal</p>
                <p class="discription-of-song">Artist</p>
            </div>
            <div class="card-box" data-category="albums">
                <img src="assets/alcard4.jpg" class="image-of-Content" alt="Monsoon Sessions">
                <p class="title-of-song">Monsoon Sessions</p>
                <p class="discription-of-song">Album</p>
            </div>
            <div class="card-box" data-category="songs">
                <img src="assets/card (12).jpg" class="image-of-Content" alt="Daily Mix 3">
                <p class="title-of-song">Daily Mix 3</p>
                <p class="discription-of-song">Made for you</p>
            </div>
        </div>
    `;

    const footerSpacer = box.querySelector('.footer');
    if (footerSpacer) {
        box.insertBefore(recentlyPlayedSection, footerSpacer);
    } else {
        box.appendChild(recentlyPlayedSection);
    }

    const allCards = Array.from(document.querySelectorAll('.card-box'));

    const findHeadingByText = (text) =>
        Array.from(box.querySelectorAll('h1')).find((heading) =>
            heading.textContent.trim().toLowerCase() === text.toLowerCase()
        );

    const sectionBlocks = [
        {
            key: 'songs',
            heading: findHeadingByText('Trending songs'),
            container: box.querySelector('.trending_song'),
        },
        {
            key: 'artists',
            heading: findHeadingByText('Popular artists'),
            container: box.querySelector('.popular_artist'),
        },
        {
            key: 'albums',
            heading: findHeadingByText('Popular albums and singles'),
            container: box.querySelector('.popular-albums'),
        },
        {
            key: 'songs',
            heading: recentlyPlayedSection.querySelector('h1'),
            container: recentlyPlayedSection.querySelector('.recently-played'),
        },
    ];

    const rowToWrapperMap = new WeakMap();

    const initHorizontalCarousels = () => {
        const rows = Array.from(box.querySelectorAll('.sub-box'));

        rows.forEach((row) => {
            if (row.closest('.carousel-viewport')) {
                return;
            }

            const wrapper = document.createElement('div');
            wrapper.className = 'carousel-wrapper';

            const viewport = document.createElement('div');
            viewport.className = 'carousel-viewport';

            const prevBtn = document.createElement('button');
            prevBtn.className = 'carousel-btn prev';
            prevBtn.setAttribute('aria-label', 'Previous cards');
            prevBtn.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';

            const nextBtn = document.createElement('button');
            nextBtn.className = 'carousel-btn next';
            nextBtn.setAttribute('aria-label', 'Next cards');
            nextBtn.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';

            const parent = row.parentElement;
            if (!parent) {
                return;
            }

            parent.insertBefore(wrapper, row);
            wrapper.appendChild(prevBtn);
            wrapper.appendChild(viewport);
            viewport.appendChild(row);
            wrapper.appendChild(nextBtn);
            rowToWrapperMap.set(row, wrapper);

            const getStepSize = () => {
                const firstCard = row.querySelector('.card-box');
                if (!firstCard) {
                    return 220;
                }
                const style = window.getComputedStyle(row);
                const gap = Number.parseFloat(style.columnGap || style.gap || '0');
                return firstCard.getBoundingClientRect().width + gap;
            };

            const updateCarouselState = () => {
                const maxScroll = row.scrollWidth - row.clientWidth;
                const canScroll = maxScroll > 6;
                const atStart = row.scrollLeft <= 4;
                const atEnd = row.scrollLeft >= maxScroll - 4;

                wrapper.classList.toggle('is-static', !canScroll);
                prevBtn.disabled = atStart || !canScroll;
                nextBtn.disabled = atEnd || !canScroll;
            };

            prevBtn.addEventListener('click', () => {
                row.scrollBy({ left: -(getStepSize() * 2), behavior: 'smooth' });
            });

            nextBtn.addEventListener('click', () => {
                row.scrollBy({ left: getStepSize() * 2, behavior: 'smooth' });
            });

            row.addEventListener('scroll', updateCarouselState);
            window.addEventListener('resize', updateCarouselState);
            updateCarouselState();
        });
    };

    initHorizontalCarousels();

    sectionBlocks.forEach((block) => {
        if (!block.container) {
            return;
        }
        const wrappedContainer = rowToWrapperMap.get(block.container);
        if (wrappedContainer) {
            block.container = wrappedContainer;
        }
    });

    allCards.forEach((card) => {
        if (!card.dataset.category) {
            const parentClass = card.parentElement ? card.parentElement.className : '';
            if (parentClass.includes('popular_artist')) {
                card.dataset.category = 'artists';
            } else if (parentClass.includes('popular-albums')) {
                card.dataset.category = 'albums';
            } else {
                card.dataset.category = 'songs';
            }
        }

        if (!card.querySelector('.card-play-btn')) {
            const playBtn = document.createElement('button');
            playBtn.className = 'card-play-btn';
            playBtn.setAttribute('aria-label', 'Play item');
            playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
            card.appendChild(playBtn);
        }
    });

    const playerDock = document.createElement('div');
    playerDock.className = 'player-dock';
    playerDock.innerHTML = `
        <div class="player-track">
            <img src="assets/card1.jpg" alt="Now Playing" class="player-cover">
            <div>
                <p class="player-track-title">Aigiri Nandini</p>
                <p class="player-track-artist">Megahana Bhat</p>
            </div>
        </div>
        <div class="player-controls">
            <button class="player-icon-btn" aria-label="Shuffle"><i class="fa-solid fa-shuffle"></i></button>
            <button class="player-icon-btn" aria-label="Previous"><i class="fa-solid fa-backward-step"></i></button>
            <button class="player-main-btn" aria-label="Play pause"><i class="fa-solid fa-play"></i></button>
            <button class="player-icon-btn" aria-label="Next"><i class="fa-solid fa-forward-step"></i></button>
            <button class="player-icon-btn" aria-label="Repeat"><i class="fa-solid fa-repeat"></i></button>
        </div>
        <div class="player-volume">
            <i class="fa-solid fa-volume-high" style="color:#b3b3b3"></i>
            <input type="range" min="0" max="100" value="70" aria-label="Volume slider">
        </div>
    `;
    document.body.appendChild(playerDock);

    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.setAttribute('aria-label', 'Toggle library menu');
    mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    header.insertBefore(mobileMenuBtn, header.children[2] || null);

    const playPauseBtn = playerDock.querySelector('.player-main-btn');
    const playerTitle = playerDock.querySelector('.player-track-title');
    const playerArtist = playerDock.querySelector('.player-track-artist');
    const playerCover = playerDock.querySelector('.player-cover');

    let isPlaying = false;
    let activeFilter = 'all';
    let searchQuery = '';

    const setPlayState = (playing) => {
        isPlaying = playing;
        const icon = playPauseBtn.querySelector('i');
        if (icon) {
            icon.className = playing ? 'fa-solid fa-pause' : 'fa-solid fa-play';
        }
    };

    const setNowPlayingFromCard = (card) => {
        const titleEl = card.querySelector('.title-of-song');
        const artistEl = card.querySelector('.discription-of-song');
        const imageEl = card.querySelector('img');

        if (titleEl) {
            playerTitle.textContent = titleEl.textContent.trim();
        }
        if (artistEl) {
            playerArtist.textContent = artistEl.textContent.trim();
        }
        if (imageEl) {
            playerCover.src = imageEl.src;
            playerCover.alt = titleEl ? titleEl.textContent.trim() : 'Now Playing';
        }

        setPlayState(true);
    };

    playPauseBtn.addEventListener('click', () => {
        setPlayState(!isPlaying);
    });

    const applyFiltersAndSearch = () => {
        const normalizedQuery = searchQuery.trim().toLowerCase();

        allCards.forEach((card) => {
            const title = (card.querySelector('.title-of-song')?.textContent || '').toLowerCase();
            const subtitle = (card.querySelector('.discription-of-song')?.textContent || '').toLowerCase();
            const searchMatch = !normalizedQuery || title.includes(normalizedQuery) || subtitle.includes(normalizedQuery);
            const category = card.dataset.category || 'songs';
            const filterMatch = activeFilter === 'all' || category === activeFilter;
            const shouldShow = searchMatch && filterMatch;

            card.classList.toggle('is-hidden', !shouldShow);
            card.classList.toggle('search-highlight', shouldShow && normalizedQuery.length > 0);
        });

        sectionBlocks.forEach((block) => {
            if (!block.heading || !block.container) {
                return;
            }

            const sectionMatch = activeFilter === 'all' || block.key === activeFilter;
            const cardsInSection = Array.from(block.container.querySelectorAll('.card-box'));
            const hasVisibleCards = cardsInSection.some((card) => !card.classList.contains('is-hidden'));
            const shouldShowSection = sectionMatch && (normalizedQuery.length === 0 || hasVisibleCards);

            block.heading.classList.toggle('is-hidden', !shouldShowSection);
            block.container.classList.toggle('is-hidden', !shouldShowSection);
        });

        const hideTopResult = activeFilter === 'albums';
        if (topResultHeading) {
            topResultHeading.classList.toggle('is-hidden', hideTopResult);
        }
        if (topResultGrid) {
            topResultGrid.classList.toggle('is-hidden', hideTopResult);
        }
    };

    document.addEventListener('click', (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) {
            return;
        }

        const playButton = target.closest('.card-play-btn');
        if (playButton) {
            const card = playButton.closest('.card-box');
            if (card) {
                setNowPlayingFromCard(card);
            }
            return;
        }

        const songRow = target.closest('.top-song-row');
        if (songRow) {
            const targetIndex = Number(songRow.getAttribute('data-card-target') || '0');
            const songCards = Array.from(document.querySelectorAll('.trending_song .card-box'));
            const selectedCard = songCards[targetIndex] || songCards[0];
            if (selectedCard) {
                setNowPlayingFromCard(selectedCard);
            }
            return;
        }

        const filterBtn = target.closest('.quick-filter-btn');
        if (filterBtn) {
            activeFilter = filterBtn.getAttribute('data-filter') || 'all';
            document.querySelectorAll('.quick-filter-btn').forEach((btn) => {
                btn.classList.remove('active');
            });
            filterBtn.classList.add('active');
            applyFiltersAndSearch();
            return;
        }
    });

    searchInput.addEventListener('input', (event) => {
        const target = event.target;
        if (!(target instanceof HTMLInputElement)) {
            return;
        }
        searchQuery = target.value;
        applyFiltersAndSearch();
    });

    mobileMenuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('is-visible');
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === '/') {
            event.preventDefault();
            searchInput.focus();
        }
        if (event.key.toLowerCase() === 'm') {
            sidebar.classList.toggle('is-visible');
        }
    });

    applyFiltersAndSearch();
})();

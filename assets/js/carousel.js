document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.gallery-carousel');
    const track = document.querySelector('.carousel-track');
    const collapseBtn = document.querySelector('.collapse-btn');
    let isExpanded = false;
    let currentIndex = 0;
    let isPaused = false;

    // Initial setup
    carousel.style.height = '200px';

    const items = Array.from(document.querySelectorAll('.gallery-item'));

    // Clone items for infinite scroll
    const cloneItems = items.map(item => item.cloneNode(true));
    cloneItems.forEach(clone => track.appendChild(clone));

    const allItems = Array.from(track.querySelectorAll('.gallery-item'));
    const itemWidth = items[0].offsetWidth + 10;
    const totalItems = items.length;

    // Auto-slide
    function slide() {
        if (!isPaused && !isExpanded) {
            currentIndex++;
            track.style.transition = 'transform 0.5s ease';
            track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

            if (currentIndex >= totalItems) {
                setTimeout(() => {
                    track.style.transition = 'none';
                    currentIndex = 0;
                    track.style.transform = `translateX(0)`;
                }, 500);
            }
        }
    }

    let slideInterval = setInterval(slide, 3000);

    // Pause on hover
    carousel.addEventListener('mouseenter', () => {
        isPaused = true;
    });
    carousel.addEventListener('mouseleave', () => {
        if (!isExpanded) {
            isPaused = false;
        }
    });

    // Click handler
    function handleItemClick(e) {
        const item = e.currentTarget;
        const alreadyClicked = item.getAttribute('data-clicked') === 'true';

        if (!alreadyClicked) {
            item.setAttribute('data-clicked', 'true');

            setTimeout(() => {
                item.setAttribute('data-clicked', 'false');
            }, 300); // Timeout allows second click within 300ms
        } else {
            modalimg(e.target); // Your modal open function
        }

        if (!isExpanded) {
            expandGallery();
        }
    }

    // Attach click handler to all items (original + clones)
    allItems.forEach(item => {
        item.addEventListener('click', handleItemClick);
    });

    function expandGallery() {
        isExpanded = true;
        isPaused = true;
        clearInterval(slideInterval);

        carousel.classList.add('expanded');
        carousel.style.height = 'auto';
        collapseBtn.style.display = 'block';

        // Switch to grid layout
        track.style.display = 'grid';
        track.style.gridTemplateColumns = 'repeat(auto-fill, minmax(200px, 1fr))';
        track.style.gap = '15px';
        track.style.transform = 'none';
        track.style.transition = 'none';
    }

    collapseBtn.addEventListener('click', () => {
        isExpanded = false;
        isPaused = false;

        carousel.classList.remove('expanded');
        carousel.style.height = '200px';
        collapseBtn.style.display = 'none';

        // Restore carousel layout
        track.style.display = 'flex';
        track.style.removeProperty('grid-template-columns');
        track.style.removeProperty('gap');
        track.style.transform = `translateX(${currentIndex * -itemWidth}px)`;
        track.style.transition = 'transform 0.5s ease';

        slideInterval = setInterval(slide, 3000);
    });
});

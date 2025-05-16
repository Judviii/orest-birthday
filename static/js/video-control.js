document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('birthday-video');
    const section = document.querySelector('.section-video');

    if (!video || !section) {
        console.error('Video or section not found');
        return;
    }

    // 🔁 
    function checkVisibility() {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        if (isVisible) {
            video.muted = false;
            video.play().catch((e) => console.error('Play error:', e));
        } else {
            video.muted = true;
            video.pause().catch((e) => console.error('Pause error:', e));
        }
    }

    // 👁️
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    video.muted = false;
                    video.play().catch((e) => console.error('Play error:', e));
                } else {
                    video.muted = true;
                    video.pause().catch((e) => console.error('Pause error:', e));
                }
            });
        },
        {
            threshold: 0.1,
        }
    );

    observer.observe(section);

    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('resize', checkVisibility);

    checkVisibility();
});

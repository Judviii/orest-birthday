document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('birthday-video');
    const section = document.querySelector('.section-video');

    if (!video || !section) {
        console.error('Video or section not found');
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    console.log('Section visible, unmuting and playing video');
                    video.muted = false;
                    video.play().catch((e) => console.error('Play error:', e));
                } else {
                    console.log('Section hidden, muting video');
                    video.muted = true;
                    video.pause().catch((e) => console.error('Pause error:', e));
                }
            });
        },
        {
            threshold: 0.7, // Реагувати, коли 70% секції видно
            rootMargin: '0px' // Без додаткових відступів
        }
    );

    observer.observe(section);

    if (section.getBoundingClientRect().top < window.innerHeight) {
        console.log('Section initially visible, unmuting');
        video.muted = false;
        video.play().catch((e) => console.error('Initial play error:', e));
    }
});
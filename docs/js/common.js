import { seoMetaTags, seoTitle } from '../config/seo.js';

document.addEventListener('DOMContentLoaded', () => {
    const head = document.head;

    if (head) {
        for (const tag of seoMetaTags) {
            const meta = document.createElement('meta');

            if (tag.name) {
                meta.setAttribute('name', tag.name);
            }
            if (tag.property) {
                meta.setAttribute('property', tag.property);
            }
            meta.setAttribute('content', tag.content);

            head.appendChild(meta);
        }

        if (!document.title) {
            document.title = seoTitle;
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const footerContainer = document.querySelector('footer');
    const headerContainer = document.querySelector('header');
    // Load header
    if (headerContainer) {
        fetch('./header.html')
            .then(res => res.text())
            .then(data => {
                headerContainer.innerHTML = data;
            })
            .catch(err => {
                console.error('Failed to load header:', err);
            });
    }
    // Load footer

    if (footerContainer) {
        fetch('./footer.html')
            .then(res => res.text())
            .then(data => {
                footerContainer.innerHTML = data;

                // Update year after loading
                const yearSpan = document.getElementById('currentYear');
                if (yearSpan) {
                    yearSpan.textContent = new Date().getFullYear();
                }
            })
            .catch(err => {
                console.error('Failed to load footer:', err);
            });
    }
});

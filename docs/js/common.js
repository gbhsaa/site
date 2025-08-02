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

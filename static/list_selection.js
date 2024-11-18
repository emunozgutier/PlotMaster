document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');

    const listItems = document.querySelectorAll('.list-group-item');
    console.log('List items found:', listItems.length);

    listItems.forEach(item => {
        item.addEventListener('click', function() {
            console.log('List item clicked:', this.textContent.trim());

            listItems.forEach(i => i.classList.remove('active'));
            console.log('Removed active class from all list items');

            this.classList.add('active');
            console.log('Added active class to clicked list item');
        });
    });
});
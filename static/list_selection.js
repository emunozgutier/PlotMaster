$(document).ready(function() {
    console.log('DOM fully loaded and parsed');

    const $listItems = $('.list-group-item');
    console.log('List items found:', $listItems.length);

    $listItems.on('click', function() {
        console.log('List item clicked:', $(this).text().trim());

        if ($(this).hasClass('data-header-item')) {
            console.log('This item belongs to data-header-item');
            handleDataHeaderItemClick($(this));
        }

        if ($(this).hasClass('filter-field')) {
            console.log('This item belongs to filter-field');
            handleFilterFieldClick($(this));
        }

        $listItems.removeClass('active');
        console.log('Removed active class from all list items');

        $(this).addClass('active');
        console.log('Added active class to clicked list item');
    });
});

function handleFilterFieldClick($item) {
    console.log('Handling filter-field item:', $item.text().trim());

    const $listElements = $item.find('.filter-field-list .list-group-item');
    $listElements.each(function() {
        console.log('List element:', $(this).text().trim());
    });
}

function handleDataHeaderItemClick($item) {
    console.log('Handling data-header-item:', $item.text().trim());

    const $filterFieldLists = $('.filter-field-list');
    $filterFieldLists.each(function() {
        const $newItem = $('<li class="list-group-item"></li>').text($item.text().trim());
        $(this).append($newItem);
        console.log('Added item to filter-field-list:', $newItem.text().trim());
    });
}
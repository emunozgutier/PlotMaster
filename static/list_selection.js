$(document).ready(function() {
    console.log('DOM fully loaded and parsed');

    const $listItems = $('.list-group-item');
    console.log('List items found:', $listItems.length);

    $listItems.on('click', function() {
        console.log('List item clicked:', $(this).text().trim());

        if ($(this).hasClass('data-header-item')) {
            console.log('This item belongs to data-header-item');
            handleDataHeaderItemClick($(this));
        } else if ($(this).hasClass('filter-field')) {
            console.log('This item belongs to filter-field');
            handleFilterFieldClick($(this), $listItems);
        }
    });

    $(document).on('change', '.filter-field-list-item-check', function() {
        console.log('Checkbox state changed:', $(this).is(':checked'));
        handleCheckboxChange($(this));
    });
});

function handleFilterFieldClick($item, $listItems) {
    console.log('Handling filter-field item:', $item.text().trim());

    $listItems.removeClass('active');
    console.log('Removed active class from all list items');

    $item.addClass('active');
    console.log('Added active class to clicked list item');

    const $listElements = $item.find('.filter-field-list .list-group-item');
    $listElements.each(function() {
        console.log('List element:', $(this).text().trim());
    });
}

function handleDataHeaderItemClick($item) {
    console.log('Handling data-header-item:', $item.text().trim());

    const $activeFilterFieldLists = $('.filter-field.active .filter-field-list');
    $activeFilterFieldLists.each(function() {
        const itemText = $item.text().trim();
        const $existingItem = $(this).find('.filter-field-list-item').filter(function() {
            return $(this).text().trim() === itemText;
        });

        if ($existingItem.length === 0) {
            const $newItem = $('<div class="row"><div class="col"><input class="form-check-input filter-field-list-item-check" type="checkbox" value="" checked><li class="list-group-item filter-field-list-item"></li></div></div>');
            $newItem.find('li').text(itemText);
            $(this).append($newItem);
            console.log('Added item to active filter-field-list:', itemText);
        } else {
            console.log('Item already exists in active filter-field-list:', itemText);
        }
    });
}

function handleFilterFieldListItemClick($item) {
    console.log('Filter field list item clicked:', $item.text().trim());
    $item.remove();
    console.log('Removed filter field list item');
}

function handleCheckboxChange($checkbox) {
    if (!$checkbox.is(':checked')) {
        const $listItem = $checkbox.closest('.row');
        console.log('Checkbox unchecked, removing list item:', $listItem.find('li').text().trim());
        $listItem.remove();
    }
}
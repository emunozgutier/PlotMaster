class TouchPlotFilter {
    constructor() {
        this.initEventListeners();
    }

    initEventListeners() {
        $(document).ready(() => {
            console.log('DOM fully loaded and parsed');

            const $listItems = $('.list-group-item');
            console.log('List items found:', $listItems.length);

            $listItems.on('click', (event) => {
                const $item = $(event.currentTarget);
                console.log('List item clicked:', $item.text().trim());

                if ($item.hasClass('data-header-item')) {
                    console.log('This item belongs to data-header-item');
                    this.handleDataHeaderItemClick($item);
                } else if ($item.hasClass('filter-field')) {
                    console.log('This item belongs to filter-field');
                    this.handleFilterFieldClick($item, $listItems);
                }
            });

            $(document).on('change', '.filter-field-list-item-check', (event) => {
                const $checkbox = $(event.currentTarget);
                console.log('Checkbox state changed:', $checkbox.is(':checked'));
                this.handleCheckboxChange($checkbox);
            });
        });
    }

    handleFilterFieldClick($item, $listItems) {
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

    handleDataHeaderItemClick($item) {
        console.log('Handling data-header-item:', $item.text().trim());

        const $activeFilterFieldLists = $('.filter-field.active .filter-field-list');
        $activeFilterFieldLists.each(function() {
            const itemText = $item.text().trim();
            const $existingItem = $(this).find('.filter-field-list-item').filter(function() {
                return $(this).text().trim() === itemText;
            });

            if ($existingItem.length === 0) {
                const $newItem = $(
                    '<div class="row">' +
                        '<div class="col">' +
                            '<input class="form-check-input filter-field-list-item-check" type="checkbox" value="" checked>' +
                            '<li class="list-group-item filter-field-list-item"></li>' +
                        '</div>' +
                    '</div>'
                );
                $newItem.find('li').text(itemText);
                $(this).append($newItem);
                console.log('Added item to active filter-field-list:', itemText);
            } else {
                console.log('Item already exists in active filter-field-list:', itemText);
            }
        });
    }

    handleCheckboxChange($checkbox) {
        if (!$checkbox.is(':checked')) {
            const $listItem = $checkbox.closest('.row');
            console.log('Checkbox unchecked, removing list item:', $listItem.find('li').text().trim());
            $listItem.remove();
        }
    }
}

export default TouchPlotFilter;
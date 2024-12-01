class TouchPlotAxis {
    /***************************************************************************
     * This class is responsible for handling the axis for the plots.
     * These are y-axis, x-axis, color-axis, group-axis, and filter-axis.
     *
     * HTML elements IN:
     * .tp-axis-header-list:      div to display the headers list
     * .tp-axis-dimensions-list:  list for y-axis and x-axis list
     * .tp-axis-x-axis-list:
     * .tp-axis-y-axis-list:
     * .tp-axis-color-axis-list:
     * .tp-axis-group-axis-list:
     * .tp-axis-filter-axis-list:
     *
     * HTML elements INOUT:
     * .tp-axis-header-list-item
     * .tp-axis-dimensions-list-item
     * .tp-axis-x-axis-list-item
     * .tp-axis-y-axis-list-item
     * .tp-axis-color-axis-list-item
     * .tp-axis-group-axis-list-item
     * .tp-axis-filter-axis-list-item
     *
     **************************************************************************/
    constructor(root) {
        this.root = root;
        this.findHtmlElements();
        this.initEventListeners();
    }

    findHtmlElements(){
        this.$header_list = $('.tp-axis-header-list');
        this.$dimensions_list = $('.tp-axis-dimensions-list');
        this.$x_axis_list = $('.tp-axis-x-axis-list');
        this.$y_axis_list = $('.tp-axis-y-axis-list');
        this.$color_axis_list = $('.tp-axis-color-axis-list');
        this.$group_axis_list = $('.tp-axis-group-axis-list');
        this.$filter_axis_list = $('.tp-axis-filter-axis-list');

        this.str_header_item = 'tp-axis-header-list-item'
        this.str_dimensions_item = 'tp-axis-dimensions-list-item'
        this.str_dimensions_check = 'tp-axis-dimensions-list-item-check'
        this.str_x_axis_item = 'tp-axis-x-axis-list-item'
        this.str_y_axis_item = 'tp-axis-y-axis-list-item'
        this.str_color_axis_item = 'tp-axis-color-axis-list-item'
        this.str_group_axis_item = 'tp-axis-group-axis-list-item'
        this.str_filter_axis_item = 'tp-axis-filter-axis-list-item'

        this.$dimensions_check = $(this.str_dimensions_check);

    }
    initEventListeners() {
        $(document).ready(() => {
            this.$header_list.on('click', (event) => {
                const $item = $(event.currentTarget);
                this.handleHeaderItemClick($item);
            });
            this.$dimensions_list.on('click', (event) => {
                const $item = $(event.currentTarget);
                this.handleDimensionItemClick($item);
            });
            $(document).on('change', this.$dimensions_check, (event) => {
                const $checkbox = $(event.currentTarget);
                this.handleCheckboxChange($checkbox);
            });
        });
    }

    handleDimensionItemClick($item) {
        /***********************************************************************
         * This function handles the click event for the dimensions list items.
         **********************************************************************/
        console.log('Handling filter-field item:', $item.text().trim());
        this.$dimensions_list.removeClass('active');
        $item.addClass('active');

    }

    handleHeaderItemClick($item) {
        console.log('Handling data-header-item:', $item.text().trim());

        var $activeDimension = this.$dimensions_list.find('.active');

        // list all the items inside activedimension for "dimension-item"
        var $activeDimensionItems = $activeDimension.find(this.str_dimensions_item);
        /*
            const $newItem = $(
                '<div class="row">' +
                    '<div class="col">' +
                        '<input class="form-check-input filter-field-list-item-check" type="checkbox" value="" checked>' +
                        '<li class="list-group-item filter-field-list-item"></li>' +
                    '</div>' +
                '</div>'
            );
         */
    }

    handleCheckboxChange($checkbox) {
        if (!$checkbox.is(':checked')) {
            const $listItem = $checkbox.closest('.row');
            console.log('Checkbox unchecked, removing list item:', $listItem.find('li').text().trim());
            $listItem.remove();
        }
    }

    updateHeadersList(headers) {
        let html = '<ul class="list-group">';
        headers.forEach(header => {
            html += `<li class="${this.str_header_item}">${header}</li>`;
        });
        html += '</ul>';
        this.$header_list.html(html);
    }

}

export default TouchPlotAxis;
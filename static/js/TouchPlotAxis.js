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
        this.str_header_item = 'tp-axis-header-list-item'
        this.str_dimensions_item = 'tp-axis-dimensions-list-item'
        this.str_x_axis_item = 'tp-axis-x-axis-list-item'
        this.str_y_axis_item = 'tp-axis-y-axis-list-item'
        this.str_color_axis_item = 'tp-axis-color-axis-list-item'
        this.str_group_axis_item = 'tp-axis-group-axis-list-item'
        this.str_filter_axis_item = 'tp-axis-filter-axis-list-item'
        this.str_item_checkbox = 'tp-axis-dimensions-list-item-check'

        this.$dimensions_check = $("." + this.str_item_checkbox);
        this.$header_list= $('#tp-axis-header-list');
        this.$header_item= $("." + this.str_header_item);
        this.$dimensions_block = $('.tp-axis-dimensions-block');
        this.$dimensions_active = $('.tp-axis-dimensions-block.active');
        this.$dimensions_list = $('.tp-axis-dimensions-list');
        this.$x_axis_list = $('#tp-axis-x-axis-list');
        this.$y_axis_list = $('#tp-axis-y-axis-list');
        this.$color_axis_list = $('#tp-axis-color-axis-list');
        this.$group_axis_list = $('#tp-axis-group-axis-list');
        this.$filter_axis_list = $('#tp-axis-filter-axis-list');
    }

    initEventListeners() {
        $(document).ready(() => {
            this.$header_item.on('click', (event) => {
                const $item = $(event.currentTarget);
                this.handleHeaderItemClick($item);
            });
            this.$dimensions_block.on('click', (event) => {
                const $item = $(event.currentTarget);
                this.handleDimensionBlockClick($item);
            });
            $(document).on('change', this.$dimensions_check, (event) => {
                const $checkbox = $(event.currentTarget);
                this.handleCheckboxChange($checkbox);
            });
        });
    }

    handleDimensionBlockClick($item) {
        /***********************************************************************
         * This function handles the click event for the dimensions list items.
         **********************************************************************/
        console.log('Handling filter-field item:', $item.text().trim());
        this.$dimensions_block.removeClass('active');
        $item.addClass('active');

    }

    handleHeaderItemClick($item) {
        console.log('Handling data-header-item:', $item.text().trim());
        this.findHtmlElements();
        console.log('Active dimension item:', this.$dimensions_active.text().trim());

        // now the dimensions_active has a div and inside that div there is a list that we need
        var active_list = this.$dimensions_active.find('ul');

        // checks if the active dimension belongs to class x-axis or y-axis or color-axis or group-axis or filter-axis /*
        var list_id = active_list.attr('id')
        var item_class = `${list_id}-item`

        // get all the items in the list and check that $item is not already in the list
        var items = active_list.find(`.${item_class}`)
        var found = false
        items.each(function() {
            if ($(this).text().trim() == $item.text().trim()) {
                found = true
            }
        });

        // if the item is not in the list, add it
        if (!found) {
            active_list.append(`<li class="${item_class}">${$item.text().trim()}</li>`);
        }
        this.root.tpTable.updateFilteredData();

    }

    handleCheckboxChange($checkbox) {
        if (!$checkbox.is(':checked')) {
            const $listItem = $checkbox.closest('.row');
            console.log('Checkbox unchecked, removing list item:', $listItem.find('li').text().trim());
            $listItem.remove();
        }
    }

    updateHeadersList(headers) {
        let html = '';
        // adds list item and a check box for that item

        headers.forEach(header => {
            html += `<li class="${this.str_header_item}">${header}</li>`;
        });
        html += '</ul>';
        this.$header_list.html(html);

        this.findHtmlElements();
        this.initEventListeners()
    }

    getAxis() {
        /***********************************************************************
         * This function returns the axis for the plots.
         **********************************************************************/
        const x_axis = this.$x_axis_list.find('li').map(function() {
            return $(this).text().trim();
        }).get();
        const y_axis = this.$y_axis_list.find('li').map(function() {
            return $(this).text().trim();
        }).get();
        const color_axis = this.$color_axis_list.find('li').map(function() {
            return $(this).text().trim();
        }).get();
        const group_axis = this.$group_axis_list.find('li').map(function() {
            return $(this).text().trim();
        }).get();
        const filter_axis = this.$filter_axis_list.find('li').map(function() {
            return $(this).text().trim();
        }).get();
        // return it as a json object
        const ret = { x_axis, y_axis, color_axis, group_axis, filter_axis };
        console.log('Axis:', ret);
        return ret;
    }
}

export default TouchPlotAxis;
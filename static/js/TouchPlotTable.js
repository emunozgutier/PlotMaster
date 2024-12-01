class touchPlotTable {
    /***************************************************************************
     * This class is responsible for handling the table data.
     *
     * HTML elements IN:
     * #tp-table-csv-file:       button to upload a CSV file
     * #tp-table-raw-data:       div to display the raw data from the CSV file
     * #tp-table-filtered-data:  div to display the filtered data
     *
     * HTML elements OUT:
     * .table table-striped:    class for the table
     *
     **************************************************************************/
    constructor(root) {
        this.root = root;
        this.df = null;
        this.findHtmlElements();
        this.initFileInputListener();
    }

    findHtmlElements(){
        this.$csv_file = $('#tp-table-csv-file');
        this.$raw_data = $('#tp-table-raw-data');
        this.$filtered_data = $('#tp-table-filtered-data');
        this.class_table = "table table-striped"
    }

    initFileInputListener() {
        this.$csv_file.on('change', (event) => {
            this.file = event.target.files[0];
            if (this.file) {
                dfd.readCSV(this.file).then((df) => {
                    this.df = df;
                    df.print();
                    this.addDataFrameToHTML(df, this.$raw_data);
                    this.root.tpAxis.updateHeadersList(df.columns);
                });
            }
        });
    }

    addDataFrameToHTML(df, $element) {
        const tableHTML = this.convertDataFrameToHTML(df);
        $element.html(tableHTML);
    }

updateFilteredData() {
    var json_axis = this.root.tpAxis.getAxis();
    // add all the list from json into one list
    var combined_list = [].concat(json_axis.x_axis, json_axis.y_axis, json_axis.color_axis, json_axis.group_axis, json_axis.filter_axis);
    var filtered_df = this.df.loc({ columns: combined_list })
    if (filtered_df) {
        this.addDataFrameToHTML(filtered_df, this.$filtered_data);
    }
}

    convertDataFrameToHTML(df) {
        let html = `<table class="${this.class_table} table-responsive">`;
        html += '<thead><tr>';
        df.columns.forEach(col => {
            html += `<th>${col}</th>`;
        });
        html += '</tr></thead><tbody>';
        df.values.forEach(row => {
            html += '<tr>';
            row.forEach(val => {
                html += `<td>${val}</td>`;
            });
            html += '</tr>';
        });
        html += '</tbody></table>';
        return html;
    }
}

export default touchPlotTable;
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
                    this.addDataFrameToHTML(df);
                    this.root.tpAxis.updateHeadersList(df.columns);
                });
            }
        });
    }

    addDataFrameToHTML(df) {
        const tableHTML = this.convertDataFrameToHTML(df);
        this.$raw_data.html(tableHTML);
    }

    convertDataFrameToHTML(df) {
        let html = `table class="${this.class_table}">`;
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
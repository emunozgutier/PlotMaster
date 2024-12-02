class touchPlotPlotly {
    /***************************************************************************
     * This class is responsible for handling the table data.
     *
     * HTML elements IN:
     * #tp-plotly-div:
     *
     **************************************************************************/
    constructor(root) {
        this.root = root;
        this.main();
        this.json_axis = "":
    }


        const layout = {title: "World Wide Wine Production"};

        Plotly.newPlot("tp-plot-plotly-div", data, layout);
    }


    }

    updatePlot() {
        this.json_axis = this.root.tpAxis.getAxis();
        // check that x-axis and y-axis are not empty
        if (this.json_axis.x_axis.length > 0 && this.json_axis.y_axis.length > 0) {
            this.json_axis.y_axis.forEach((yvalue) =>{
                const xArray = this.root.tpTable.df[this.json_axis.x_axis[0]].values;
                const yArray = this.root.tpTable.df[yvalue].values;

                const data_row = {
                    x: xArray,
                    y: yArray,
                    type: "line",
                    name: yvalue,
                };
                data.push(data_row);
            })

            const layout = {title: "plot"};
            Plotly.newPlot("tp-plot-plotly-div", data, layout);
        }
    }
}
export default touchPlotPlotly;
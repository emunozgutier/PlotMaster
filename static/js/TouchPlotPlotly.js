class touchPlotPlotly{
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
    }
    main(){

        const xArray = ["Italy", "France", "Spain", "USA", "Argentina"];
        const yArray = [55, 49, 44, 24, 15];

        const data = [{
          x:xArray,
          y:yArray,
          type:"bar",
          orientation:"v",
          marker: {color:"rgba(0,0,255,0.6)"}
        }];

        const layout = {title:"World Wide Wine Production"};

        Plotly.newPlot("tp-plot-plotly-div", data, layout);}
    }
export default touchPlotPlotly;
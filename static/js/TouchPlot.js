import touchPlotTable from './TouchPlotTable.js';
import touchPlotAxis from './TouchPlotAxis.js';
import touchPlotPlotly from './TouchPlotPlotly.js';

// touchPlot definition
class TouchPlot {
    constructor() {
        this.tpTable = new touchPlotTable(this);
        this.tpAxis = new touchPlotAxis(this);
        this.tpPlotly = new touchPlotPlotly(this);

    }

}

export default TouchPlot;
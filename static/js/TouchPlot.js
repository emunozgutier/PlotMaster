import touchPlotTable from './TouchPlotTable.js';
import touchPlotAxis from './TouchPlotAxis.js';

// touchPlot definition
class TouchPlot {
    constructor() {
        this.tpTable = new touchPlotTable(this);
        this.tpAxis = new touchPlotAxis(this);

    }

}

export default TouchPlot;
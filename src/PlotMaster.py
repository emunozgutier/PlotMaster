from PlotMasterServer import PlotMasterServer
from PlotMasterTable import PlotMasterTable
from PlotMasterPlotter import PlotMasterPlotter
class PlotMaster:
    def __init__(self):
        self.server = PlotMasterServer(self)
        self.table = PlotMasterTable(self)
        self.plotter = PlotMasterPlotter(self)

    def run(self):
        self.server.run()


if __name__ == '__main__':
    plot_master = PlotMaster()
    plot_master.run()
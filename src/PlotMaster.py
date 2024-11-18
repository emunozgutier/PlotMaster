from PlotMasterServer import PlotMasterServer
from PlotMasterTable import PlotMasterTable
class PlotMaster:
    def __init__(self):
        self.server = PlotMasterServer(self)
        self.table = PlotMasterTable(self)

    def run(self):
        self.server.run()


if __name__ == '__main__':
    plot_master = PlotMaster()
    plot_master.run()
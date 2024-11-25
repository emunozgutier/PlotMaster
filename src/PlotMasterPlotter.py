import pandas as pd
import plotly.express as px

class PlotMasterPlotter:
    def __init__(self, root):
        self.root = root

    def plot(self, xname, yname):
        df = self.root.table.df
        x0 = df[xname]
        y0 = df[yname]
        fname = f'../temp/{yname}_vs_{xname}.html'
        fig = px.scatter(x=x0, y=y0)
        fig.write_html(fname, full_html=False)
        # i need to open that file and get the html content
        with open(fname, 'r') as f:
            content = f.read()
        print("Content:", content)
        return content

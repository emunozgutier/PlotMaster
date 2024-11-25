from flask import Flask, request, render_template, jsonify

class PlotMasterServerTools:
    def __init__(self, root):
        self.root = root

    def filter_field_important_values(self, values):
        print("Values:", values)
        tuple_list = list(map(lambda x: x.split(':')[1], values))
        print("Tuple list:", tuple_list)
        return tuple_list

    def get_xaxis_and_yaxis(self, values):
        # find the element with 'y-axis' and 'x-axis' and return them
        xaxis = None
        yaxis = None
        for v in values:
            if 'y-axis' in v:
                yaxis = v.split(':')[1]
            if 'x-axis' in v:
                xaxis = v.split(':')[1]

        if xaxis is None or yaxis is None:
            return None, None
        return xaxis, yaxis
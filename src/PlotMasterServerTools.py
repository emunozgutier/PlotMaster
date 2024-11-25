from flask import Flask, request, render_template, jsonify

class PlotMasterServerTools:
    def __init__(self, root):
        self.root = root

    def filter_field_important_values(self, values):
        print("Values:", values)
        tuple_list = list(map(lambda x: x.split(':')[1], values))
        print("Tuple list:", tuple_list)
        return tuple_list
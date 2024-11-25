from flask import Flask, request, render_template, jsonify
from PlotMasterServerTools import PlotMasterServerTools

class PlotMasterServer:
    def __init__(self, root):
        self.app = Flask(__name__, template_folder='../templates', static_folder='../static')
        self.setup_routes()
        self.root = root
        self.tools = PlotMasterServerTools(root)

    def setup_routes(self):
        @self.app.route('/', methods=['GET', 'POST'])
        def index():
            if request.method == 'POST':
                csv_file = request.files['csvfile']
                if csv_file:
                    self.root.table.load_csv(csv_file)
                    chart = self.root.table.generate_html_chart()
                    filter_items = self.root.table.get_sorted_headers()
                    return render_template(
                        'index.html',
                        chart=chart,
                        filter_items=filter_items
                    )

            return render_template('index.html')

        @self.app.route('/plot', methods=['POST'])
        def plot():
            print("Received POST request")
            data = request.get_json()
            print("Data received:", data)
            filters = data.get('filters', [])
            print("Filters received:", filters)
            headers = self.tools.filter_field_important_values(filters)
            print("Headers:", headers)
            chart = self.root.table.generate_html_chart(headers=headers)
            xaxis, yaxis = self.tools.get_xaxis_and_yaxis(filters)
            print(f"xaxis: {xaxis}, yaxis: {yaxis}")
            if xaxis is not None and yaxis is not None:
                plot_file = self.root.plotter.plot(xaxis, yaxis)
                print("Plot file:", plot_file)
                # I need to
                return jsonify(chart=chart, plot_file=plot_file)
            return jsonify(chart=chart)

    def run(self):
        self.app.run(debug=True)
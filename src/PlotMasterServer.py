from flask import Flask, request, render_template, jsonify

class PlotMasterServer:
    def __init__(self, root):
        self.app = Flask(__name__, template_folder='../templates', static_folder='../static')
        self.setup_routes()
        self.root = root

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
            print("HI!!!")
            chart = self.root.table.generate_html_chart()
            return jsonify(chart=chart)

    def run(self):
        self.app.run(debug=True)
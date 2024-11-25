import pandas as pd

class PlotMasterTable:
    def __init__(self, root):
        self.root = root

    def load_csv(self, file_path):
        self.df = pd.read_csv(file_path)


    def generate_html_chart(self, rows=10, headers=None):
        # Load the CSV file into a DataFrame
        if rows:
            df_limited = self.df[:rows]
        else:
            df_limited = self.df

        good_headers = False
        if headers is not None:
            if isinstance(headers, list):
                if len(headers) > 0:
                    good_headers = True

        if good_headers:
            # only get the columns that are in the headers list
            df_limited = df_limited[headers]

        # Convert DataFrame to a list of lists and generate ASCII table
        html_string = df_limited.to_html()

        # replace the string class="dataframe" with class="table table-striped" to make the table look better
        html_string = html_string.replace('class="dataframe"', 'class="table table-striped"')

        # Add the limited-height class to all table cells
        html_string = html_string.replace('<td>', '<td class="limited-height">')
        return html_string

    def get_sorted_headers(self):
        # Get the headers and sort them alphabetically
        headers = sorted(self.df.columns.tolist())
        # Generate HTML list with checkboxes
        return list(headers)

if __name__ == '__main__':
    import Users.Eduardo.projects.year_2024.week46_PlotMaster.src.PlotMasterTable as PlotMasterTable
    file_path = '../tests/data/ss_data.csv'
    pmt = PlotMasterTable.PlotMasterTable(None)
    headers_html = pmt.get_sorted_headers_as_html(file_path)
    print(headers_html)
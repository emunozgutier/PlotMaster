import plotly.express as px

fig = px.scatter(x=range(10), y=range(10))
fig.write_html("../temp/test.html", full_html=False)

print(test)
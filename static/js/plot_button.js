$(document).ready(function() {
    $('#plotButton').on('click', function() {
        console.log('Plot button clicked');
        // Collect values from filter-field-list-items
        var filterValues = [];
        $('.filter-field-list-item').each(function() {
            var $filterFieldName = $(this).closest('.row');
            var $filterFieldName = $filterFieldName.parent().parent();
            var $filterFieldName = $filterFieldName.children().first().text().trim();
            var $filterFieldValue = $(this).text().trim();
            // combines filter field name and value
            var filterc = $filterFieldName + ':' + $filterFieldValue;
            filterValues.push(filterc);
        });

        // Retrieve the HTML content of the plot
        var plotHtml = $('#plot-container').html();

        $.ajax({
            url: '/plot',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ filters: filterValues, plotHtml: plotHtml }),
            success: function(response) {
                console.log('Plot request successful');
                $('#filtered-table-div').html(response.chart);
                $('#filtered-plot-div').html(response.plot_file);
            },
            error: function(error) {
                console.log('Error:', error);
            }
        });
    });
});
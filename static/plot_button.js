$(document).ready(function() {
    $('#plotButton').on('click', function() {
        console.log('Plot button clicked');
        // Collect values from filter-field-list-items
        var filterValues = [];
        $('.filter-field-list-item').each(function() {
            var $filterFieldName = $(this).closest('.row') ;
            var $filterFieldName = $filterFieldName.parent().parent()
            var $filterFieldName = $filterFieldName.children().first().text().trim();
            var $filterFieldValue = $(this).text().trim();
            // combines filter field name and value
            var filterc = $filterFieldName + ':' + $filterFieldValue
            filterValues.push(filterc);
        });

        $.ajax({
            url: '/plot',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ filters: filterValues }),
            success: function(response) {
                console.log('Plot request successful');
                $('#filtered-table').html(response.chart);
            },
            error: function(error) {
                console.log('Error:', error);
            }
        });
    });
});
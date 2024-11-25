var $j = jQuery.noConflict();

        $j(document).ready(function() {
            $j('#plotButton').on('click', function() {
                console.log('Plot button clicked');
                $j.ajax({
                    url: '/plot',
                    type: 'POST',
                    success: function(response) {
                        console.log('Plot request successful');
                        $j('#myTabContent').html(response.chart);
                    },
                    error: function(error) {
                        console.log('Error:', error);
                    }
                });
            });
        });

window.onload = function() {

    VK.init(function () {

        console.log('init successfull');

        VK.api('photos.search', {
            lat: 44.642287,
            long: 33.782619,
            count: 10,
            radius: 100,
            start_time: String(new Date(2015, 5, 14).getTime()).substring(0, 10),
            end_time: String(new Date().getTime()).substring(0, 10)
        }, function (data) {

            console.log(data);

            if (data.response) {
                // data.response is object
            }
        });

    });

}
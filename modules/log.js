function log(isMobile) {
    let data = 0;
    if (isMobile) {
        data = 1;
    }
    $.ajax({
        type: 'post',
        dataType: 'json',
        url: './data/log-process.php',
        data: {
            mobile: data
        },
        success: function () {
        },
        error: function () {
            console.log('failed');
        }
    })
}

export { log };
// add an event listener to all the buttons
$('.read_more').on('click', function(e) {

    // if it's not already open -open it
    if ($(`#post_${e.target.id} .dots`).css('display') == 'inline') {
        $(`#post_${e.target.id} .more`).css('display', 'inline');
        $(`#post_${e.target.id} .dots`).css('display', 'none')
        $(`#${e.target.id}`).text('Read less')
    } else {
    // otherwise close it
        $(`#post_${e.target.id} .more`).css('display', 'none');
        $(`#post_${e.target.id} .dots`).css('display', 'inline')
        $(`#${e.target.id}`).text('Read more')
    }
})
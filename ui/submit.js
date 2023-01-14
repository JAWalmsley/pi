// document
//     .getElementById('submitButton')
//     .addEventListener('click', function (event) {
//         event.preventDefault();
//         testResults(event)
//     });
function testResults(e) {
    var entry = {};
    entry.name = e.form.name.value;
    entry.score = e.form.score.value;
    entry.blurb = e.form.blurb.value;
    console.log(entry);

    // const form = new FormData();
    // form.append(
    //     'filePath',
    //     'data:application/json;name=' +
    //         entry.name +
    //         '.json;base64,' +
    //         btoa(JSON.stringify(entry))
    // );

    // const options = {
    //     method: 'POST',
    //     headers: {
    //         accept: 'application/json',
    //         'X-API-Key': 'sk_live_603155cd-2bb5-4e83-a52d-7a1772539a1a',
    //     },
    // };

    // options.body = form;

    // fetch('https://api.verbwire.com/v1/nft/store/file', options)
    //     .then((response) => response.json())
    //     .then((response) => console.log(response))
    //     .catch((err) => console.error(err));
    return false;
}

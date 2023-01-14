// document
//     .getElementById('submitButton')
//     .addEventListener('click', function (event) {
//         event.preventDefault();
//         testResults(event)
//     });
function testResults(e) {
    document.getElementById("result").innerText = "Loading...";
    var entry = {};
    entry.name = e.form.name.value;
    entry.score = e.form.score.value;
    entry.blurb = e.form.blurb.value;
    console.log(entry);


    let file = new File([JSON.stringify(entry)],entry.name+".json")
    const form = new FormData();
    form.append(
        'filePath',file
        
    );

    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'X-API-Key': 'sk_live_603155cd-2bb5-4e83-a52d-7a1772539a1a',
        },
    };

    options.body = form;

    fetch('https://api.verbwire.com/v1/nft/store/file', options)
        .then((response) => response.json())
        .then((response) => {
            console.log(response)
            document.getElementById("result").innerText = "The IPFS location of your data is: " + response.ipfs_storage.ipfs_url.split("/ipfs/")[1]
        })
        .catch((err) => console.error(err));
    return false;
}

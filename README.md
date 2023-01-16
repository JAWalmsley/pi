# Pi
A webapp to allow consumers to make educated buying decisions for the climate.

*Winner of Deltahacks 9 Best Environmental Hack and Most Creative Use of Verbwire API!*
## Feast your Eyes on the App

![Pi web app demo](https://i.imgur.com/rncmbIk_d.jpg?maxwidth=520&shape=thumb&fidelity=high)

Quick demo link: https://youtu.be/6r9V2UnqCj0
## Inspiration 
In a grocery store, you are presented with thousands of options for food. To adequately research each of these options to make the most environmentally-friendly decision would be a full-time job. Nobody has that kind of time.

## What it does 
Users can scan a barcode or CV food scan a product found in a store to receive a list of its ingredients with a high carbon footprint and get a grade based on its eco-friendliness.

## How we built it
We built the front-end with ReactJS, using Verbwire IPFS file storage for the backend information. The food information comes from the OpenFoodFacts API and the barcode scanning is done by QuaggaJS. Barcode scans processed by QuaggaJS are sent to OpenFoodFacts, where the information is searched for keywords that overlap with high-impact foods, which are retrieved from Verbwire IPFS storage. The CV aspect of the project utilizes the Food101 dataset from TFDS, which contains 101,000 images of food, to accurately identify the item being shown. The image processing is done using openCV, while the identification and training model is done through Tensorflow on a cloud GPU using Colab. It is planned to be integrated into the webapp using web requests for image input, and will be run on a server.

## Challenges we ran into 
While building this project, we started with the idea of searching by manufacturer's name to find the carbon footprint of specific companies. It became impossible to generalize this to many different products, so we found another approach. Searching by ingredients is much more generalized and allows the program to deliver information on a product that we may have never heard of. We were also limited by GPU access and thus found it challenging to integrate such a demanding training model into our project given our time and resources. 

## What's next for Pi
Given more time (just a few more hours!), our team would have been able to combine our TensorFlow Python application into our web server to recognize foods without barcode stickers. We would also look into providing information to the user about which products are economically freindly, and also suggest sustainable alternative products/ingredients that are similar to the ones being scanned.

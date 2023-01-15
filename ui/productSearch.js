var flaggedIngredients = ['Sugar', 'Chocolate'];
function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

function parseProductData(product) {
    if (product == null) {
        return;
    }
    if (product.status == 0) {
        return;
    }
    var returnData = {};
    returnData.brand = product.product.brands;
    if (product.product.ingredients == null) {
        returnData.ingredients = product.product._keywords;
    } else {
        returnData.ingredients = product.product.ingredients
            .map((x) => x.text)
            .concat(product.product._keywords);
    }

    returnData.ingredients = returnData.ingredients.map(x=>toTitleCase(x))
    // returnData.tags = product.product._keywords;
    var foundIngredients = returnData.ingredients.filter((value) =>
        flaggedIngredients.includes(value)
    );
    // Remove duplicates
    foundIngredients = Array.from(new Set(foundIngredients));
    return foundIngredients;
}

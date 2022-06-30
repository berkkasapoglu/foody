module.exports = metadataGenerator = (recipe) => {
  const url = `https://street-foodie.com/recipes/${recipe.slug}`
  return `
    <title data-react-helmet="true">${recipe.title}</title>
    <meta data-react-helmet="true" charset="utf-8" />
    <meta data-react-helmet="true" name="viewport" content="width=device-width,initial-scale=1"/>
    <meta data-react-helmet="true" name="theme-color" content="#000000" />
    <meta data-react-helmet="true" property="og:url" content="${url}" />
    <meta data-react-helmet="true" property="og:type" content="article" />
    <meta data-react-helmet="true" property="og:title" content="${recipe.title}" />
    <meta data-react-helmet="true" property="og:description" content="${recipe.description}" />
    <meta data-react-helmet="true" property="og:image" content="${recipe.image.lowQuality}" />
    <meta data-react-helmet="true" name="twitter:card" content="summary_large_image" />
    <meta data-react-helmet="true" name="twitter:title" content="${recipe.title}" />
    <meta data-react-helmet="true" name="twitter:description" content="${recipe.description}" />
    <meta data-react-helmet="true" name="twitter:url" content="${url}" />
    <meta data-react-helmet="true" name="twitter:image" content="${recipe.image.lowQuality}" />
    <script type="application/ld+json">
    {
      "@context": "https://schema.org/",
      "@type": "Recipe",
      "name": "${recipe.title}",
      "image": [
        "${recipe.image.url}"
      ],
      "description": "${recipe.description}",
      "totalTime": "PT${recipe.time}M",
      "recipeYield": "${recipe.yields.split(" ")[0]}",
      "recipeCategory": "${recipe.category}",
      "nutrition": {
        "@type": "NutritionInformation",
        ${recipe.nutritions.map((nutrition) => (
          `"${nutrition.label}": "${nutrition.total + " " + nutrition.unit}"`
        ))}
      },
      "recipeIngredient": [${recipe.ingredients.map(ingredient => `"${ingredient}"`)}],
      "recipeInstructions": [${recipe.instructions
        .split("\n")
        .map((instruction) => (`{
          "@type": "HowToStep",
          "text": "${instruction}"
        }`))}]
    }
    </script>
`
}

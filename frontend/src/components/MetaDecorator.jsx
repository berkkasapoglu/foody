import { Helmet } from "react-helmet"
import metadata from "../metadata.json"

function MetaDecorator({ title, description, image, url, metaTitle }) {
  return (
    <Helmet>
      <meta charset="utf-8" />
      <link rel="icon" href="/logo.png" />
      <link rel="apple-touch-icon" href="/logo.png" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={metaTitle ? metaTitle : title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image ? image : metadata.sitename + "/meta-image.jpg"} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle ? metaTitle : title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:image" content={image ? image : metadata.sitename + "/meta-image.jpg"} />
    </Helmet>
  )
}
export default MetaDecorator

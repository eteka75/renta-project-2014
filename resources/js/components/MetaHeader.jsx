import React from 'react'
import { Helmet } from 'react-helmet'

function MetaHeader(title=null, description, keywords, author, url, imageUrl, siteName, locale, twitterCardTitle, twitterCardDescription, twitterCardImageUrl)
        {
    return (
        <div>
            <Helmet>
                 <title> Rental Car Services Bénin</title>
                {description!=null && <meta name="description" content={description} />}
                {keywords!=null && <meta name="keywords" content={keywords} />}
                {author!=null && <meta name="author" content={author} />}
                <meta name="robots" content="index,follow" />
                {url!=null && <meta property="og:url" content={url} />}
                {title!=null && <meta property="og:title" content={title} />}
                {description!=null && <meta property="og:description" content={description} />}
                <meta property="og:type" content="website" />
                {imageUrl!=null && <meta property="og:image" content={imageUrl} />}
                {siteName!=null && <meta property="og:site_name" content={siteName} />}
                {locale!=null && <meta property="og:locale" content={locale} />}
                <meta name="twitter:card" content="summary_large_image" />
                {twitterCardTitle!=null && <meta name="twitter:title" content={twitterCardTitle} />}
                {twitterCardDescription!=null && <meta name="twitter:description" content={twitterCardDescription} />}
                {twitterCardImageUrl!=null && <meta name="twitter:image" content={twitterCardImageUrl} />}
            </Helmet>

        </div>
    )
}
export default MetaHeader

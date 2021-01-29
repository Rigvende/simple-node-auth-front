import React from 'react'
import Helmet from 'react-helmet'

const CommonHelmet = ({ title }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="keywords" content="nodejs, react, express, crud, auth" />
            <meta name="description" content="Simple Node.js + React.js app" />
        </Helmet>
    );
}

export default CommonHelmet;
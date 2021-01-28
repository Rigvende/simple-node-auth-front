import React from 'react'
import Helmet from 'react-helmet'

const CommonHelmet = () => {
    return (
        <Helmet>
            <meta name="keywords" content="nodejs, react, express, crud, auth" />
            <meta name="description" content="Simple Node.js + React.js app" />
        </Helmet>
    );
}

export default CommonHelmet;
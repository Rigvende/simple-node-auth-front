import { checkPropTypes } from 'prop-types';
import React from 'react';

export const Loader = (props) => {
    console.log(props.hidden);

    return (
        <div className={`${props.hidden ? 'hidden-loader' : 'loader'}`}>
            <div className="preloader-wrapper big active">
                <div className="spinner-layer spinner-blue-only">
                    <div className="circle-clipper left">
                        <div className="circle" />
                    </div>
                    <div className="gap-patch">
                        <div className="circle" />
                    </div>
                    <div className="circle-clipper right">
                        <div className="circle" />
                    </div>
                </div>
            </div>
        </div>
    )
};

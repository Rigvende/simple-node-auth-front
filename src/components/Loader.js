import { checkPropTypes } from 'prop-types';
import React from 'react';

export const Loader = (props) => {

    return (
        <div className="loader" hidden={props.hidden}>
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

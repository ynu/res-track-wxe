/**
 * Created by n7best
 */



import React from 'react';
import classNames from 'classnames';

export default class MediaBoxTitle extends React.Component {
    render() {
        const {children, className, ...others} = this.props;
        const cls = classNames({
            weui_media_title: true
        }, className);

        return (
            <h4 className={cls} {...others}>{children}</h4>
        );
    }
};
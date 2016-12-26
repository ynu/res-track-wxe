/*
eslint-disable
 */



import React from 'react';
import classNames from 'classnames';

export default class Cells extends React.Component {
    static propTypes = {
        access: React.PropTypes.bool,
        radio: React.PropTypes.bool,
        checkbox: React.PropTypes.bool
    };

    static defaultProps = {
        access: false,
        radio: false,
        checkbox: false
    };

    render() {
        const {children, className, radio, checkbox, ...others} = this.props;
        const cls = classNames({
            'weui-cells': true,
            [className]: className
        });

        return (
            <div className={cls} {...others}>{children}</div>
        );
    }
};

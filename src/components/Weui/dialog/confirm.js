/**
 * Created by jf on 15/10/27.
 */


import React from 'react';
import classNames from 'classnames';
import Mask from '../mask/index';

class Confirm extends React.Component {
    static propTypes = {
        buttons: React.PropTypes.array,
        show: React.PropTypes.bool,
        title: React.PropTypes.string
    };

    static defaultProps = {
        buttons: [],
        show: false,
        title: ''
    };

    renderButtons() {
        return this.props.buttons.map((action, idx) => {
            const {type, label, ...others} = action;
            const className = classNames({
                'weui-dialog__btn': true,
                'weui-dialog__btn_default': type === 'default',
                'weui-dialog__btn_primary': type === 'primary'
            });

            return (
                <a key={idx} href="javascript:;" {...others} className={className}>{label}</a>
            );
        });
    }

    render() {
        const {title, show, children} = this.props;

        return (
            <div className="weui_dialog_confirm" style={{display: show ? 'block' : 'none'}}>
                <Mask/>
                <div className="weui-dialog">
                    <div className="weui-dialog__hd">
                        <strong className="weui-dialog__title">{title}</strong>
                    </div>
                    <div className="weui-dialog__bd">
                        {children}
                    </div>
                    <div className="weui-dialog__ft">
                        {this.renderButtons()}
                    </div>
                </div>
            </div>
        );
    }
}

export default Confirm;

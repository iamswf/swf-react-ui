import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import Icon from '../icon';

const rxTwoCNChar = /^[]{2}$/;
// const isTwoCNChar = text => rxTwoCNChar.test(text);
// const isString = str => typeof str === 'string';

export type ButtonType = 'default' | 'primary' | 'ghost' | 'dashed' | 'danger';
export type ButtonShape = 'circle' | 'circle-outline';
export type ButtonSize = 'small' | 'default' | 'large';
export type ButtonHTMLType = 'submit' | 'button' | 'reset';

export interface BaseButtonProps {
    type?: ButtonType;
    icon?: string;
    shape?: ButtonShape;
    size?: ButtonSize;
    loading?: boolean | {delay?: number};
    prefixCls?: string;
    className?: string;
    ghost?: boolean;
    block?: boolean;
    children?: React.ReactNode;
}

export type AnchorButtonProps = {
    href: string;
    target?: string;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
} & BaseButtonProps & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export type NativeButtonProps = {
    htmlType?: ButtonHTMLType;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
} & BaseButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = AnchorButtonProps | NativeButtonProps;

export default class Button extends React.Component<ButtonProps, any> {
    static propTypes = {
        type: PropTypes.oneOf(['default', 'primary', 'ghost', 'dashed', 'danger']),
        shape: PropTypes.oneOf(['circle', 'circle-outline']),
        size: PropTypes.oneOf(['large', 'default', 'small']),
        htmlType: PropTypes.oneOf(['submit', 'button', 'reset']),
        onClick: PropTypes.func,
        loading: PropTypes.oneOf([PropTypes.bool, PropTypes.object]),
        className: PropTypes.string,
        icon: PropTypes.string,
        block: PropTypes.bool,
        ghost: PropTypes.bool
    };

    static defaultProps = {
        prefixCls: 'ant-btn',
        loading: false,
        ghost: false,
        block: false
    };

    private buttonNode: HTMLElement | null;

    constructor(props: ButtonProps) {
        super(props);
        this.state = {
            loading: props.loading,
            hasTwoCNChar: false
        };
    }

    componentDidMount() {
        // TODO fix twoCNChar
    }

    componentDidUpdate() {
        // TODO fix twoCNChar
    }

    handleClick: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement> = e => {
        const {loading} = this.state;
        const {onClick} = this.props;
        if (loading) {
            return;
        }
        if (onClick) {
            (onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)(e);
        }
    }

    saveButtonRes = (node: HTMLElement | null) => {
        this.buttonNode = node;
    }

    render() {
        const {
            type, shape, size, className, children, icon, prefixCls, ghost, loading: _loadingProp, block, ...rest
        } = this.props;
        const {loading, hasTwoCNChar} = this.state;

        let sizeCls = '';
        switch (size) {
            case 'large':
                sizeCls = 'lg';
                break;
            case 'small':
                sizeCls = 'sm';
                break;
            default:
                break;
        }

        const classes = classNames(prefixCls, className, {
            [`${prefixCls}-${type}`]: type,
            [`${prefixCls}-${shape}`]: shape,
            [`${prefixCls}-${sizeCls}`]: sizeCls,
            [`${prefixCls}-icon-only`]: !children && icon,
            [`${prefixCls}-loading`]: loading,
            [`${prefixCls}-background-ghost`]: ghost,
            [`${prefixCls}-two-chinese-chars`]: hasTwoCNChar,
            [`${prefixCls}-block`]: block
        });

        const iconType = loading ? 'loading' : icon;
        // const iconNode = iconType ? <Icon type={iconType} /> : null;
        const iconNode = iconType ? <span>icon here</span> : null;
        const kids = children
            ? children
            // ? React.Children.map(children, child => insertSpace(child, this.isNeedInserted()))
            : null;
        if ('href' in rest) {
            return (
                <a
                    {...rest}
                    className={classes}
                    onClick={this.handleClick}
                    ref={this.saveButtonRes}
                >
                    {iconNode}{kids}
                </a>
            )
        }
        const {htmlType, ...otherProps} = rest;
        return (
            <button
                {...otherProps}
                type={htmlType || 'button'}
                className={classes}
                onClick={this.handleClick}
                ref={this.saveButtonRes}
            >
                {iconNode}{kids}
            </button>
        );
    }


}

import React from 'react';
import classnames from 'classnames';
import {
  Container
} from 'reactstrap';
import SvgIcon from '../components/modules/SvgIcon';

const Hero = (props) => {
  const {
    icon,
    className,
    title,
    children,
    background,
    style,
    ...rest
  } = props;

  const classNameMap = {
    section: true,
    'hero-section': true,
    ...(className ? { [className]: true } : {})
  };

  const newStyles = {
    ...(style || {}),
    backgroundImage: `url(${background})`
  };

  return (
    <div className={classnames(classNameMap)} style={newStyles} {...rest}>
      <Container>
        {(icon || title) && (
          <div className="hero-title">
            {icon && (
              <div
                className={classnames({
                  ...(icon.className ? { [icon.className]: true } : {}),
                  'hero-icon': true
                })}
              >
                <SvgIcon source={icon.source} />
              </div>
            )}
            {title && (
              <h1 className="entry-title">
                {title}
              </h1>
            )}
          </div>
        )}
        {children && (
          <div className="hero-content">
            {children}
          </div>
        )}
      </Container>
    </div>
  );
};

Hero.defaultProps = {
  icon: null,
  title: null,
  background: null
};

export default Hero;

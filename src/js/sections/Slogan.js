import React from 'react';
import {
  Container
} from 'reactstrap';
import classnames from 'classnames';

const Slogan = (props) => {
  const {
    title, children, className
  } = props;

  const classNameMap = {
    'section slogan-section': true
  };

  if (className) {
    classNameMap[className] = true;
  }

  return (
    <div className={classnames(classNameMap)}>
      <Container>
        <h1 className="section-title title-responsive h3 h1-md">{title}</h1>
        <div className="slogan-content">
          {children}
        </div>
      </Container>
    </div>
  );
};

Slogan.defaultProps = {
  className: '',
  title: ''
};

export default Slogan;

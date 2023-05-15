import { PropsWithChildren } from 'react';
import './modal.scss';

const ModalComponent = ({ children }: PropsWithChildren) => {
  return <div className="modal">{children}</div>;
};

export default ModalComponent;
